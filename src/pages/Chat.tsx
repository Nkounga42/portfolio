import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { ChevronDown, Send, StopCircle, Copy, Check, X } from 'lucide-react';
import AiAssistant from '../components/AiAssistant';
import { PORTFOLIO_CONTEXT } from '../libs/portfolio-context';
import { AI_TOOLS, AI_FUNCTIONS } from '../libs/ai-tools';

const MODELS = [
  { name: "Ling 3.0 Flash", model: "inclusionai/ling-3.0-flash:free" },
  { name: "Nemotron 3 Ultra", model: "nvidia/nemotron-3-ultra-550b-a55b:free" },
  { name: "Laguna M.1", model: "poolside/laguna-m.1:free" },
  { name: "Nemotron 3 Super", model: "nvidia/nemotron-3-super-120b-a12b:free" },
  { name: "Qwen3 Coder 30B", model: "qwen/qwen3-coder-30b:free" },
  { name: "GPT OSS 20B", model: "openai/gpt-oss-20b:free" },
  { name: "Gemma 4 26B", model: "google/gemma-4-26b-a4b-it:free" },
  { name: "Gemma 4 31B", model: "google/gemma-4-31b-it:free" },
];
import MdViewer from "../components/MdVIewer";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string;

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  resources?: string[];
  timestamp: Date;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [resourceItems, setResourceItems] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTool, setCurrentTool] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Ref to always have the latest selectedModel inside async callbacks
  const selectedModelRef = useRef(selectedModel);
  selectedModelRef.current = selectedModel;

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const buildMessageContent = (message: Message) => {
    const parts: string[] = [];

    if (message.resources?.length) {
      parts.push(`Ressources:\n${message.resources.join('\n\n')}`);
    }

    if (message.content?.trim()) {
      parts.push(`Directive:\n${message.content.trim()}`);
    }

    return parts.join('\n\n');
  };

  const sendMessage = async (overrideContent?: string) => {
    const directiveText = (overrideContent ?? input).trim();
    const resources = resourceItems.map(item => item.trim()).filter(Boolean);

    const promptText = overrideContent
      ? directiveText
      : [resources.length ? `Ressources:\n${resources.join('\n\n')}` : '', directiveText ? `Directive:\n${directiveText}` : '']
        .filter(Boolean)
        .join('\n\n');

    if (!promptText || isStreaming) return;

    setError(null);
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: directiveText || (resources.length ? 'Ressources fournies' : ''),
      resources: resources.length ? resources : undefined,
      timestamp: new Date(),
    };

    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setResourceItems([]);
    setIsStreaming(true);

    const assistantId = crypto.randomUUID();
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'NK Portfolio Chat',
        },
        body: JSON.stringify({
          model: selectedModelRef.current.model,
          stream: true,
          messages: [
            { role: 'system', content: PORTFOLIO_CONTEXT },
            ...history.map(m => ({ role: m.role, content: buildMessageContent(m) })),
          ],
          tools: AI_TOOLS,
        }),
      });
      console.log('📤 Request sent with tools:', AI_TOOLS.map(t => t.name));

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || `HTTP ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      let toolCalls: any[] = [];
      console.log('🚀 Starting stream, waiting for tool_calls...');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;

            // Gestion du contenu texte normal
            if (delta?.content) {
              accumulated += delta.content;
              setMessages(prev =>
                prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m)
              );
            }

            // Gestion des tool_calls (accumulation correcte pour streaming)
            if (delta?.tool_calls) {
              console.log('🔧 Received tool_calls delta:', delta.tool_calls);
              for (const toolCall of delta.tool_calls) {
                const index = toolCall.index;
                if (!toolCalls[index]) {
                  toolCalls[index] = { id: toolCall.id, function: { name: '', arguments: '' } };
                }
                if (toolCall.function?.name) {
                  toolCalls[index].function.name += toolCall.function.name;
                }
                if (toolCall.function?.arguments) {
                  toolCalls[index].function.arguments += toolCall.function.arguments;
                }
              }
              console.log('📋 Current tool_calls array:', toolCalls);
            }
          } catch { /* skip malformed */ }
        }
      }

      // Si des tool_calls sont présents, exécuter les fonctions
      console.log('🔍 Stream ended. Checking for tool_calls:', toolCalls.length > 0 ? 'YES' : 'NO', toolCalls);
      if (toolCalls && toolCalls.length > 0) {
        const toolResults = [];

        for (const toolCall of toolCalls) {
          console.log('Tool call structure:', JSON.stringify(toolCall, null, 2));

          const functionName = toolCall.function?.name;
          const functionArgs = toolCall.function?.arguments ? JSON.parse(toolCall.function.arguments) : {};

          if (!functionName) {
            console.error('Tool call missing function name:', toolCall);
            continue;
          }

          console.log('Executing tool:', functionName, 'with args:', functionArgs);
          console.log('Available functions:', Object.keys(AI_FUNCTIONS));

          // Afficher l'outil en cours d'utilisation
          setCurrentTool(functionName);

          try {
            const func = AI_FUNCTIONS[functionName as keyof typeof AI_FUNCTIONS];
            if (!func || typeof func !== 'function') {
              throw new Error(`Function ${functionName} not found or not callable. Available: ${Object.keys(AI_FUNCTIONS).join(', ')}`);
            }
            const result = await func(functionArgs);
            toolResults.push({
              tool_call_id: toolCall.id,
              role: 'tool',
              content: JSON.stringify(result, null, 2),
            });
          } catch (error) {
            console.error('Tool execution error:', error);
            toolResults.push({
              tool_call_id: toolCall.id,
              role: 'tool',
              content: JSON.stringify({ error: String(error) }, null, 2),
            });
          }

          // Réinitialiser après l'exécution
          setCurrentTool(null);
        }

        // Envoyer les résultats des outils à l'API
        const followUpResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'NK Portfolio Chat',
          },
          body: JSON.stringify({
            model: selectedModelRef.current.model,
            stream: true,
            messages: [
              { role: 'system', content: PORTFOLIO_CONTEXT },
              ...history.map(m => ({ role: m.role, content: buildMessageContent(m) })),
              { role: 'assistant', content: accumulated, tool_calls: toolCalls },
              ...toolResults,
            ],
            tools: AI_TOOLS,
          }),
        });

        if (!followUpResponse.ok) {
          throw new Error(`Follow-up request failed: ${followUpResponse.status}`);
        }

        const followUpReader = followUpResponse.body!.getReader();
        let followUpAccumulated = '';

        while (true) {
          const { done, value } = await followUpReader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                followUpAccumulated += delta;
                setMessages(prev =>
                  prev.map(m => m.id === assistantId ? { ...m, content: accumulated + followUpAccumulated } : m)
                );
              }
            } catch { /* skip malformed */ }
          }
        }
      }
    } catch (e: any) {
      if (e.name === 'AbortError') {
        // user stopped
      } else {
        setError(e.message || 'Une erreur est survenue.');
        setMessages(prev => prev.filter(m => m.id !== assistantId || prev.find(x => x.id === assistantId)?.content));
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  const stopStream = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (!pastedText.trim()) return;

    e.preventDefault();
    const cleanText = pastedText.trim();
    if (!cleanText) return;

    const shouldCreateResource = cleanText.length >= 150;
    if (!shouldCreateResource) return;

    const parsedResources = cleanText
      .split(/\n\s*\n/)
      .map(item => item.trim())
      .filter(Boolean);

    const resourcesToAdd = parsedResources.length > 1 ? parsedResources : [cleanText];

    const filteredResources = resourcesToAdd.filter(item => item.length >= 150);

    if (filteredResources.length > 0) {
      setResourceItems(prev => {
        const next = [...prev, ...filteredResources];
        return next.slice(0, 4);
      });
    }
  };

  const copyMessage = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen text-base-content pt-11.5">


      {/* Messages */}
      <div className="flex-1 mx-auto max- w-4xl   px-4 py-6 space-y-4" onClick={() => setShowModelMenu(false)}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center select-none">

            <AiAssistant />
            <div>
              <p className="font-semibold text-base-content">Bonjour, comment puis-je t'aider ?</p>
              <p className="text-sm text-base-content/50 mt-1">Modèle actif : <span className="text-primary">{selectedModel.name}</span></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 max-w-lg w-full">
              {[
                "Explique-moi React en 3 points",
                "Génère un composant Tailwind moderne",
                "Rédige une bio professionnelle",
                "Quelles sont les meilleures pratiques TypeScript ?",
              ].map(s => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-xs text-left px-3 py-2.5 rounded-xl bg-base-300 hover:bg-primary/10 hover:text-primary border border-base-300 hover:border-primary/30 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex  gap-3 group ${msg.role === 'user' ? 'justify-end mb-15' : 'justify-start mb-20'}`}>



            <div className={`px-4 py-3 rounded-3xl relative text-sm leading-relaxed max-w- ${msg.role === 'user'
              ? 'bg- primary text-primary-content max-w-[75%] sm:max-w-[65%]  '
              : 'max-w-3  xl sm:max-w-3xl  '}`}>
              {msg.content && msg.role === 'user' && (msg.resources?.length ?? 0) > 0 ? (
                <>
                <div className="flex justify-end"> 
                  <div className="space-y-2  grid grid-cols-1 sm:grid-cols-3 gap-2 ">
                    {(msg.resources ?? []).slice(0, 4).map((resource, index) => (
                      <div key={`${resource}-${index}`} className="rounded-xl border border-base-300/70 bg-base-100/90 p-2 text-xs leading-relaxed text-base-content/80">
                        {resource.length > 120 ? `${resource.slice(0, 117)}...` : resource}
                      </div>
                    ))}
                    {(msg.resources?.length ?? 0) > 4 && (
                      <div className="rounded-xl border border-base-300/70 bg-base-100/90 p-2 text-xs leading-relaxed text-base-content/80">
                        +{(msg.resources?.length ?? 0) - 4} autre{(msg.resources?.length ?? 0) - 4 > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  </div>
                  <div className="flex justify-end ">

                    <div className="rounded-2xl bg-primary /10 px-3 py-2 text-sm leading-relaxed text-base-content">
                      {msg.content}
                    </div>
                  </div>
                </>
              ) : msg.role === 'assistant' && msg.content === '' ? (
                <div className="flex flex-col gap-2">
                  {currentTool && (
                    <div className="flex items-center gap-2 text-xs text-primary/70">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span>Utilisation de l'outil : <span className="font-semibold">{currentTool}</span></span>
                    </div>
                  )}
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              ) : (
                <MdViewer readme={msg.content} />
              )}

              {msg.content && (
                <button
                  onClick={() => copyMessage(msg.content, msg.id)}
                  className={`mt-2 flex absolute -bottom-8 bg-base-100 text-base-300 py-1 px-2 rounded-full items-center gap-1 text-xs text-base-content/50 hover:text-primary transition-colors ${msg.role === 'user' ? " right-2 " : "left-2"}`}
                  title="Copier"
                >
                  {copiedMessageId === msg.id ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copié
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copier
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="flex justify-center">
            <div className="bg-error/10 border border-error/30 text-error text-xs rounded-xl px-4 py-2">
              ⚠ {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 px-4 pb-4 pt-2">
        {/* Gradient shadow above input */}
        <div className="mx-auto max-w-3xl">
          {resourceItems.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2 rounded-2xl border border-primary/20 bg-primary/10 p-3 shadow-sm backdrop-blur-xl">
              {resourceItems.map((item, index) => (
                <div key={`${item}-${index}`} className="flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-base-100/80 px-3 py-2 text-sm text-base-content shadow-sm">
                  <span className="max-w-[220px] truncate">{item}</span>
                  <button
                    type="button"
                    onClick={() => setResourceItems(prev => prev.filter((_, i) => i !== index))}
                    className="shrink-0 rounded-full p-0.5 text-base-content/60 transition hover:bg-primary/10 hover:text-primary"
                    aria-label="Supprimer la ressource"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 bg-base-100  backdrop-blur-xl border border-base-300 rounded-3xl pl-4 pr-2 py-2  transition">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={e => {
                setInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder="Envoie un message… (Shift+Entrée pour sauter une ligne)"
              className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed py-1 max-h-40 placeholder:text-base-content/30"
              disabled={isStreaming}
            />
            <div className="relative">
              <button
                onClick={() => setShowModelMenu(v => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl   hover:bg-base-100 transition text-xs font-medium"
              >
                <span className="hidden sm:inline max-w-[110px] truncate">{selectedModel.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showModelMenu ? 'rotate-180' : ''}`} />
              </button>

              {showModelMenu && (
                <div
                  className="absolute right-0 -bottom-full mt-1 w-52 bg-base-100 border border-base-300 rounded-xl shadow-xl z-50 overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  {MODELS.map(m => (
                    <button
                      key={m.model}
                      onClick={() => { setSelectedModel(m); setShowModelMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs hover:bg-base-300 transition flex items-center gap-2 ${selectedModel.model === m.model ? 'text-primary font-semibold' : ''}`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isStreaming ? (
              <button
                onClick={stopStream}
                className="w-8 h-8 rounded-full bg-error/20 hover:bg-error/30 text-white flex items-center justify-center transition shrink-0 mb-0.5"
                title="Arrêter"
              >
                <StopCircle className="w-4 h-4" />
              </button>
            ) : (input.trim() || resourceItems.length > 0) && (
              <button
                onClick={() => void sendMessage()}
                className="p-1.5 rounded-full bg-primary/20 hover:bg-primary/30 text-white flex items-center justify-center transition shrink-0 mb-0.5 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Envoyer (Entrée)"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-base-content/30 text-center mt-1.5">
          Les réponses peuvent être incorrectes. Vérifiez les informations importantes.
        </p>
      </div>
    </div>
  );
}

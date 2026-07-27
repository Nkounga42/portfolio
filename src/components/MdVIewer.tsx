import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MdViewer({ readme }: { readme: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4 text-base-content border-b border-base-content/20 pb-2">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mb-3 mt-8 text-base-content">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-medium mb-2 mt-6 text-base-content">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-base-content/80 leading-relaxed">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-1 text-base-content/80">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-1 text-base-content/80">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="ml-4">{children}</li>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-base-200 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className="block bg-base-200 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-base-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic text-base-content/70 mb-4">
            {children}
          </blockquote>
        ),
        img: ({ src, ...props }) => {
          if (!src) return null;
          return (
            <img
              key={`img-${src}`}
              src={src + '?raw=true'}
              alt={src}
              className="w-full h-auto rounded-lg border border-base-content/10 mb-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://i.pinimg.com/736x/36/85/37/368537ab800464ee9b14d843e117ab01.jpg";
              }}
              {...props}
            />
          );
        },
        video: ({ src, ...props }) => {
          if (!src) return null;
          return (
            <video
              key={`video-${src}`}
              src={src + '?raw=true'}
              className="w-full h-[200px] rounded-lg border border-base-content/10 mb-4"
              onError={(e) => {
                const target = e.target as HTMLVideoElement;
                target.onerror = null;
                target.src = "https://i.pinimg.com/736x/36/85/37/368537ab800464ee9b14d843e117ab01.jpg";
              }}
              {...props}
            />
          );
        },
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-focus underline"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="table table-zebra w-full border border-base-content/20">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-base-200">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody>
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="border-b border-base-content/10">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="text-left p-3 font-semibold text-base-content">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="p-3 text-base-content/80">
            {children}
          </td>
        ),
        hr: () => (
          <hr className="border-base-content/20 my-4" />
        ),
      }}
    >
      {readme}
    </ReactMarkdown>
  );
}
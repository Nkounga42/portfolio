import { Calendar, HandMetal, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xovkwowr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          _subject: 'Nouvelle inscription à la newsletter',
          type: 'newsletter_subscription'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative isolate flex justify-center py-8 sm:py-16 lg:py-24 xl:py-32 min-h-[300px] sm:min-h-[400px] bg-base-200">
      <div className="hero-content flex-col items-start col-revers lg:flex-row max-w-5xl gap-6 sm:gap-8 px-4 sm:px-6 w-full">
        <div className="text-center lg:text-left max-w-xl w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Abonnez-vous à notre newsletter
          </h2>
          <p className="py-4 sm:py-6 text-sm sm:text-base text-base-content/70">
            Recevez directement dans votre boîte mail mes derniers articles,
            projets et réflexions sur le développement, le design et les idées
            qui m'inspirent. Un concentré d'actualités, d'astuces et de
            nouveautés <br className="hidden sm:block" /> <br className="hidden sm:block" />{" "}
            <b>– Sans spam, juste du contenu authentique</b>.
          </p>
          <form onSubmit={handleSubmit} className="w-full sm:w-auto">
            <div className="join w-full sm:w-auto">
              <input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered join-item w-full sm:w-auto text-sm sm:text-base"
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary join-item text-sm sm:text-base px-3 sm:px-4 disabled:opacity-50"
              >
                {isSubmitting ? 'Envoi...' : "S'Abonner"}
              </button>
            </div>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-3 p-2 bg-success/20 border border-success/30 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-success text-sm">Inscription réussie ! Merci de vous être abonné.</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-3 p-2 bg-error/20 border border-error/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-error" />
                <span className="text-error text-sm">Erreur lors de l'inscription. Veuillez réessayer.</span>
              </div>
            )}
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-xl w-full">
          <div className="p-2 sm:p-0">
            <div>
              <div className="rounded-md flex gap-2 mb-3 sm:mb-4">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <h3 className="card-title text-sm sm:text-base">Articles hebdomadaires</h3>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-base-content/70">
                Chaque semaine, découvrez un nouvel article sur mes projets,
                idées et explorations créatives. Court. Inspirant. Direct.
              </p>
            </div>
          </div>

          <div className="p-2 sm:p-0">
            <div>
              <div className="rounded-md flex gap-2 mb-3 sm:mb-4">
                <HandMetal className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <h3 className="card-title text-sm sm:text-base">Zero spam</h3>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-base-content/70">
                Juste du contenu pertinent, quand il le faut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Calendar, HandMetal, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { subscribeToNewsletter } from "../tools/supabase";
import { useLanguage } from "../hooks/useLanguage";

export default function Newsletter() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (submitStatus === 'idle') return;

    const timer = window.setTimeout(() => {
      setSubmitStatus('idle');
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [submitStatus]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await subscribeToNewsletter(trimmedEmail, trimmedName);
      setSubmitStatus('success');
      setEmail('');
      setName('');
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
            {t.newsletter.title}
          </h2>
          <p className="py-4 sm:py-6 text-sm sm:text-base text-base-content/70">
            {t.newsletter.subtitle}
          </p>
          <form onSubmit={handleSubmit} className="w-full sm:w-auto">
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              
              <div className="join w-full sm:w-auto">
                <input
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered join-item w-2/5 sm:w-auto text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered join-item w-3/5 sm:w-auto text-sm sm:text-base"
                  required
                />
              </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary join-item text-sm sm:text-base px-3 sm:px-4 disabled:opacity-50"
                >
                  {isSubmitting ? (t.contact.sending) : t.newsletter.subscribe}
                </button>
            </div>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-3 p-2 bg-success/20 border border-success/30 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-success text-sm">{t.newsletter.success}</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-3 p-2 bg-error/20 border border-error/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-error" />
                <span className="text-error text-sm">
                  {language === 'fr'
                    ? 'Erreur lors de l\'inscription. Veuillez réessayer.'
                    : 'Subscription failed. Please try again.'}
                </span>
              </div>
            )}
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-xl w-full">
          <div className="p-2 sm:p-0">
            <div>
              <div className="rounded-md flex gap-2 mb-3 sm:mb-4">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <h3 className="card-title text-sm sm:text-base">{t.newsletter.card1Title}</h3>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-base-content/70">
                {t.newsletter.card1Text}
              </p>
            </div>
          </div>

          <div className="p-2 sm:p-0">
            <div>
              <div className="rounded-md flex gap-2 mb-3 sm:mb-4">
                <HandMetal className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <h3 className="card-title text-sm sm:text-base">{t.newsletter.card2Title}</h3>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-base-content/70">
                {t.newsletter.card2Text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

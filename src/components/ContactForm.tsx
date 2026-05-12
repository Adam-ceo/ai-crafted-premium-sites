import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle2 } from 'lucide-react';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsSubmitted(true);
    } catch {
      setError('Sajnos technikai hiba történt. Kérjük, írj közvetlenül a hello@luxiflow.io címre.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center text-center h-full min-h-[350px]"
      >
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
          Üzenet elküldve!
        </h3>
        <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
          Megkaptuk az üzenetedet — 24 órán belül visszajelzünk. Ha sürgős, írj közvetlenül a{' '}
          <a href="mailto:hello@luxiflow.io" className="text-green-600 font-semibold underline">
            hello@luxiflow.io
          </a>{' '}
          címre.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest border-b border-transparent hover:border-slate-900 pb-1 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-sm"
        >
          Új üzenet írása
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6 h-full" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          htmlFor="name-input"
          className="text-[11px] font-bold text-slate-800 uppercase tracking-widest ml-1 cursor-pointer"
        >
          Neved vagy Céged neve
        </label>
        <input
          id="name-input"
          required
          type="text"
          autoComplete="name"
          placeholder="Pl. Kovács János"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-14 px-5 rounded-2xl border-0 bg-white ring-1 ring-slate-200/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email-input"
          className="text-[11px] font-bold text-slate-800 uppercase tracking-widest ml-1 cursor-pointer"
        >
          E-mail címed
        </label>
        <input
          id="email-input"
          required
          type="email"
          autoComplete="email"
          placeholder="janos@ceged.hu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-14 px-5 rounded-2xl border-0 bg-white ring-1 ring-slate-200/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium"
        />
      </div>
      <div className="space-y-2 flex-1 flex flex-col">
        <label
          htmlFor="details-input"
          className="text-[11px] font-bold text-slate-800 uppercase tracking-widest ml-1 cursor-pointer"
        >
          Projekt részletei
        </label>
        <textarea
          id="details-input"
          required
          rows={4}
          placeholder="Mesélj a terveidről, mikor szeretnél indulni..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minLength={10}
          className="w-full flex-1 min-h-[120px] p-5 rounded-2xl border-0 bg-white ring-1 ring-slate-200/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium resize-none"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-600 font-medium text-center -mt-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 mt-2 shrink-0 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-sm transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-0.5 disabled:translate-y-0 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
      >
        {isLoading ? 'Küldés...' : 'Kérek ingyenes javaslatot'}
      </button>
    </form>
  );
};

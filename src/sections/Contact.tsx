import { Mail } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';

export const Contact = () => (
  <section id="kapcsolat" className="py-24 md:py-32 bg-slate-50 border-t border-slate-200">
    <div className="max-w-5xl mx-auto px-6">
      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-slate-300" aria-hidden="true" />
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                Lépjünk kapcsolatba
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Kezdjük el együtt.
            </h2>
            <p className="text-base text-slate-500 mb-10 max-w-md leading-relaxed">
              Írd meg röviden a céljaidat, és 24 órán belül visszatérünk egy konkrét, ingyenes
              javaslattal.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-full flex justify-center items-center text-slate-600 shrink-0">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Közvetlen e-mail
                </p>
                <a
                  href="mailto:hello@luxiflow.io"
                  className="text-lg font-bold text-slate-900 hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 rounded-sm"
                >
                  hello@luxiflow.io
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);

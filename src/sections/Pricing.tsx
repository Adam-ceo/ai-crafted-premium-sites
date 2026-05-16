import { CheckCircle2 } from 'lucide-react';
import { FadeUp } from '../components/FadeUp';
import { cn } from '../lib/utils';
import { basicFeatures, proFeatures } from '../data/pricing';

export const Pricing = () => (
  <section id="arak" className="py-24 md:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-20 text-center">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-slate-300" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Árazás
            </span>
            <div className="h-px w-8 bg-slate-300" aria-hidden="true" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Tiszta keretek, 0 meglepetés.
          </h2>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
        <FadeUp delay={0.1}>
          <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-10 shadow-lg shadow-slate-200/70 hover:shadow-xl hover:shadow-slate-200/80 hover:border-slate-300 transition-all">
            <div className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">
              Bemutatkozó Oldal
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">
                105 000 Ft
              </span>
              <span className="text-slate-500 font-medium">/ projekt</span>
            </div>
            <div className="text-slate-500 mb-10 text-sm">
              Tökéletes első lépés hazai kis- és középvállalkozásoknak.
            </div>

            <div className="h-px bg-slate-200 w-full mb-10" />

            <ul className="flex flex-col gap-5 mb-10">
              {basicFeatures.map((f) => (
                <li key={f} className="text-sm font-medium text-slate-700 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />{' '}
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#kapcsolat"
              className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/20 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Érdekel a Basic csomag
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-slate-900 border border-slate-800 text-white rounded-[2rem] p-10 lg:-translate-y-3 shadow-2xl shadow-slate-900/40 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600" />

            <div className="relative z-10">
              <div className="mb-6">
                <div className="text-[11px] font-bold text-green-400 uppercase tracking-widest">
                  Növekedési Csomag
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-4xl font-extrabold text-white tracking-tight">
                  175 000 Ft
                </span>
                <span className="text-slate-400 font-medium">/ projekt</span>
              </div>
              <div className="text-slate-400 mb-10 text-sm">
                Akár 5 aloldal, teljes körű AI- és keresőoptimalizálással.
              </div>

              <div className="h-px bg-slate-800 w-full mb-10" />

              <ul className="flex flex-col gap-5 mb-10">
                {proFeatures.map(({ text, highlight }) => (
                  <li key={text} className="text-sm font-medium flex items-center gap-3">
                    <CheckCircle2
                      className={cn('w-5 h-5 shrink-0', highlight ? 'text-green-400' : 'text-slate-500')}
                      aria-hidden="true"
                    />
                    <span className={highlight ? 'text-white font-bold' : 'text-slate-400'}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#kapcsolat"
                className="block w-full text-center bg-green-500 hover:bg-green-400 text-slate-900 py-4 rounded-xl text-sm font-bold transition-all duration-300 shadow-xl shadow-green-900/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Érdekel a Növekedési csomag
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
);

import { Fragment } from 'react';
import { FadeUp } from '../components/FadeUp';
import { processSteps } from '../data/process';

export const Process = () => (
  <section id="folyamat" className="py-24 md:py-32 bg-slate-900 text-white relative overflow-hidden">
    <div
      className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none"
      aria-hidden="true"
    />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="mb-20">
        <FadeUp>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-slate-600" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              Hogyan dolgozunk?
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            A Te utad 14 nap alatt.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Nincsenek hónapokig elhúzódó körök. Tiszta keretekkel dolgozunk, így pontosan tudod,
            mikor mi történik.
          </p>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mt-20">
        {processSteps.map((step, i) => (
          <Fragment key={step.s}>
            <FadeUp delay={step.delay} className="relative group">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-display text-4xl md:text-5xl font-extrabold text-slate-400 group-hover:text-white transition-colors duration-500">
                  {step.s}
                </span>
                {i < 3 && (
                  <div className="hidden md:block flex-1 h-px bg-slate-800" aria-hidden="true" />
                )}
              </div>
              <div className="pr-6">
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.desc}</p>
              </div>
            </FadeUp>
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);

import { Fragment } from 'react';
import { FadeUp } from '../components/FadeUp';
import { cn } from '../lib/utils';
import { services } from '../data/services';

export const Services = () => (
  <section id="szolgaltatasok" className="py-20 md:py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-slate-300" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Szolgáltatások
            </span>
            <div className="h-px w-8 bg-slate-300" aria-hidden="true" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Nem csak oldalakat, hanem{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              üzleti eszközöket
            </span>{' '}
            építünk.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A szépség önmagában már nem elég. A weboldaladnak gyorsnak, meggyőzőnek és eredményeket
            hozónak kell lennie.
          </p>
        </FadeUp>
      </div>

      <div className="border-t border-slate-300 mt-8 md:mt-12">
        {services.map((f, i) => (
          <Fragment key={f.num}>
            <FadeUp
              delay={f.delay}
              className={cn(
                'flex flex-col xl:flex-row py-8 lg:py-12 gap-6 lg:gap-12 items-start group border-b border-slate-300',
                i === services.length - 1 && 'border-b-0'
              )}
            >
              <div className="w-full xl:w-2/12 xl:shrink-0 flex flex-row xl:flex-col justify-between xl:h-full gap-4">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  {f.num} — {f.cat}
                </span>
                <div className="hidden xl:block h-px w-8 bg-slate-400 mt-6 mb-auto" aria-hidden="true" />
              </div>
              <div className="w-full xl:w-4/12 xl:shrink-0">
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
                  {f.title.split('\n').map((line, j) => (
                    <Fragment key={j}>
                      {line}
                      {j === 0 && (
                        <>
                          <br className="hidden xl:block" />
                          <span className="xl:hidden"> </span>
                        </>
                      )}
                    </Fragment>
                  ))}
                </h3>
              </div>
              <div className="w-full xl:w-6/12 flex flex-col gap-4">
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">{f.body}</p>
              </div>
            </FadeUp>
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);

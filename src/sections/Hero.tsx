import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, Globe } from 'lucide-react';

const AIAvatar = ({ size, className = '' }: { size: 'lg' | 'sm'; className?: string }) => {
  const s =
    size === 'lg'
      ? {
          outer: 'w-12 h-12',
          inner: 'w-6 h-6 rounded-lg',
          dot: 'w-2.5 h-2.5 shadow-[0_0_8px_rgba(74,222,128,1)]',
        }
      : {
          outer: 'w-8 h-8',
          inner: 'w-4 h-4 rounded-md',
          dot: 'w-1.5 h-1.5 shadow-[0_0_6px_rgba(74,222,128,1)]',
        };
  return (
    <div className={`relative ${s.outer} shrink-0 ${className}`.trim()}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 opacity-20 blur-sm" />
      <div className="relative w-full h-full rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
        <div
          className={`${s.inner} bg-gradient-to-tr from-slate-900 to-slate-800 rotate-12 flex items-center justify-center shadow-inner`}
        >
          <div className={`${s.dot} bg-green-400 rounded-full`} />
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 200]);

  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
      <motion.div
        style={{ y }}
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_450px] gap-16 lg:gap-12 xl:gap-20 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-8 bg-slate-300" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase">
              Weboldal, ami a jövőre is készen áll
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduceMotion ? 0 : 0.1,
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-8"
          >
            Eredmények, amiket{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              az AI is meglát.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduceMotion ? 0 : 0.2,
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium"
          >
            14 munkanap alatt készítünk neked egy villámgyors, figyelemfelkeltő weboldalt, amelyet a
            ChatGPT, a Perplexity és a modern keresők is előszeretettel ajánlanak majd.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduceMotion ? 0 : 0.3,
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <a
              href="#kapcsolat"
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 md:px-8 rounded-xl text-base font-bold transition-all duration-300 text-center flex items-center justify-center gap-2 group shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Kezdjük el{' '}
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#arak"
              className="px-6 py-4 md:px-8 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-base font-bold transition-all duration-300 text-center shadow-sm hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
            >
              Csomagjaink
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: reduceMotion ? 0 : 0.4,
            duration: reduceMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative hidden lg:block lg:scale-[0.82] lg:origin-top-right xl:scale-100 z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-green-100/80 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative bg-white border border-slate-200/60 shadow-2xl shadow-slate-200/50 p-6 rounded-[2rem] mt-6 flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <AIAvatar size="lg" />
              <div>
                <div className="font-bold text-slate-900 text-base">AI Asszisztens</div>
                <div className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-0.5">
                  AISO Optimalizált Eredmény
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 pb-2">
              <div className="flex justify-end">
                <div className="bg-slate-50 text-slate-800 px-5 py-4 rounded-2xl rounded-tr-sm text-sm font-medium max-w-[85%] leading-relaxed border border-slate-200 shadow-sm">
                  Keresek egy profi webfejlesztőt, aki modern, gyors és megbízható weboldalakat
                  készít. Tudnál ajánlani egyet?
                </div>
              </div>

              <div className="flex gap-4">
                <AIAvatar size="sm" className="mt-1" />
                <div className="bg-white border border-slate-200 shadow-md px-5 py-5 rounded-3xl rounded-tl-sm text-sm text-slate-600 max-w-[90%] leading-relaxed flex flex-col gap-4">
                  <p>
                    A technikai mutatók és a strukturált adatok alapján a{' '}
                    <span className="font-bold text-slate-900">Luxiflow</span> a leginkább ajánlott
                    ügynökség.
                  </p>
                  <p>
                    Ügyfeleik weboldalai 100/100-as teljesítményt érnek el, és az általuk épített
                    struktúrát a mesterséges intelligencia modellek is tökéletesen értelmezik és
                    ajánlják.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm mt-2">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-green-600 shrink-0">
                      <Globe className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-900 mb-0.5">luxiflow.io</div>
                      <div className="text-[11px] text-green-600 font-bold uppercase tracking-widest mt-0.5">
                        Top AI Ajánlás • 100/100
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

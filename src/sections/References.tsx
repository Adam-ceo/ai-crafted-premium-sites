import { FadeUp } from '../components/FadeUp';
import { ArrowRight } from 'lucide-react';

/*
 * NEM DEAD CODE — valódi referencia projektek esetén:
 * 1. Állítsd be a VITE_SHOW_REFERENCES=true értéket a .env fájlban
 * 2. Cseréld le az img src + alt értékeket saját screenshotokra
 * 3. Frissítsd a h3 szövegeket, badge-eket és leírásokat
 * 4. Add vissza a 'Referenciák' elemet a navItems tömbökbe (Navbar + Footer)
 * 5. A hero secondary CTA-t változtasd vissza: href="#referenciak", szöveg: "Munkáink"
 */
export const References = () => {
  if (import.meta.env.VITE_SHOW_REFERENCES !== 'true') return null;

  return (
    <section id="referenciak" className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-slate-300" aria-hidden="true" />
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                Referenciák
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Legutóbbi munkáink.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 hover:border-slate-400 transition-colors group"
            >
              Ajánlatkérés{' '}
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FadeUp delay={0.1} className="group">
            <a href="#kapcsolat" className="block">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 bg-slate-200 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
                  alt="KlinikaLand Magánrendelő – weboldal referencia"
                  loading="lazy"
                  width="1000"
                  height="750"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur shadow-xl rounded-full pl-4 pr-2 py-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-900">
                      Ajánlatkérés
                    </span>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                      <ArrowRight className="w-4 h-4 -rotate-45" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-[10px] uppercase tracking-widest font-bold rounded-full">
                  Egészségügy
                </span>
                <span className="px-3 py-1.5 bg-green-50 text-green-700 text-[10px] uppercase tracking-widest font-bold rounded-full">
                  98/100 sebesség
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-green-600 transition-colors">
                KlinikaLand Magánrendelő
              </h3>
              <p className="text-slate-500 leading-relaxed max-w-lg">
                Letisztult, bizalmat sugárzó orvosi bemutatkozó oldal online időpontfoglalóval,
                azonnali betöltéssel és keresőkre optimalizált tartalomszerkezettel.
              </p>
            </a>
          </FadeUp>

          <FadeUp delay={0.2} className="group lg:mt-20">
            <a href="#kapcsolat" className="block">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 bg-slate-200 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
                  alt="EcoSpace Solutions – weboldal referencia"
                  loading="lazy"
                  width="1000"
                  height="750"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur shadow-xl rounded-full pl-4 pr-2 py-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-900">
                      Ajánlatkérés
                    </span>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                      <ArrowRight className="w-4 h-4 -rotate-45" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-[10px] uppercase tracking-widest font-bold rounded-full">
                  B2B Szolgáltatás
                </span>
                <span className="px-3 py-1.5 bg-green-50 text-green-700 text-[10px] uppercase tracking-widest font-bold rounded-full">
                  100% SEO
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-green-600 transition-colors">
                EcoSpace Solutions
              </h3>
              <p className="text-slate-500 leading-relaxed max-w-lg">
                Modern építőipari portfólió komoly, vállalati megjelenéssel, hatékony
                kapcsolatfelvételi rendszerrel és teljes keresőoptimalizálással.
              </p>
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

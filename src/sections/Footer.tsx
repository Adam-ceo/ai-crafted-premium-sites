import { toAnchor } from '../lib/utils';

const footerNavItems = ['Kezdőlap', 'Szolgáltatások', 'Folyamat', 'Árak'] as const;

interface FooterProps {
  openPrivacy: () => void;
}

export const Footer = ({ openPrivacy }: FooterProps) => (
  <footer className="bg-slate-900 pt-20 pb-10 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
      <div className="md:col-span-4 lg:col-span-5">
        <div className="font-display text-2xl font-extrabold text-white tracking-tight mb-6 flex items-center group">
          Luxiflow
          <span className="text-green-600 transition-transform duration-300 group-hover:scale-125 inline-block">
            .
          </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
          Prémium webügynökség. Célunk, hogy a magyar kis- és középvállalkozások 14 nap alatt
          világszínvonalú online megjelenést és modern AI-alapú keresőoptimalizálást kapjanak.
        </p>
      </div>

      <div className="md:col-span-4 lg:col-span-3">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">
          Navigáció
        </div>
        <nav className="flex flex-col gap-4">
          {footerNavItems.map((item) => (
            <a
              key={item}
              href={item === 'Kezdőlap' ? '#' : `#${toAnchor(item)}`}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors w-fit focus:outline-none focus:ring-1 focus:ring-slate-400 rounded-sm"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div className="md:col-span-4 lg:col-span-4">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">
          Kapcsolat
        </div>
        <div className="space-y-4">
          <a
            href="mailto:hello@luxiflow.io"
            className="block text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 rounded-sm"
          >
            hello@luxiflow.io
          </a>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-xs font-semibold text-slate-500">
        © {new Date().getFullYear()} Luxiflow. Minden jog fenntartva.
      </p>
      <div className="flex gap-6">
        <button
          onClick={openPrivacy}
          className="text-xs font-semibold text-slate-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-sm"
        >
          Adatvédelmi tájékoztató
        </button>
      </div>
    </div>
  </footer>
);

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { toAnchor } from '../lib/utils';

const navItems = ['Kezdőlap', 'Szolgáltatások', 'Folyamat', 'Árak'] as const;

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const reduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sectionIds = ['szolgaltatasok', 'folyamat', 'arak', 'kapcsolat'];
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const current = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 120 && bottom >= 120;
      });
      setActiveSection(current ?? '');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
            : 'bg-white/0 border-transparent py-2',
          isMobileMenuOpen && 'bg-white border-slate-200'
        )}
      >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-2xl font-extrabold text-slate-900 tracking-tight flex items-center group"
        >
          Luxiflow
          <span className="text-green-600 transition-transform duration-300 group-hover:scale-125 inline-block">
            .
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex gap-8">
            {navItems.map((item) => {
              const isActive =
                item === 'Kezdőlap' ? activeSection === '' : activeSection === toAnchor(item);
              return (
                <a
                  key={item}
                  href={item === 'Kezdőlap' ? '#' : `#${toAnchor(item)}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'text-sm font-semibold transition-colors focus:outline-hidden focus-visible:outline-hidden rounded-sm',
                    isActive
                      ? 'text-green-600'
                      : 'text-slate-600 hover:text-green-600'
                  )}
                >
                  {item}
                </a>
              );
            })}
          </nav>
          <a
            href="#kapcsolat"
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5 focus:outline-hidden focus-visible:outline-hidden"
          >
            Ajánlatkérés
          </a>
        </div>

        <button
          ref={hamburgerRef}
          aria-label={isMobileMenuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
          aria-expanded={isMobileMenuOpen}
          className="lg:hidden p-2 text-slate-600 focus:outline-hidden focus-visible:outline-hidden rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="lg:hidden overflow-hidden bg-white backdrop-blur-3xl border-b border-slate-200"
          >
            <div ref={menuRef} className="px-6 py-6 flex flex-col gap-4">
              {([...navItems, 'Kapcsolat'] as const).map((item) => (
                <a
                  key={item}
                  href={item === 'Kezdőlap' ? '#' : `#${toAnchor(item)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-slate-900 py-2 border-b border-slate-100 focus:outline-hidden focus-visible:outline-hidden rounded-sm"
                >
                  {item}
                </a>
              ))}
              <a
                href="#kapcsolat"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-slate-900 text-white text-center py-4 rounded-xl text-base font-bold mt-4 shadow-lg shadow-slate-900/20 focus:outline-hidden focus-visible:outline-hidden"
              >
                Ajánlatkérés
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
};

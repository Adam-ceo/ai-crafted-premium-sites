import { useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handleTab = (e: KeyboardEvent) => {
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
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.97 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: reduceMotion ? 0 : 0.35 }}
            className="fixed inset-x-4 top-[8%] bottom-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-[101] bg-white rounded-3xl shadow-2xl shadow-slate-900/20 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 shrink-0">
              <h2
                id="modal-title"
                className="font-display text-lg font-extrabold text-slate-900 tracking-tight"
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Bezárás"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1"
              >
                <X className="w-4 h-4 text-slate-600" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6 text-sm text-slate-600 leading-relaxed space-y-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

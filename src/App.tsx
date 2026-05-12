import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Modal } from './components/Modal';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { Process } from './sections/Process';
import { References } from './sections/References';
import { Pricing } from './sections/Pricing';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { PrivacyPolicyContent } from './content/PrivacyPolicyContent';

export default function App() {
  const reduceMotion = useReducedMotion();
  const [activeModal, setActiveModal] = useState<'privacy' | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const openPrivacy = () => setActiveModal('privacy');
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <>
        <Modal
          isOpen={activeModal === 'privacy'}
          onClose={closeModal}
          title="Adatvédelmi tájékoztató"
        >
          <PrivacyPolicyContent />
        </Modal>

        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen selection:bg-green-200 selection:text-green-900 overflow-hidden">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-slate-900 focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Ugrás a főtartalomra
          </a>
          <Navbar />

          <main id="main-content" tabIndex={-1} className="outline-none">
            <Hero />
            <Services />
            <Process />
            <References />
            <Pricing />
            <Contact />
          </main>

          <Footer openPrivacy={openPrivacy} />
        </div>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
              }
              className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-slate-900 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              aria-label="Vissza a tetejére"
            >
              <ArrowUp className="w-5 h-5" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </>
    </ErrorBoundary>
  );
}

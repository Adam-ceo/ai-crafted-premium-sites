import { lazy, Suspense } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

const Services     = lazy(() => import("@/components/Services"));
const Process      = lazy(() => import("@/components/Process"));
const Pricing      = lazy(() => import("@/components/Pricing"));
const WhyUs        = lazy(() => import("@/components/WhyUs"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const CtaBanner    = lazy(() => import("@/components/CtaBanner"));
const Contact      = lazy(() => import("@/components/Contact"));
const Footer       = lazy(() => import("@/components/Footer"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));
const BackToTop    = lazy(() => import("@/components/BackToTop"));

// Set to true once you have real client testimonials to display
const SHOW_TESTIMONIALS = false;

export default function Index() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Suspense fallback={null}>
          <Services />
          <Process />
          <Pricing />
          <WhyUs />
          {SHOW_TESTIMONIALS && <Testimonials />}
          <CtaBanner />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <CookieBanner />
        <BackToTop />
      </Suspense>
    </>
  );
}

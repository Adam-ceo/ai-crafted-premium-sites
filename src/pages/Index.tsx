import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function Index() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Process />
        <Pricing />
        <WhyUs />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}

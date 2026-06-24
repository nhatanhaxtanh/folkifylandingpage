import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import InstrumentsSection from "@/components/sections/InstrumentsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AIPitchSection from "@/components/sections/AIPitchSection";
import PricingSection from "@/components/sections/PricingSection";
import WhySection from "@/components/sections/WhySection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import FooterColumn from "@/components/ui/footer-column";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <InstrumentsSection />
      <FeaturesSection />
      <AIPitchSection />
      <WhySection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <FooterColumn />
    </main>
  );
}

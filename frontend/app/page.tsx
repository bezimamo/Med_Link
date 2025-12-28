import { Navbar, Footer } from '@/components/layout';
import {
  HeroSection,
  FeaturesSection,
  AboutSection,
  HowItWorksSection,
  TestimonialsSection,
  ContactSection,
} from '@/components/landingpage';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

import { Hero } from "@/components/home/Hero";
import { StatStrip } from "@/components/home/StatStrip";
import { Story } from "@/components/home/Story";
import { ServicesMarquee } from "@/components/home/ServicesMarquee";
import { AIShowcase } from "@/components/home/AIShowcase";
import { LocationsGrid } from "@/components/home/LocationsGrid";
import { Press } from "@/components/home/Press";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatStrip />
      <Story />
      <ServicesMarquee />
      <AIShowcase />
      <LocationsGrid />
      <Press />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

import { Hero } from "@/components/home/Hero";
import { StatStrip } from "@/components/home/StatStrip";
import { Signature } from "@/components/home/Signature";
import { Story } from "@/components/home/Story";
import { Gallery } from "@/components/home/Gallery";
import { InstagramSection } from "@/components/social/InstagramSection";
import { AIShowcase } from "@/components/home/AIShowcase";
import { ClubTeaser } from "@/components/home/ClubTeaser";
import { MapTeaser } from "@/components/home/MapTeaser";
import { Press } from "@/components/home/Press";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatStrip />
      <Signature />
      <Story />
      <Gallery />
      <InstagramSection />
      <AIShowcase />
      <ClubTeaser />
      <MapTeaser />
      <Press />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

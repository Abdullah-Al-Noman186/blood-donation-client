"use client";

import Hero from "@/components/home/Hero";
import LiveStats from "@/components/home/LiveStats";
import SearchCTA from "@/components/home/SearchCTA";
import Features from "@/components/home/Features";


import HowItWorks from "@/components/home/HowItWorks";
import BloodCompatibility from "@/components/home/BloodCompatibility";
import ImpactSection from "@/components/home/ImpactSection";
import Testimonials from "@/components/home/Testimonials";

import FAQ from "@/components/home/FAQ";
import VolunteerCTA from "@/components/home/VolunteerCTA";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <main className="bg-gray-50 overflow-x-hidden">

      {/* HERO */}
      <Hero />

      {/* LIVE STATS */}
      <LiveStats />

      {/* SEARCH CTA */}
      <SearchCTA />

      {/* FEATURES */}
      <Features />

      
    

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* BLOOD COMPATIBILITY */}
      <BloodCompatibility />

      {/* IMPACT SECTION */}
      <ImpactSection />

      {/* TESTIMONIALS */}
      <Testimonials />

      

      {/* FAQ */}
      <FAQ />

      {/* VOLUNTEER CTA */}
      <VolunteerCTA />

      {/* CONTACT */}
      <ContactSection />

    </main>
  );
}
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Features from "@/components/Features";
import UpcomingFeatures from "@/components/UpcomingFeatures";
import Comparison from "@/components/Comparison";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Features />
        <Comparison />
        <UpcomingFeatures />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

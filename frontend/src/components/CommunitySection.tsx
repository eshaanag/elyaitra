import { useEffect, useRef, useState } from "react";

const CommunitySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-background to-card"
    >
      {/* Animated glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Left orb */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2">
          <div className="relative w-[400px] h-[400px]">
            <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-glow" style={{ animationDuration: "4s" }} />
            <div className="absolute inset-8 rounded-full bg-primary/10 animate-pulse-glow" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
            <div className="absolute inset-16 rounded-full bg-primary/15 animate-pulse-glow" style={{ animationDuration: "2s", animationDelay: "1s" }} />
            <div className="absolute inset-24 rounded-full bg-primary/20 animate-pulse-glow" style={{ animationDuration: "2s", animationDelay: "0.3s" }} />
          </div>
        </div>

        {/* Right orb */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2">
          <div className="relative w-[400px] h-[400px]">
            <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-glow" style={{ animationDuration: "4s", animationDelay: "1s" }} />
            <div className="absolute inset-8 rounded-full bg-primary/10 animate-pulse-glow" style={{ animationDuration: "3s", animationDelay: "1.5s" }} />
            <div className="absolute inset-16 rounded-full bg-primary/15 animate-pulse-glow" style={{ animationDuration: "2s", animationDelay: "0.8s" }} />
            <div className="absolute inset-24 rounded-full bg-primary/20 animate-pulse-glow" style={{ animationDuration: "2s", animationDelay: "1.3s" }} />
          </div>
        </div>

        {/* Subtle center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center px-5 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="text-sm font-medium text-primary">
            Join Our Community
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-white italic">Start Learning Smarter</span>
          <br />
          <span className="text-primary italic">Today</span>
        </h2>

        {/* Subtitle */}
        <p
          className={`text-muted-foreground text-lg max-w-xl mx-auto mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Join thousands of learners in our vibrant community. Get instant help,
          share knowledge, and grow together.
        </p>

        {/* WhatsApp ONLY */}
        <div
          className={`flex items-center justify-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="https://wa.me/YOUR_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-44 h-16 rounded-full bg-[#25D366] text-white overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <svg
              className="w-8 h-8 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
          </a>
        </div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/40 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-primary/30 animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-white/20 animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-primary/20 animate-float" />
      </div>
    </section>
  );
};

export default CommunitySection;

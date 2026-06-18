"use client";

import { Waves, Sparkles, Zap, Code, FileText, Rocket, ArrowRight, Play } from "lucide-react";
import { AnimatedHeroBackground } from "@/components/animated-hero-background";

interface HeroSectionProps {
  onStartBuilding: () => void;
  onTryDemo: () => void;
}

export function HeroSection({ onStartBuilding, onTryDemo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <AnimatedHeroBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="text-center animate-slide-up">
          {/* Logo mark */}
          <div className="inline-flex items-center justify-center mb-10">
            <div className="relative animate-tentacle">
              <div className="bg-cyan/8 p-4 rounded-2xl border-2 border-cyan/20">
                <Waves className="h-12 w-12 text-cyan" strokeWidth={1.5} />
              </div>
              <Sparkles className="h-5 w-5 text-coral absolute -top-1 -right-1" />
              <Sparkles className="h-3.5 w-3.5 text-lime absolute -bottom-0.5 -left-1" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
            Turn hackathon ideas into
            <br />
            <span className="bg-gradient-to-r from-cyan to-plum bg-clip-text text-transparent">
              build-ready
            </span>{" "}
            projects.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-foreground/55 max-w-2xl mx-auto mb-12 leading-relaxed">
            SquidCode helps non-coders transform hackathon, grant, and bounty
            opportunities into project ideas, MVP plans, coding prompts, pitches,
            demo scripts, and submission checklists.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onStartBuilding}
              className="btn-brutal bg-foreground text-background border-foreground shadow-foreground/15 flex items-center gap-2 px-8 py-4 text-base"
            >
              Start Building <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onTryDemo}
              className="btn-brutal bg-background text-foreground border-foreground/15 shadow-foreground/8 flex items-center gap-2 px-8 py-4 text-base font-semibold"
            >
              <Play className="h-4 w-4" /> Try Demo Opportunity
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="chip bg-coral/8 text-coral border-coral/15">
              <Zap className="h-3.5 w-3.5" /> No-code friendly
            </span>
            <span className="chip bg-cyan/8 text-cyan border-cyan/15">
              <Code className="h-3.5 w-3.5" /> Mock AI MVP
            </span>
            <span className="chip bg-lime/8 text-lime border-lime/15">
              <Rocket className="h-3.5 w-3.5" /> Hackathon ready
            </span>
            <span className="chip bg-plum/8 text-plum border-plum/15">
              <FileText className="h-3.5 w-3.5" /> Exportable outputs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Waves, Sparkles, ChevronRight, Check } from "lucide-react";

export type Step = "home" | "profile" | "opportunity" | "ideas" | "planner" | "outputs" | "saved";

const NAV_ITEMS: { step: Step; label: string }[] = [
  { step: "home", label: "Home" },
  { step: "profile", label: "Profile" },
  { step: "opportunity", label: "Opportunity" },
  { step: "ideas", label: "Ideas" },
  { step: "planner", label: "Planner" },
  { step: "outputs", label: "Outputs" },
  { step: "saved", label: "Saved" },
];

const STEP_ORDER: Step[] = ["profile", "opportunity", "ideas", "planner", "outputs", "saved"];

interface SquidNavProps {
  currentStep: Step;
  onNavigate: (step: Step) => void;
  completedSteps: Set<Step>;
}

export function SquidNav({ currentStep, onNavigate, completedSteps }: SquidNavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050814]/92 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Logo row */}
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <div className="bg-cyan/10 p-1.5 rounded-lg border-2 border-cyan/30 group-hover:border-cyan/50 transition-colors">
                <Waves className="h-5 w-5 text-cyan" />
              </div>
              <Sparkles className="h-2.5 w-2.5 text-coral absolute -top-0.5 -right-0.5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Squid<span className="text-cyan">Code</span>
            </span>
          </button>

          {/* Desktop progress stepper */}
          <div className="hidden md:flex items-center gap-0.5">
            {STEP_ORDER.map((step, i) => {
              const isActive = currentStep === step;
              const isDone = completedSteps.has(step);
              return (
                <React.Fragment key={step}>
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-foreground/15 mx-0.5" />
                  )}
                  <button
                    onClick={() => onNavigate(step)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#3cffd0] text-black"
                        : isDone
                        ? "text-cyan hover:bg-cyan/10"
                        : "text-white/62 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    {isDone && !isActive && <Check className="h-3 w-3" />}
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Mobile scrollable nav */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 md:hidden scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6">
          {NAV_ITEMS.map(({ step, label }) => {
            const isActive = currentStep === step;
            const isDone = completedSteps.has(step);
            return (
              <button
                key={step}
                onClick={() => onNavigate(step)}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all border-2 ${
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : isDone
                    ? "bg-cyan/8 text-cyan border-cyan/20 hover:bg-cyan/15"
                    : "bg-foreground/3 text-foreground/50 border-transparent hover:border-foreground/10 hover:bg-foreground/5"
                }`}
              >
                {isDone && !isActive && <Check className="h-3.5 w-3.5" />}
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

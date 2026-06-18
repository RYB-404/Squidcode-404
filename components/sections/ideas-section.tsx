"use client";

import { useState } from "react";
import { Lightbulb, Star, Users, AlertCircle, CheckCircle2, Zap, ChevronRight } from "lucide-react";
import { BuilderProfile, Opportunity, AnalysisResult, IdeaBranch, Difficulty } from "@/lib/types";
import { generateIdeaBranches } from "@/lib/mock-ai";

interface IdeasSectionProps {
  profile: BuilderProfile | null;
  opportunity: Opportunity | null;
  analysis: AnalysisResult | null;
  selectedIdea: IdeaBranch | null;
  onIdeaSelected: (idea: IdeaBranch) => void;
}

const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; text: string; border: string }> = {
  low: { bg: "bg-lime/8", text: "text-lime", border: "border-lime/20" },
  medium: { bg: "bg-coral/8", text: "text-coral", border: "border-coral/20" },
  high: { bg: "bg-plum/8", text: "text-plum", border: "border-plum/20" },
};

export function IdeasSection({ profile, opportunity, analysis, selectedIdea, onIdeaSelected }: IdeasSectionProps) {
  const [ideas, setIdeas] = useState<IdeaBranch[]>([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!profile || !opportunity || !analysis) return;
    setLoading(true);
    setTimeout(() => {
      const result = generateIdeaBranches(profile, opportunity, analysis);
      setIdeas(result);
      setGenerated(true);
      setLoading(false);
    }, 1500);
  };

  if (!profile || !opportunity || !analysis) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <EmptyState
          icon={Lightbulb}
          title="No opportunity analyzed yet"
          description="Analyze an opportunity first to generate idea branches."
        />
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="section-header">
        <div className="section-icon bg-cyan/8 text-cyan border-cyan/20">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Idea Branches</h2>
          <p className="text-sm text-foreground/50 mt-0.5">Generate divergent project ideas tailored to you and this opportunity.</p>
        </div>
      </div>

      {!generated ? (
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-bold text-base border-2.5 transition-all flex items-center justify-center gap-2 ${
            !loading
              ? "btn-brutal bg-cyan text-cyan-foreground border-cyan shadow-cyan/20"
              : "bg-foreground/5 text-foreground/25 border-foreground/8 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-pulse-soft">Branching ideas</span>
              <span className="inline-flex gap-0.5">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
              </span>
            </span>
          ) : (
            <>Generate Idea Branches <ChevronRight className="h-4 w-4" /></>
          )}
        </button>
      ) : (
        <div className="space-y-4">
          {ideas.map((idea, index) => {
            const isSelected = selectedIdea?.name === idea.name;
            const diff = DIFFICULTY_STYLES[idea.difficulty];
            return (
              <div
                key={idea.name}
                className={`animate-slide-up card-brutal p-5 transition-all ${
                  isSelected ? "!border-cyan !shadow-[4px_4px_0_0_hsl(var(--cyan)/0.2)] ring-1 ring-cyan/20" : ""
                }`}
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-extrabold text-foreground leading-snug">{idea.name}</h3>
                    <p className="text-sm text-foreground/55 mt-1 leading-relaxed">{idea.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`chip ${diff.bg} ${diff.text} ${diff.border}`}>
                      {idea.difficulty}
                    </span>
                    <span className="chip bg-coral/8 text-coral border-coral/20">
                      <Star className="h-3.5 w-3.5" /> {idea.demoStrength}/10
                    </span>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-wider flex items-center gap-1">
                      <Users className="h-3 w-3" /> Target User
                    </span>
                    <p className="text-sm font-medium text-foreground/80 mt-1 leading-snug">{idea.targetUser}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Problem
                    </span>
                    <p className="text-sm font-medium text-foreground/80 mt-1 leading-snug">{idea.problem}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Solution
                    </span>
                    <p className="text-sm font-medium text-foreground/80 mt-1 leading-snug">{idea.solution}</p>
                  </div>
                </div>

                {/* Why it can win */}
                <div className="bg-lime/5 rounded-lg border border-lime/12 p-3.5 mb-4">
                  <p className="text-[11px] font-bold text-lime uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Why It Can Win
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">{idea.whyItCanWin}</p>
                </div>

                <button
                  onClick={() => onIdeaSelected(idea)}
                  className={`w-full py-2.5 rounded-lg font-bold text-sm border-2.5 transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-cyan text-cyan-foreground border-cyan"
                      : "btn-brutal bg-foreground text-background border-foreground shadow-foreground/15"
                  }`}
                >
                  {isSelected ? "Selected" : <>Select Branch <ChevronRight className="h-4 w-4" /></>}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-foreground/4 rounded-2xl p-5 mb-4 border-2 border-foreground/6">
        <Icon className="h-10 w-10 text-foreground/20" />
      </div>
      <h3 className="text-lg font-extrabold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-foreground/40 max-w-xs leading-relaxed">{description}</p>
    </div>
  );
}

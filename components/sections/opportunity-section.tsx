"use client";

import { useState } from "react";
import { Search, FileText, BarChart3, Target, Clock, Lightbulb, Star, TrendingUp, ChevronRight } from "lucide-react";
import { BuilderProfile, Opportunity, AnalysisResult, DEMO_OPPORTUNITY_TEXT } from "@/lib/types";
import { analyzeOpportunity } from "@/lib/mock-ai";

interface OpportunitySectionProps {
  profile: BuilderProfile | null;
  opportunity: Opportunity | null;
  analysis: AnalysisResult | null;
  onAnalyze: (opportunity: Opportunity, analysis: AnalysisResult) => void;
}

export function OpportunitySection({ profile, opportunity, analysis, onAnalyze }: OpportunitySectionProps) {
  const [text, setText] = useState(opportunity?.description || "");
  const [title, setTitle] = useState(opportunity?.title || "");
  const [loading, setLoading] = useState(false);

  const handleDemo = () => {
    setTitle("0G Labs - Vibe Coding Tournament");
    setText(DEMO_OPPORTUNITY_TEXT);
  };

  const handleAnalyze = () => {
    if (!text.trim() || !profile) return;
    setLoading(true);
    setTimeout(() => {
      const opp: Opportunity = {
        title: title || "Untitled Opportunity",
        description: text,
        deadline: text.match(/(?:by|deadline|due)\s+(\w+\s+\d+)/i)?.[1],
      };
      const result = analyzeOpportunity(profile, opp);
      onAnalyze(opp, result);
      setLoading(false);
    }, 1200);
  };

  if (!profile) {
    return (
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <EmptyState icon={FileText} title="No profile yet" description="Complete your Builder Profile first so we can analyze your fit." />
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="section-header">
        <div className="section-icon bg-coral/8 text-coral border-coral/20">
          <Search className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Opportunity Analyzer</h2>
          <p className="text-sm text-foreground/50 mt-0.5">Paste hackathon, grant, or bounty info to analyze your fit.</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <div className="card-brutal-static p-5">
          <label className="block text-sm font-bold text-foreground mb-2">Opportunity Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., ETH Global Hackathon 2025"
            className="w-full px-4 py-2.5 rounded-lg border-2 border-foreground/8 bg-background text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/15 transition-all text-sm"
          />
        </div>

        {/* Text area */}
        <div className="card-brutal-static p-5">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-bold text-foreground">Opportunity Details</label>
            <button
              onClick={handleDemo}
              className="text-xs font-semibold text-cyan hover:text-cyan/80 transition-colors underline underline-offset-2 decoration-cyan/30"
            >
              Fill demo sample
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste hackathon, grant, or bounty information here..."
            rows={6}
            className="w-full px-4 py-2.5 rounded-lg border-2 border-foreground/8 bg-background text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/15 transition-all resize-y text-sm leading-relaxed"
          />
        </div>

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          disabled={!text.trim() || loading}
          className={`w-full py-3.5 rounded-xl font-bold text-base border-2.5 transition-all flex items-center justify-center gap-2 ${
            text.trim() && !loading
              ? "btn-brutal bg-coral text-coral-foreground border-coral shadow-coral/20"
              : "bg-foreground/5 text-foreground/25 border-foreground/8 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-pulse-soft">Analyzing opportunity</span>
              <span className="inline-flex gap-0.5">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
              </span>
            </span>
          ) : (
            <>Analyze Opportunity <ChevronRight className="h-4 w-4" /></>
          )}
        </button>

        {/* Analysis Results */}
        {analysis && (
          <div className="animate-slide-up space-y-4">
            <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-coral" />
              Analysis Results
            </h3>

            {/* Fit score hero */}
            <div className="card-brutal p-5 flex items-center gap-5">
              <div className="shrink-0 w-20 h-20 rounded-2xl bg-cyan/8 border-2 border-cyan/20 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-cyan leading-none">{analysis.fitScore}</span>
                <span className="text-[10px] font-bold text-cyan/60 uppercase tracking-wider mt-0.5">Fit Score</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">{analysis.theme}</p>
                <p className="text-sm text-foreground/50 mt-1">{analysis.recommendedStrategy}</p>
              </div>
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: BarChart3, label: "Difficulty", value: analysis.difficulty, iconBg: "bg-lime/8 border-lime/15", iconText: "text-lime" },
                { icon: Clock, label: "Deadline Pressure", value: analysis.deadlinePressure, iconBg: "bg-coral/8 border-coral/15", iconText: "text-coral" },
                { icon: Star, label: "Best Project Type", value: analysis.bestProjectType, iconBg: "bg-cyan/8 border-cyan/15", iconText: "text-cyan" },
                { icon: TrendingUp, label: "Demo Potential", value: analysis.demoPotential, iconBg: "bg-plum/8 border-plum/15", iconText: "text-plum" },
              ].map(({ icon: Icon, label, value, iconBg, iconText }) => (
                <div
                  key={label}
                  className="card-brutal-static p-4 flex items-start gap-3"
                >
                  <div className={`shrink-0 w-8 h-8 rounded-lg border ${iconBg} flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${iconText}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-foreground/40 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5 leading-snug">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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

"use client";

import { useState } from "react";
import { ClipboardList, AlertTriangle, ListChecks, ArrowRight, Clock, Shield, ChevronRight, Check } from "lucide-react";
import { BuilderProfile, Opportunity, IdeaBranch, MVPPlan } from "@/lib/types";
import { generateMVPPlan } from "@/lib/mock-ai";

interface PlannerSectionProps {
  profile: BuilderProfile | null;
  opportunity: Opportunity | null;
  selectedIdea: IdeaBranch | null;
  mvpPlan: MVPPlan | null;
  onPlanGenerated: (plan: MVPPlan) => void;
}

export function PlannerSection({ profile, opportunity, selectedIdea, mvpPlan, onPlanGenerated }: PlannerSectionProps) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!profile || !opportunity || !selectedIdea) return;
    setLoading(true);
    setTimeout(() => {
      const plan = generateMVPPlan(profile, opportunity, selectedIdea);
      onPlanGenerated(plan);
      setLoading(false);
    }, 1000);
  };

  if (!selectedIdea) {
    return (
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <EmptyState
          icon={ClipboardList}
          title="No idea selected yet"
          description="Select an idea branch first to generate an MVP plan."
        />
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="section-header">
        <div className="section-icon bg-lime/8 text-lime border-lime/20">
          <ClipboardList className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Project Planner</h2>
          <p className="text-sm text-foreground/50 mt-0.5">Your focused MVP plan for "{selectedIdea.name}"</p>
        </div>
      </div>

      {!mvpPlan ? (
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-bold text-base border-2.5 transition-all flex items-center justify-center gap-2 ${
            !loading
              ? "btn-brutal bg-lime text-lime-foreground border-lime shadow-lime/20"
              : "bg-foreground/5 text-foreground/25 border-foreground/8 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-pulse-soft">Generating plan</span>
              <span className="inline-flex gap-0.5">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
              </span>
            </span>
          ) : (
            <>Generate MVP Plan <ChevronRight className="h-4 w-4" /></>
          )}
        </button>
      ) : (
        <div className="animate-slide-up space-y-5">
          {/* Summary */}
          <div className="bg-foreground text-background rounded-xl border-2.5 border-foreground p-5 shadow-[4px_4px_0_0_hsl(var(--foreground)/0.2)]">
            <h3 className="font-extrabold text-base mb-2">MVP Summary</h3>
            <p className="text-sm text-background/80 leading-relaxed">{mvpPlan.summary}</p>
          </div>

          {/* Scope Control Warning */}
          <div className="bg-coral/4 rounded-xl border-2 border-coral/20 p-4 flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-coral/10 border border-coral/15 flex items-center justify-center mt-0.5">
              <AlertTriangle className="h-4 w-4 text-coral" />
            </div>
            <div>
              <p className="text-sm font-bold text-coral mb-0.5">Scope Control</p>
              <p className="text-sm text-foreground/65 leading-relaxed">Do not overbuild. Build the simplest demo that clearly matches the opportunity and judging criteria.</p>
            </div>
          </div>

          {/* Core Features */}
          <PlanCard title="Core Features" icon={ListChecks} items={mvpPlan.coreFeatures} color="cyan" />

          {/* Build First */}
          <PlanCard title="What to Build First" icon={ArrowRight} items={mvpPlan.buildFirst} color="lime" />

          {/* Don't Build */}
          <PlanCard title="What NOT to Build" icon={Shield} items={mvpPlan.dontBuild} color="coral" showX />

          {/* Build Plans */}
          <div className="card-brutal-static p-5">
            <h3 className="font-extrabold text-foreground flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-plum/8 border border-plum/15 flex items-center justify-center">
                <Clock className="h-4 w-4 text-plum" />
              </div>
              Build Plans
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-cyan/8 text-cyan text-[10px] font-bold flex items-center justify-center border border-cyan/15">3D</span>
                  3-Day Sprint
                </h4>
                <ul className="space-y-2.5">
                  {mvpPlan.threeDayPlan.map((step, i) => (
                    <li key={i} className="text-sm text-foreground/60 flex items-start gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded bg-cyan/8 text-cyan text-[10px] font-bold flex items-center justify-center border border-cyan/15 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step.replace(/^\d+\s*:\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-plum/8 text-plum text-[10px] font-bold flex items-center justify-center border border-plum/15">1W</span>
                  1-Week Plan
                </h4>
                <ul className="space-y-2.5">
                  {mvpPlan.oneWeekPlan.map((step, i) => (
                    <li key={i} className="text-sm text-foreground/60 flex items-start gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded bg-plum/8 text-plum text-[10px] font-bold flex items-center justify-center border border-plum/15 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step.replace(/^\d+\s*-\s*\d*\s*:\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Risk Notes */}
          <PlanCard title="Risk Notes" icon={AlertTriangle} items={mvpPlan.riskNotes} color="coral" showX />

          {/* Demo Focus */}
          <div className="bg-cyan/4 rounded-xl border-2 border-cyan/15 p-4">
            <p className="text-[11px] font-bold text-cyan uppercase tracking-wider mb-1">Demo Focus</p>
            <p className="text-sm text-foreground/70 leading-relaxed">{mvpPlan.demoFocus}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function PlanCard({
  title,
  icon: Icon,
  items,
  color,
  showX,
}: {
  title: string;
  icon: React.ElementType;
  items: string[];
  color: string;
  showX?: boolean;
}) {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    cyan: { bg: "bg-cyan/8", border: "border-cyan/15", text: "text-cyan" },
    lime: { bg: "bg-lime/8", border: "border-lime/15", text: "text-lime" },
    coral: { bg: "bg-coral/8", border: "border-coral/15", text: "text-coral" },
    plum: { bg: "bg-plum/8", border: "border-plum/15", text: "text-plum" },
  };
  const c = colorMap[color] || colorMap.cyan;
  return (
    <div className="card-brutal-static p-5">
      <h3 className="font-extrabold text-foreground flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center`}>
          <Icon className={`h-4 w-4 ${c.text}`} />
        </div>
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-foreground/60 flex items-start gap-2.5">
            {showX ? (
              <span className={`shrink-0 w-4 h-4 rounded ${c.bg} border ${c.border} flex items-center justify-center mt-0.5`}>
                <span className={`${c.text} text-[9px] font-bold`}>X</span>
              </span>
            ) : (
              <span className={`shrink-0 w-4 h-4 rounded ${c.bg} border ${c.border} flex items-center justify-center mt-0.5`}>
                <Check className={`h-2.5 w-2.5 ${c.text}`} />
              </span>
            )}
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
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

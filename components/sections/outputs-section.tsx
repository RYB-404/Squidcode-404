"use client";

import { useState, useCallback } from "react";
import { Waves, Copy, Download, Check, FileCode, FolderTree, Wand2, Megaphone, Video, ClipboardCheck, Map, ChevronRight } from "lucide-react";
import { BuilderProfile, Opportunity, IdeaBranch, MVPPlan, TentacleOutputs, SquidProject } from "@/lib/types";
import { generateTentacleOutputs, exportProjectAsMarkdown } from "@/lib/mock-ai";
import { saveProject } from "@/lib/storage";

type OutputTab = "buildPlan" | "appStructure" | "codingPrompt" | "pitch" | "demoScript" | "checklist" | "roadmap";

const TABS: { key: OutputTab; label: string; icon: React.ElementType; description: string }[] = [
  { key: "buildPlan", label: "Build Plan", icon: FileCode, description: "Step-by-step build order and priorities" },
  { key: "appStructure", label: "App Structure", icon: FolderTree, description: "Pages, components, and data model" },
  { key: "codingPrompt", label: "AI Coding Prompt", icon: Wand2, description: "Copy-ready prompt for Cursor, v0, Bolt, etc." },
  { key: "pitch", label: "Pitch", icon: Megaphone, description: "Project pitch for judges and stakeholders" },
  { key: "demoScript", label: "Demo Script", icon: Video, description: "Timed 60-second demo walkthrough" },
  { key: "checklist", label: "Submission Checklist", icon: ClipboardCheck, description: "Everything you need before submitting" },
  { key: "roadmap", label: "Future Roadmap", icon: Map, description: "Post-MVP improvements and next steps" },
];

interface OutputsSectionProps {
  profile: BuilderProfile | null;
  opportunity: Opportunity | null;
  selectedIdea: IdeaBranch | null;
  mvpPlan: MVPPlan | null;
  outputs: TentacleOutputs | null;
  onOutputsGenerated: (outputs: TentacleOutputs) => void;
  onProjectSaved: (project: SquidProject) => void;
}

export function OutputsSection({
  profile,
  opportunity,
  selectedIdea,
  mvpPlan,
  outputs,
  onOutputsGenerated,
  onProjectSaved,
}: OutputsSectionProps) {
  const [activeTab, setActiveTab] = useState<OutputTab>("buildPlan");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleGenerate = () => {
    if (!profile || !opportunity || !selectedIdea || !mvpPlan) return;
    setLoading(true);
    setTimeout(() => {
      const result = generateTentacleOutputs(profile, opportunity, selectedIdea, mvpPlan);
      onOutputsGenerated(result);
      setLoading(false);
    }, 1800);
  };

  const handleCopy = useCallback(async (text: string, tabKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(tabKey);
      setTimeout(() => setCopied(null), 2500);
    } catch {
      // fallback
    }
  }, []);

  const handleExportMarkdown = useCallback(() => {
    if (!profile || !opportunity || !selectedIdea || !mvpPlan || !outputs) return;
    const project: SquidProject = {
      id: crypto.randomUUID(),
      profile,
      opportunity,
      analysis: { theme: "", fitScore: 0, difficulty: "medium", deadlinePressure: "", bestProjectType: "", demoPotential: "", recommendedStrategy: "" },
      selectedIdea,
      mvpPlan,
      outputs,
      createdAt: new Date().toISOString(),
    };
    const md = exportProjectAsMarkdown(project);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedIdea.name.replace(/\s+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [profile, opportunity, selectedIdea, mvpPlan, outputs]);

  const handleSave = useCallback(() => {
    if (!profile || !opportunity || !selectedIdea || !mvpPlan || !outputs) return;
    const project: SquidProject = {
      id: crypto.randomUUID(),
      profile,
      opportunity,
      analysis: { theme: "", fitScore: 0, difficulty: "medium", deadlinePressure: "", bestProjectType: "", demoPotential: "", recommendedStrategy: "" },
      selectedIdea,
      mvpPlan,
      outputs,
      createdAt: new Date().toISOString(),
    };
    saveProject(project);
    onProjectSaved(project);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [profile, opportunity, selectedIdea, mvpPlan, outputs, onProjectSaved]);

  if (!selectedIdea || !mvpPlan) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <EmptyState icon={Waves} title="No plan generated yet" description="Complete the MVP plan first to generate tentacle outputs." />
      </section>
    );
  }

  const activeTabInfo = TABS.find((t) => t.key === activeTab)!;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="section-header">
        <div className="section-icon bg-plum/8 text-plum border-plum/20">
          <Waves className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Tentacle Outputs</h2>
          <p className="text-sm text-foreground/50 mt-0.5">Everything you need to build, pitch, and submit.</p>
        </div>
      </div>

      {!outputs ? (
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-bold text-base border-2.5 transition-all flex items-center justify-center gap-2 ${
            !loading
              ? "btn-brutal bg-plum text-plum-foreground border-plum shadow-plum/20"
              : "bg-foreground/5 text-foreground/25 border-foreground/8 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-pulse-soft">Generating tentacle outputs</span>
              <span className="inline-flex gap-0.5">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
              </span>
            </span>
          ) : (
            <>Generate Tentacle Outputs <ChevronRight className="h-4 w-4" /></>
          )}
        </button>
      ) : (
        <div className="animate-slide-up space-y-5">
          {/* Tab selector — desktop sidebar style */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
            {/* Tab list — vertical on desktop, horizontal scroll on mobile */}
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible scrollbar-none pb-2 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
              {TABS.map(({ key, label, icon: Icon }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border-2 lg:w-full text-left ${
                      isActive
                        ? "bg-foreground text-background border-foreground shadow-[2px_2px_0_0_hsl(var(--foreground)/0.15)]"
                        : "bg-background text-foreground/55 border-foreground/6 hover:border-foreground/15 hover:text-foreground/80"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Output card */}
            <div className="card-brutal-static p-0 overflow-hidden">
              {/* Output header */}
              <div className="flex items-center justify-between px-5 py-4 border-b-2 border-foreground/6 bg-foreground/[0.02]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-plum/8 border border-plum/15 flex items-center justify-center shrink-0">
                    <activeTabInfo.icon className="h-4 w-4 text-plum" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-foreground">{activeTabInfo.label}</h3>
                    <p className="text-xs text-foreground/40 truncate">{activeTabInfo.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(outputs[activeTab], activeTab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all shrink-0 ${
                    copied === activeTab
                      ? "bg-lime/10 text-lime border-lime/25"
                      : "bg-foreground/3 text-foreground/50 border-foreground/8 hover:border-foreground/20 hover:text-foreground/70"
                  }`}
                >
                  {copied === activeTab ? (
                    <><Check className="h-3.5 w-3.5" /> Copied!</>
                  ) : (
                    <><Copy className="h-3.5 w-3.5" /> Copy</>
                  )}
                </button>
              </div>

              {/* Output content */}
              <div className="p-5">
                <div className="md-output">
                  <pre className="whitespace-pre-wrap font-mono text-[13px] leading-[1.75] text-foreground/80 bg-foreground/[0.015] rounded-lg p-4 overflow-x-auto border border-foreground/5">
                    {outputs[activeTab]}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Quick tab navigation dots for mobile */}
          <div className="flex items-center justify-center gap-1.5 lg:hidden">
            {TABS.map(({ key }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeTab === key ? "bg-foreground w-6" : "bg-foreground/15"
                }`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExportMarkdown}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border-2.5 btn-brutal bg-foreground text-background border-foreground shadow-foreground/15"
            >
              <Download className="h-4 w-4" /> Export Markdown
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border-2.5 transition-all ${
                saved
                  ? "bg-lime text-lime-foreground border-lime"
                  : "btn-brutal bg-cyan text-cyan-foreground border-cyan shadow-cyan/15"
              }`}
            >
              {saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Waves className="h-4 w-4" /> Save Project</>}
            </button>
          </div>
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

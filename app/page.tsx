"use client";

import { useState, useCallback } from "react";
import { SquidNav, Step } from "@/components/squid-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { ProfileSection } from "@/components/sections/profile-section";
import { OpportunitySection } from "@/components/sections/opportunity-section";
import { IdeasSection } from "@/components/sections/ideas-section";
import { PlannerSection } from "@/components/sections/planner-section";
import { OutputsSection } from "@/components/sections/outputs-section";
import { SavedSection } from "@/components/sections/saved-section";
import {
  BuilderProfile,
  Opportunity,
  AnalysisResult,
  IdeaBranch,
  MVPPlan,
  TentacleOutputs,
  SquidProject,
} from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";
import { Waves } from "lucide-react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("home");

  // App state
  const [profile, setProfile] = useState<BuilderProfile | null>(null);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<IdeaBranch | null>(null);
  const [mvpPlan, setMvpPlan] = useState<MVPPlan | null>(null);
  const [outputs, setOutputs] = useState<TentacleOutputs | null>(null);
  const [savedRefreshKey, setSavedRefreshKey] = useState(0);

  // Track completed steps
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set());

  const markCompleted = useCallback((step: Step) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(step);
      return next;
    });
  }, []);

  const handleProfileSaved = useCallback(
    (p: BuilderProfile) => {
      setProfile(p);
      markCompleted("profile");
    },
    [markCompleted]
  );

  const handleAnalyze = useCallback(
    (opp: Opportunity, result: AnalysisResult) => {
      setOpportunity(opp);
      setAnalysis(result);
      markCompleted("opportunity");
    },
    [markCompleted]
  );

  const handleIdeaSelected = useCallback(
    (idea: IdeaBranch) => {
      setSelectedIdea(idea);
      setMvpPlan(null);
      setOutputs(null);
      markCompleted("ideas");
    },
    [markCompleted]
  );

  const handlePlanGenerated = useCallback(
    (plan: MVPPlan) => {
      setMvpPlan(plan);
      markCompleted("planner");
    },
    [markCompleted]
  );

  const handleOutputsGenerated = useCallback(
    (o: TentacleOutputs) => {
      setOutputs(o);
      markCompleted("outputs");
    },
    [markCompleted]
  );

  const handleProjectSaved = useCallback(
    (_project: SquidProject) => {
      setSavedRefreshKey((k) => k + 1);
      markCompleted("saved");
    },
    [markCompleted]
  );

  const handleOpenProject = useCallback(
    (project: SquidProject) => {
      setProfile(project.profile);
      setOpportunity(project.opportunity);
      setAnalysis(project.analysis);
      setSelectedIdea(project.selectedIdea);
      setMvpPlan(project.mvpPlan);
      setOutputs(project.outputs);
      setCompletedSteps(new Set<Step>(["profile", "opportunity", "ideas", "planner", "outputs", "saved"]));
      setCurrentStep("outputs");
    },
    []
  );

  const handleStartBuilding = useCallback(() => {
    setCurrentStep("profile");
  }, []);

  const handleTryDemo = useCallback(() => {
    setCurrentStep("opportunity");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <SquidNav
        currentStep={currentStep}
        onNavigate={setCurrentStep}
        completedSteps={completedSteps}
      />

      <main className="relative">
        {/* Subtle top accent line */}
        {currentStep !== "home" && (
          <div className="h-1 bg-gradient-to-r from-cyan via-plum to-coral" />
        )}

        {currentStep === "home" && (
          <HeroSection onStartBuilding={handleStartBuilding} onTryDemo={handleTryDemo} />
        )}
        {currentStep === "profile" && (
          <ProfileSection profile={profile} onProfileSaved={handleProfileSaved} />
        )}
        {currentStep === "opportunity" && (
          <OpportunitySection
            profile={profile}
            opportunity={opportunity}
            analysis={analysis}
            onAnalyze={handleAnalyze}
          />
        )}
        {currentStep === "ideas" && (
          <IdeasSection
            profile={profile}
            opportunity={opportunity}
            analysis={analysis}
            selectedIdea={selectedIdea}
            onIdeaSelected={handleIdeaSelected}
          />
        )}
        {currentStep === "planner" && (
          <PlannerSection
            profile={profile}
            opportunity={opportunity}
            selectedIdea={selectedIdea}
            mvpPlan={mvpPlan}
            onPlanGenerated={handlePlanGenerated}
          />
        )}
        {currentStep === "outputs" && (
          <OutputsSection
            profile={profile}
            opportunity={opportunity}
            selectedIdea={selectedIdea}
            mvpPlan={mvpPlan}
            outputs={outputs}
            onOutputsGenerated={handleOutputsGenerated}
            onProjectSaved={handleProjectSaved}
          />
        )}
        {currentStep === "saved" && (
          <SavedSection onOpenProject={handleOpenProject} refreshKey={savedRefreshKey} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050814]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-cyan/8 p-1.5 rounded-lg border border-cyan/15">
                <Waves className="h-4 w-4 text-cyan" />
              </div>
              <span className="font-extrabold text-sm text-foreground tracking-tight">
                Squid<span className="text-cyan">Code</span>
              </span>
            </div>
            <p className="text-xs text-white/45 text-center sm:text-right leading-relaxed">
              Turn one idea into every branch you need to build and submit.<br />
              <span className="text-white/32">MVP with mock AI. No real API integration yet.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

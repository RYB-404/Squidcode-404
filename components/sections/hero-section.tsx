"use client";

import { ArrowRight, CheckCircle2, Code2, FileText, Layers3, Play, Rocket, Sparkles, Target, Wand2 } from "lucide-react";

interface HeroSectionProps {
  onStartBuilding: () => void;
  onTryDemo: () => void;
}

const steps = [
  { title: "Profile", text: "Tell SquidCode your skill, goals, tools, and time." },
  { title: "Analyze", text: "Paste a hackathon, grant, or bounty opportunity." },
  { title: "Branch", text: "Get ranked project directions built around your profile." },
  { title: "Build", text: "Generate MVP plan, app structure, and AI coding prompt." },
  { title: "Submit", text: "Export pitch, demo script, checklist, and roadmap." },
];

const outputs = ["Build Plan", "App Structure", "AI Coding Prompt", "Pitch", "Demo Script", "Checklist", "Roadmap"];

export function HeroSection({ onStartBuilding, onTryDemo }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_68%_35%,rgba(60,255,208,0.16),transparent_26%),linear-gradient(90deg,rgba(5,8,20,0.99)_0%,rgba(5,8,20,0.93)_46%,rgba(5,8,20,0.74)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="mx-auto grid min-h-[calc(100vh-70px)] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3cffd0]/30 bg-[#3cffd0]/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#3cffd0]">
              <Sparkles className="h-4 w-4" /> AI-native hackathon companion
            </div>

            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5.8rem]">
              Turn one opportunity into a build-ready project.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              SquidCode helps non-coders turn hackathons, grants, and bounties into project ideas, MVP plans, AI coding prompts, pitches, demos, and submission checklists.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onStartBuilding}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#3cffd0] px-7 py-4 font-mono text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
              >
                Start Building <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={onTryDemo}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 font-mono text-sm font-black uppercase tracking-[0.16em] text-white transition hover:border-[#3cffd0] hover:text-[#3cffd0]"
              >
                <Play className="h-4 w-4" /> View Demo
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {["No-code friendly", "AI coding ready", "Hackathon speed", "Export-ready"].map((badge) => (
                <span key={badge} className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm font-semibold text-white/78 backdrop-blur">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/14 bg-[#0b1020]/75 p-4 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#080b16] p-5">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#3cffd0]">Live build board</p>
                    <h3 className="mt-1 text-2xl font-black text-white">0G Vibe Coding Tournament</h3>
                  </div>
                  <div className="rounded-2xl bg-[#3cffd0] px-4 py-3 text-center text-black">
                    <p className="font-mono text-[10px] font-black uppercase tracking-widest">Fit</p>
                    <p className="text-3xl font-black leading-none">94</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <PreviewCard icon={Target} title="Best angle" text="Assistant for non-coder hackathon builders" />
                  <PreviewCard icon={Layers3} title="Project branch" text="SquidCode build-and-submit system" />
                  <PreviewCard icon={Code2} title="Build method" text="Use AI coding tools, no manual coding required" />
                  <PreviewCard icon={Rocket} title="Demo strength" text="Clear before/after transformation" />
                </div>

                <div className="mt-5 rounded-3xl border border-[#3cffd0]/20 bg-[#3cffd0]/8 p-4">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#3cffd0]">Generated outputs</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {outputs.map((output) => (
                      <span key={output} className="rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/75">
                        {output}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#3cffd0]">How it works</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">From post to project plan in five steps.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/55">Designed for speed: paste opportunity, pick strongest branch, then copy the exact outputs needed to build and submit.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
              <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#3cffd0]">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-black text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b1020] p-7">
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#3cffd0]">Example opportunity</p>
            <h2 className="mt-4 text-3xl font-black text-white">0G Labs — Vibe Coding Tournament</h2>
            <p className="mt-4 leading-7 text-white/60">No coding skills required. Build an AI-native app, agent, companion, or game. Submit by June 23.</p>
            <div className="mt-6 space-y-3">
              {["Fit score: 94/100", "Difficulty: low-medium", "Recommended project: SquidCode", "Strategy: make hackathons accessible"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/75">
                  <CheckCircle2 className="h-5 w-5 text-[#3cffd0]" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7">
            <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#3cffd0]">Output stack</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                [Wand2, "AI Coding Prompt", "Copy-ready prompt for AI coding tools."],
                [FileText, "Pitch & Demo", "60-second pitch plus click-by-click demo script."],
                [Layers3, "MVP Planner", "Features, screens, user flow, and build roadmap."],
                [Rocket, "Submit Kit", "Checklist, README notes, and final roadmap."],
              ].map(([Icon, title, text]) => (
                <PreviewCard key={title as string} icon={Icon as typeof Wand2} title={title as string} text={text as string} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PreviewCard({ icon: Icon, title, text }: { icon: typeof Target; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-[#3cffd0]/12 text-[#3cffd0]">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="font-bold text-white">{title}</h4>
      <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
    </div>
  );
}

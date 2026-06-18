"use client";

import { useState, useEffect } from "react";
import { User, ChevronRight } from "lucide-react";
import { BuilderProfile, SkillLevel, AvailableTime, INTEREST_OPTIONS, GOAL_OPTIONS, TOOL_OPTIONS, SKILL_LABELS, TIME_LABELS, DEFAULT_PROFILE } from "@/lib/types";
import { loadProfile, saveProfile } from "@/lib/storage";

interface ProfileSectionProps {
  profile: BuilderProfile | null;
  onProfileSaved: (profile: BuilderProfile) => void;
}

export function ProfileSection({ profile, onProfileSaved }: ProfileSectionProps) {
  const [form, setForm] = useState<BuilderProfile>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm(profile);
    } else {
      const stored = loadProfile();
      if (stored) {
        setForm(stored);
        onProfileSaved(stored);
      }
    }
  }, [profile, onProfileSaved]);

  const toggleArrayItem = (arr: string[], item: string): string[] =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const handleSave = () => {
    saveProfile(form);
    onProfileSaved(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const isComplete = form.skillLevel && form.interests.length > 0 && form.goals.length > 0;

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="section-header">
        <div className="section-icon bg-cyan/8 text-cyan border-cyan/20">
          <User className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Builder Profile</h2>
          <p className="text-sm text-foreground/50 mt-0.5">Tell us about yourself so we can tailor recommendations.</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Skill Level */}
        <div className="card-brutal-static p-5">
          <label className="block text-sm font-bold text-foreground mb-3">Skill Level</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["no-code", "beginner", "intermediate", "developer"] as SkillLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setForm({ ...form, skillLevel: level })}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                  form.skillLevel === level
                    ? "bg-cyan text-cyan-foreground border-cyan shadow-[2px_2px_0_0_hsl(var(--cyan)/0.25)]"
                    : "bg-background text-foreground/60 border-foreground/8 hover:border-cyan/30 hover:text-cyan"
                }`}
              >
                {SKILL_LABELS[level]}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="card-brutal-static p-5">
          <label className="block text-sm font-bold text-foreground mb-3">Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => (
              <button
                key={interest}
                onClick={() => setForm({ ...form, interests: toggleArrayItem(form.interests, interest) })}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                  form.interests.includes(interest)
                    ? "bg-coral text-coral-foreground border-coral shadow-[2px_2px_0_0_hsl(var(--coral)/0.25)]"
                    : "bg-background text-foreground/60 border-foreground/8 hover:border-coral/30 hover:text-coral"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Available Time */}
        <div className="card-brutal-static p-5">
          <label className="block text-sm font-bold text-foreground mb-3">Available Time</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["1 day", "3 days", "1 week", "1 month"] as AvailableTime[]).map((time) => (
              <button
                key={time}
                onClick={() => setForm({ ...form, availableTime: time })}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                  form.availableTime === time
                    ? "bg-lime text-lime-foreground border-lime shadow-[2px_2px_0_0_hsl(var(--lime)/0.25)]"
                    : "bg-background text-foreground/60 border-foreground/8 hover:border-lime/30 hover:text-lime"
                }`}
              >
                {TIME_LABELS[time]}
              </button>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="card-brutal-static p-5">
          <label className="block text-sm font-bold text-foreground mb-3">Goals</label>
          <div className="flex flex-wrap gap-2">
            {GOAL_OPTIONS.map((goal) => (
              <button
                key={goal}
                onClick={() => setForm({ ...form, goals: toggleArrayItem(form.goals, goal) })}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                  form.goals.includes(goal)
                    ? "bg-plum text-plum-foreground border-plum shadow-[2px_2px_0_0_hsl(var(--plum)/0.25)]"
                    : "bg-background text-foreground/60 border-foreground/8 hover:border-plum/30 hover:text-plum"
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="card-brutal-static p-5">
          <label className="block text-sm font-bold text-foreground mb-3">Tools You Use</label>
          <div className="flex flex-wrap gap-2">
            {TOOL_OPTIONS.map((tool) => (
              <button
                key={tool}
                onClick={() => setForm({ ...form, tools: toggleArrayItem(form.tools, tool) })}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                  form.tools.includes(tool)
                    ? "bg-foreground text-background border-foreground shadow-[2px_2px_0_0_hsl(var(--foreground)/0.25)]"
                    : "bg-background text-foreground/60 border-foreground/8 hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Style */}
        <div className="card-brutal-static p-5">
          <label className="block text-sm font-bold text-foreground mb-2">Preferred Style <span className="font-normal text-foreground/40">(optional)</span></label>
          <input
            type="text"
            value={form.preferredStyle}
            onChange={(e) => setForm({ ...form, preferredStyle: e.target.value })}
            placeholder="e.g., Minimal, Colorful, Dark mode, Playful..."
            className="w-full px-4 py-2.5 rounded-lg border-2 border-foreground/8 bg-background text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/15 transition-all text-sm"
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={!isComplete}
          className={`w-full py-3.5 rounded-xl font-bold text-base border-2.5 transition-all flex items-center justify-center gap-2 ${
            isComplete
              ? saved
                ? "bg-lime text-lime-foreground border-lime"
                : "btn-brutal bg-foreground text-background border-foreground shadow-foreground/15"
              : "bg-foreground/5 text-foreground/25 border-foreground/8 cursor-not-allowed"
          }`}
        >
          {saved ? (
            <>Profile Saved!</>
          ) : (
            <>Save Profile <ChevronRight className="h-4 w-4" /></>
          )}
        </button>
      </div>
    </section>
  );
}

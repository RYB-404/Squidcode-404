import {
  BuilderProfile,
  Opportunity,
  AnalysisResult,
  IdeaBranch,
  MVPPlan,
  TentacleOutputs,
  SquidProject,
} from "./types";

export function analyzeOpportunity(
  profile: BuilderProfile,
  opportunity: Opportunity
): AnalysisResult {
  const text = opportunity.description.toLowerCase();
  const hasAI = text.includes("ai") || text.includes("agent") || text.includes("ml");
  const hasGame = text.includes("game") || text.includes("play");
  const hasDefi = text.includes("defi") || text.includes("crypto") || text.includes("web3");
  const hasPrize = text.includes("prize") || text.includes("$") || text.includes("reward");
  const noCode = text.includes("no code") || text.includes("no-code") || text.includes("no coding");

  let theme = "General tech project";
  if (hasAI) theme = "AI-native application";
  if (hasGame) theme = "Interactive game experience";
  if (hasDefi) theme = "DeFi / Web3 tool";

  const profileBoost = profile.skillLevel === "developer" ? 15 : profile.skillLevel === "intermediate" ? 5 : 0;
  const noCodeBoost = noCode && (profile.skillLevel === "no-code" || profile.skillLevel === "beginner") ? 20 : 0;
  const fitScore = Math.min(95, Math.max(40, 60 + profileBoost + noCodeBoost + (hasPrize ? 10 : 0)));

  let difficulty: "low" | "medium" | "high" = "medium";
  if (profile.skillLevel === "developer") difficulty = "low";
  if (profile.skillLevel === "no-code" && !noCode) difficulty = "high";
  if (profile.availableTime === "1 day") difficulty = "high";
  if (profile.availableTime === "1 month") difficulty = "low";

  const deadlinePressure = profile.availableTime === "1 day" ? "Critical" : profile.availableTime === "3 days" ? "High" : profile.availableTime === "1 week" ? "Moderate" : "Low";

  let bestProjectType = "Web app with AI features";
  if (hasAI && noCode) bestProjectType = "AI-powered tool using no-code platforms";
  if (hasGame) bestProjectType = "Browser-based game with AI elements";
  if (hasDefi) bestProjectType = "DeFi dashboard or analytics tool";

  const demoPotential = fitScore > 75 ? "Strong visual demo with clear wow factor" : fitScore > 55 ? "Good demo potential with focused scope" : "Needs creative framing for demo impact";

  const strategies = [
    "Focus on a single killer feature that demos well. Skip nice-to-haves entirely.",
    "Build the demo first, then fill in supporting features around it.",
    "Leverage AI coding tools to move fast. Use pre-built components where possible.",
    "Start with a landing page and core flow. Polish the moments judges will see.",
  ];

  return {
    theme,
    fitScore,
    difficulty,
    deadlinePressure,
    bestProjectType,
    demoPotential,
    recommendedStrategy: strategies[Math.floor(fitScore / 30) % strategies.length],
  };
}

export function generateIdeaBranches(
  profile: BuilderProfile,
  opportunity: Opportunity,
  analysis: AnalysisResult
): IdeaBranch[] {
  const ideas: IdeaBranch[] = [
    {
      name: "AI Hackathon Co-Pilot",
      description: "An AI assistant that helps hackathon participants plan, build, and submit projects by breaking down requirements into actionable steps.",
      targetUser: "First-time hackathon participants who feel overwhelmed",
      problem: "Most newcomers don't know where to start, what to build, or how to structure their submission.",
      solution: "Paste the hackathon details and get a step-by-step build plan with AI-generated prompts, checklists, and pitch templates.",
      difficulty: "medium",
      demoStrength: 9,
      whyItCanWin: "Meta tool that helps others win hackathons — judges love recursive creativity and tools that help the community.",
    },
    {
      name: "Bounty Submission Builder",
      description: "A tool that structures bounty and grant submissions with auto-generated sections, formatting, and completeness checks.",
      targetUser: "Bounty hunters and grant applicants who struggle with submission quality",
      problem: "Many builders have good ideas but submit poorly formatted, incomplete applications.",
      solution: "Input your project idea and the bounty requirements — get a complete, well-structured submission package ready to submit.",
      difficulty: "low",
      demoStrength: 7,
      whyItCanWin: "Solves a real pain point with clear before/after demonstration. Judges can instantly see the value.",
    },
    {
      name: "No-Code Agent Planner",
      description: "A planning tool that helps non-coders design and specify AI agents without writing code, generating prompts they can use with any AI tool.",
      targetUser: "Non-coders and beginners who want to build AI agents but don't know how",
      problem: "Agent development feels inaccessible to non-developers, even with AI coding tools available.",
      solution: "Visual agent builder that outputs copy-ready prompts for tools like Cursor, v0, or ChatGPT — no coding required to plan.",
      difficulty: "low",
      demoStrength: 8,
      whyItCanWin: "Directly addresses the no-code requirement. Low technical risk with high perceived value.",
    },
    {
      name: "Demo Script Generator",
      description: "A tool that generates compelling demo scripts and walkthroughs for hackathon presentations, including timing, talking points, and visual cues.",
      targetUser: "Builders who finish projects but struggle with presentation and storytelling",
      problem: "Great projects lose because of poor demos. Most builders spend zero time preparing their presentation.",
      solution: "Input your project details and get a timed demo script with key moments, backup plans, and judge-focused talking points.",
      difficulty: "low",
      demoStrength: 10,
      whyItCanWin: "The demo about demos is inherently self-demonstrating. You present the tool BY using the tool.",
    },
    {
      name: "Grant Idea Brancher",
      description: "A brainstorming tool that takes a grant or RFP description and generates multiple divergent project ideas, each with feasibility scores and alignment ratings.",
      targetUser: "Grant applicants who want to find the strongest project idea for a specific opportunity",
      problem: "Applicants often submit the first idea they think of instead of exploring the full solution space.",
      solution: "Paste the grant description, get 5+ divergent ideas scored against the grant criteria, then dive deep into the best one.",
      difficulty: "medium",
      demoStrength: 7,
      whyItCanWin: "Shows depth of thinking about the problem space. Demonstrates both divergent and convergent ideation.",
    },
  ];

  const skillIndex = ["no-code", "beginner", "intermediate", "developer"].indexOf(profile.skillLevel);
  ideas.forEach((idea) => {
    const diffIndex = ["low", "medium", "high"].indexOf(idea.difficulty);
    if (diffIndex > skillIndex + 1) {
      idea.demoStrength = Math.max(4, idea.demoStrength - 2);
    }
  });

  if (analysis.fitScore < 60) {
    return ideas.slice(0, 3);
  }
  return ideas;
}

export function generateMVPPlan(
  profile: BuilderProfile,
  opportunity: Opportunity,
  idea: IdeaBranch
): MVPPlan {
  const isLowTime = profile.availableTime === "1 day" || profile.availableTime === "3 days";
  const isNoCode = profile.skillLevel === "no-code" || profile.skillLevel === "beginner";

  const summary = `Build "${idea.name}" — a ${idea.difficulty === "low" ? "lightweight" : "focused"} ${isNoCode ? "no-code" : "web-based"} tool that ${idea.solution.toLowerCase().replace("input your", "lets users input").replace("get a", "and get a")}. Target: ${idea.targetUser.toLowerCase()}.`;

  const coreFeatures = [
    "Input form for opportunity/project details",
    "AI-generated output display with formatted sections",
    "Copy-to-clipboard for each output section",
    "Export as Markdown",
    isLowTime ? null : "Save and reload previous projects",
    isNoCode ? "Pre-built templates for common hackathon types" : null,
  ].filter(Boolean) as string[];

  const buildFirst = [
    "Core input form and data flow",
    "Primary output generation (the one thing that must work)",
    "Copy and export functionality",
  ];

  const dontBuild = [
    "User accounts or authentication",
    "Database or persistent storage (beyond localStorage)",
    "Real AI integration (use mock generation for MVP)",
    "Responsive mobile optimization beyond basic usability",
    "Settings or configuration panels",
    "Notifications or email features",
  ];

  const threeDayPlan = [
    "Day 1: Set up project scaffold, build input form, define data model and mock generation logic",
    "Day 2: Build primary output display, implement copy/export, add core UI flow end-to-end",
    "Day 3: Polish UI, add demo script, test the full flow, prepare submission materials",
  ];

  const oneWeekPlan = [
    "Day 1-2: Project setup, input forms, data models, mock AI generation logic",
    "Day 3-4: Build all output tabs, implement copy/export, localStorage save/load",
    "Day 5: Polish UI, add loading states and empty states, responsive tweaks",
    "Day 6: Write pitch, record demo video, prepare submission materials",
    "Day 7: Buffer day — fix bugs, refine demo flow, submit early",
  ];

  const riskNotes = [
    "Scope creep: resist adding features beyond the core demo flow",
    "Time management: prioritize a working demo over a polished UI",
    "Demo reliability: test the exact demo flow at least 3 times before presenting",
    isNoCode ? "Platform limits: no-code tools may not support all desired features" : null,
    isLowTime ? "Extreme time pressure: cut anything that doesn't directly support the demo" : null,
  ].filter(Boolean) as string[];

  const demoFocus = `Show the ${idea.name} solving a real problem in under 60 seconds. Start with the pain point ("${idea.problem.toLowerCase()}"), demonstrate the solution in one click, end with the result. Do not explain architecture or tech choices — show the outcome.`;

  return {
    summary,
    coreFeatures,
    buildFirst,
    dontBuild,
    threeDayPlan,
    oneWeekPlan,
    riskNotes,
    demoFocus,
  };
}

export function generateTentacleOutputs(
  profile: BuilderProfile,
  opportunity: Opportunity,
  idea: IdeaBranch,
  plan: MVPPlan
): TentacleOutputs {
  const tools = profile.tools.length > 0 ? profile.tools.join(", ") : "AI coding tools";
  const isNoCode = profile.skillLevel === "no-code" || profile.skillLevel === "beginner";

  const buildPlan = `# Build Plan: ${idea.name}

## Overview
${plan.summary}

## Build Order
${plan.buildFirst.map((item, i) => `${i + 1}. ${item}`).join("\n")}

## Core Features
${plan.coreFeatures.map((f) => `- ${f}`).join("\n")}

## What NOT to Build
${plan.dontBuild.map((f) => `- ${f}`).join("\n")}

## 3-Day Plan
${plan.threeDayPlan.join("\n")}

## 1-Week Plan
${plan.oneWeekPlan.join("\n")}

## Risk Notes
${plan.riskNotes.map((r) => `- ${r}`).join("\n")}

## Demo Focus
${plan.demoFocus}`;

  const appStructure = `# App Structure: ${idea.name}

## Pages
- \`/\` — Landing page with hero, CTA, and feature overview
- \`/app\` — Main application dashboard
- \`/app/input\` — Input form for opportunity/project details
- \`/app/output\` — Generated results display with tabs
- \`/app/saved\` — Saved projects list

## Key Components
- \`OpportunityForm\` — Text input for hackathon/grant details
- \`IdeaBranches\` — Display generated idea cards
- \`OutputTabs\` — Tabbed output display (Build Plan, Prompt, Pitch, Demo, Checklist)
- \`CopyButton\` — Clipboard copy for each output
- \`ExportButton\` — Markdown export
- \`SaveButton\` — Save to localStorage
- \`ProjectCard\` — Saved project display card

## Data Flow
1. User inputs opportunity text
2. Mock AI generates analysis + idea branches
3. User selects an idea
4. Mock AI generates MVP plan + tentacle outputs
5. User copies/exports/saves results

## Data Model
- BuilderProfile: user skill level, interests, goals, tools
- Opportunity: title, description, deadline
- IdeaBranch: name, description, difficulty, demo score
- SquidProject: full project with all outputs

## Storage
- localStorage key: \`squidcode_projects\`
- Format: JSON array of SquidProject objects`;

  const codingPrompt = `# AI Coding Prompt for ${idea.name}

Copy this prompt into ${tools.split(",")[0]}, Cursor, ChatGPT, or any AI coding tool:

---

Build a web application called "${idea.name}".

**Purpose:** ${idea.description}

**Target User:** ${idea.targetUser}

**Core Problem:** ${idea.problem}

**Solution:** ${idea.solution}

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui components

**Key Features:**
${plan.coreFeatures.map((f) => `- ${f}`).join("\n")}

**Pages:**
- Landing page with hero section and CTA
- Main dashboard with input form
- Results display with tabbed output sections
- Saved projects view

**Data Storage:** localStorage only (no backend for MVP)

**Design:**
- Clean, modern SaaS look with soft neubrutalism style
- Warm off-white background, dark navy primary
- Accent colors: coral, cyan, lime
- Rounded cards with bold borders and subtle shadows
- Mobile responsive

**Important Constraints:**
- No authentication required
- No database — use localStorage
- Mock AI generation (no real API calls)
- Every output section must have a copy-to-clipboard button
- Include export as Markdown functionality
- Add loading states when generating content
- Add empty states when no data exists

**Do NOT build:**
${plan.dontBuild.map((f) => `- ${f}`).join("\n")}

---

${isNoCode ? "TIP: If using v0 or Lovable, paste the prompt in sections. Start with the landing page, then add the dashboard, then the output tabs." : ""}`;

  const pitch = `# ${idea.name}

## The Problem
${idea.problem}

## Our Solution
${idea.solution}

## Why Now
Hackathons, grants, and bounties are exploding — but most participants, especially newcomers, don't have a structured process for going from opportunity to submission. They waste time on the wrong things and submit incomplete work.

## How It Works
1. Paste the hackathon, grant, or bounty details
2. Get an instant fit analysis and idea recommendations
3. Select the best idea and get a full build plan
4. Generate AI coding prompts, pitch templates, demo scripts, and submission checklists
5. Copy everything you need and start building

## Market
${idea.targetUser}. The no-code and AI-assisted builder market is growing 40% year-over-year.

## Competitive Advantage
- Built specifically for the hackathon/bounty workflow
- Generates copy-ready prompts for popular AI coding tools
- Includes demo scripts and submission checklists — not just planning
- Works for all skill levels, from no-code to developer

## What's Next
Real AI integration for dynamic, context-aware generation. Team collaboration features. Template marketplace for popular hackathon formats.`;

  const demoScript = `# Demo Script: ${idea.name}
**Duration: 60 seconds**

## 0:00-0:10 — The Problem
"Every week, thousands of people join hackathons, apply for grants, and chase bounties. But most of them — especially newcomers — don't know where to start. They waste days on the wrong ideas and submit incomplete work."

## 0:10-0:25 — The Reveal
"Meet ${idea.name}. [CLICK] You paste the opportunity details — like this tournament from 0G Labs. [PASTE DEMO TEXT] Hit analyze."

## 0:25-0:40 — The Magic
"Instantly, you get a fit analysis, idea recommendations, and a complete build plan. [CLICK through idea cards] Pick the idea that resonates — [SELECT] — and get everything you need: coding prompts for Cursor or v0, a pitch template, a 60-second demo script, and a submission checklist."

## 0:40-0:55 — The Proof
"Every section is copy-ready. [CLICK copy button] Export the whole thing as Markdown. [CLICK export] Save it for later. [CLICK save] From opportunity to build-ready in under 5 minutes."

## 0:55-1:00 — The Close
"${idea.name}. Turn one idea into every branch you need to build and submit. Thank you."

---

**BACKUP PLAN:** If the live demo fails, show a pre-saved project and walk through the outputs manually. The outputs speak for themselves even without live generation.

**KEY MOMENT:** The copy button click — it's the moment judges realize everything is immediately usable, not just theoretical.`;

  const checklist = `# Submission Checklist for ${idea.name}

## Required Items
- [ ] Working demo URL (deployed to Vercel or similar)
- [ ] Source code repository (GitHub, public)
- [ ] Demo video (2-3 minutes, unlisted YouTube or Loom)
- [ ] Written description / README (500-1000 words)
- [ ] Team information (if applicable)

## Quality Checks
- [ ] Demo tested on a fresh device/browser
- [ ] All copy/export buttons work
- [ ] No console errors in production build
- [ ] Mobile layout is usable (doesn't need to be perfect)
- [ ] Loading states appear for all async operations
- [ ] Empty states show friendly messages

## Presentation
- [ ] Demo script rehearsed at least 3 times
- [ ] Backup plan ready if live demo fails (pre-saved project)
- [ ] Key features highlighted in under 60 seconds
- [ ] Problem → Solution → Result narrative clear
- [ ] Technical depth available if judges ask follow-ups

## Submission Polish
- [ ] README includes project description, features, and setup instructions
- [ ] Repository has clean commit history
- [ ] Deploy URL works without authentication
- [ ] Video demo shows the complete user flow
- [ ] Written description matches the judging criteria

## Bonus
- [ ] Screenshots in README
- [ ] Architecture diagram (simple)
- [ ] Future roadmap section
- [ ] Social media post about the project`;

  const roadmap = `# Future Roadmap: ${idea.name}

## Phase 1 — MVP (Current)
- Mock AI generation with deterministic outputs
- localStorage for project persistence
- Copy/export functionality
- Responsive dashboard UI

## Phase 2 — Real AI Integration
- OpenRouter / Claude API for dynamic generation
- Context-aware outputs that reference specific opportunity details
- Multi-model support (choose your AI engine)
- Streaming responses for real-time generation feel

## Phase 3 — Collaboration
- Team mode: shared project spaces
- Real-time collaborative editing
- Comment and feedback on generated outputs
- Shared template library

## Phase 4 — Intelligence
- Learn from past submissions and outcomes
- Scoring against real judging criteria from previous hackathons
- Personalized recommendations based on builder history
- Trending opportunities feed with auto-analysis

## Phase 5 — Platform
- Public template marketplace
- Community-submitted opportunity types
- Integration with hackathon platforms (Devpost, Dora, etc.)
- Analytics dashboard for submission success rates

## Technical Debt to Address
- Add proper error handling and validation
- Migrate localStorage to Supabase for persistence
- Add authentication with Supabase Auth
- Implement proper SEO and meta tags
- Add end-to-end tests for critical user flows`;

  return {
    buildPlan,
    appStructure,
    codingPrompt,
    pitch,
    demoScript,
    checklist,
    roadmap,
  };
}

export function exportProjectAsMarkdown(project: SquidProject): string {
  const sections = [
    `# ${project.selectedIdea.name}`,
    "",
    `*Generated by SquidCode on ${new Date(project.createdAt).toLocaleDateString()}*`,
    "",
    "---",
    "",
    "## Builder Profile",
    "",
    `- **Skill Level:** ${project.profile.skillLevel}`,
    `- **Interests:** ${project.profile.interests.join(", ") || "None selected"}`,
    `- **Available Time:** ${project.profile.availableTime}`,
    `- **Goals:** ${project.profile.goals.join(", ") || "None selected"}`,
    `- **Tools:** ${project.profile.tools.join(", ") || "None selected"}`,
    `- **Preferred Style:** ${project.profile.preferredStyle || "Not specified"}`,
    "",
    "---",
    "",
    "## Opportunity",
    "",
    `- **Title:** ${project.opportunity.title}`,
    `- **Description:** ${project.opportunity.description}`,
    project.opportunity.deadline ? `- **Deadline:** ${project.opportunity.deadline}` : "",
    "",
    "---",
    "",
    "## Analysis",
    "",
    `- **Theme:** ${project.analysis.theme}`,
    `- **Fit Score:** ${project.analysis.fitScore}/100`,
    `- **Difficulty:** ${project.analysis.difficulty}`,
    `- **Deadline Pressure:** ${project.analysis.deadlinePressure}`,
    `- **Best Project Type:** ${project.analysis.bestProjectType}`,
    `- **Demo Potential:** ${project.analysis.demoPotential}`,
    `- **Recommended Strategy:** ${project.analysis.recommendedStrategy}`,
    "",
    "---",
    "",
    "## Selected Idea",
    "",
    `- **Name:** ${project.selectedIdea.name}`,
    `- **Description:** ${project.selectedIdea.description}`,
    `- **Target User:** ${project.selectedIdea.targetUser}`,
    `- **Problem:** ${project.selectedIdea.problem}`,
    `- **Solution:** ${project.selectedIdea.solution}`,
    `- **Difficulty:** ${project.selectedIdea.difficulty}`,
    `- **Demo Strength:** ${project.selectedIdea.demoStrength}/10`,
    `- **Why It Can Win:** ${project.selectedIdea.whyItCanWin}`,
    "",
    "---",
    "",
    project.outputs.buildPlan,
    "",
    "---",
    "",
    project.outputs.appStructure,
    "",
    "---",
    "",
    project.outputs.codingPrompt,
    "",
    "---",
    "",
    project.outputs.pitch,
    "",
    "---",
    "",
    project.outputs.demoScript,
    "",
    "---",
    "",
    project.outputs.checklist,
    "",
    "---",
    "",
    project.outputs.roadmap,
  ];

  return sections.filter((line) => line !== undefined).join("\n");
}

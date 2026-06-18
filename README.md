# SquidCode

**Turn one idea into every branch you need to build and submit.**

SquidCode is an AI hackathon assistant for non-coders and beginner builders. Users paste hackathon, grant, bounty, or tournament information, then SquidCode helps them generate project ideas, MVP plans, AI coding prompts, pitch text, demo scripts, and submission checklists.

## Features

- **Builder Profile** — Set your skill level, interests, available time, goals, and tools
- **Opportunity Analyzer** — Paste hackathon/grant/bounty details and get a fit analysis
- **Idea Branches** — Generate 3-5 tailored project ideas with difficulty and demo strength scores
- **Project Planner** — Get a focused MVP plan with build order, risk notes, and scope control warnings
- **Tentacle Outputs** — 7 tabbed outputs: Build Plan, App Structure, AI Coding Prompt, Pitch, Demo Script, Submission Checklist, Future Roadmap
- **Copy & Export** — Every output has copy-to-clipboard; export full project as Markdown
- **Saved Projects** — Save projects to localStorage, reopen them, or export later
- **Demo Opportunity** — Pre-filled sample from 0G Labs Vibe Coding Tournament
- **Loading States** — Animated feedback during mock AI generation
- **Empty States** — Friendly guidance when no data exists yet
- **Responsive** — Works on desktop and mobile

## Tech Stack

- **Next.js 13** — React framework with App Router
- **TypeScript** — Type-safe data models and component props
- **Tailwind CSS** — Utility-first styling with custom theme
- **shadcn/ui** — Radix UI primitives with Tailwind styling
- **lucide-react** — Icons
- **localStorage** — Client-side persistence (no database for MVP)

## How to Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## MVP Limitations

- **Mock AI only** — All generation uses deterministic mock functions, not real AI
- **localStorage only** — Data persists per browser, not across devices
- **No authentication** — No user accounts or login
- **No real API integration** — No OpenRouter, Claude, or other AI APIs
- **No backend** — Everything runs client-side

## Future OpenRouter AI Integration Plan

1. Add an Edge Function or API route that calls OpenRouter with the builder profile, opportunity text, and selected idea as context
2. Replace mock functions in `lib/mock-ai.ts` with API calls to the edge function
3. Stream responses for real-time generation feel
4. Allow users to choose their preferred AI model (Claude, GPT-4, Llama, etc.)
5. Add Supabase Auth for user accounts and Supabase DB for cross-device persistence
6. Rate-limit generation calls per user

## Deployment Instructions for Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — no special configuration needed
4. Click "Deploy"
5. Your app will be live at `your-project.vercel.app`

No environment variables are required for the MVP since it uses mock AI and localStorage only.

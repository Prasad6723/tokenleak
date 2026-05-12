# REFLECTION

## 1. The hardest bug I hit this week

The hardest issue I faced was deployment failures on Vercel caused by missing dependencies and environment variable problems with Supabase. Initially the application worked locally but failed during production builds. I first assumed the issue was related to Next.js version mismatches because I had encountered React dependency conflicts earlier.

I started debugging by reading the Vercel build logs carefully instead of changing files randomly. The logs showed `Module not found: Can't resolve '@supabase/supabase-js'`. My first hypothesis was that the package had not installed correctly locally. After checking `package.json`, I realized the dependency was missing from the deployed commit even though it existed in my local environment.

I reinstalled the package, verified it using `npm list @supabase/supabase-js`, and then checked git status carefully before pushing changes again. After fixing that, another issue appeared related to missing environment variables. The app failed because `NEXT_PUBLIC_SUPABASE_URL` was undefined during build time.

The final fix involved both properly committing dependency updates and adding the required environment variables inside Vercel settings. The experience taught me how important deployment logs and reproducible debugging steps are.

---

## 2. A decision I reversed mid-week

Initially I planned to use AI-generated logic for the audit recommendations themselves. My idea was to send all pricing data and user input directly into an LLM and let it decide optimization suggestions dynamically.

After experimenting with this approach, I realized it created inconsistent and financially unreliable recommendations. Sometimes the AI would suggest plans that did not actually save money or would ignore seat-based pricing rules.

I reversed this decision and switched to a deterministic rule-based audit engine instead. The pricing calculations, downgrade suggestions, and savings logic are now handled through hardcoded rules and structured pricing data. AI is only used for generating the personalized summary paragraph after the audit calculations are complete.

This made the product much more reliable and aligned better with the assignment requirements. It also improved explainability because every recommendation could be traced back to exact pricing rules.

---

## 3. What I would build in week 2

If I had another week, I would focus on making the product more data-driven and shareable.

The first addition would be benchmark mode. Users could compare their AI spend per developer against startups of similar size and industry. This would make the audit feel more actionable and create stronger viral sharing incentives.

Second, I would improve the shareable results page with better Open Graph previews, charts, and downloadable PDF exports. Currently the product communicates savings clearly, but visual analytics would make it more compelling for founders sharing results publicly.

Third, I would add historical tracking. Teams could save multiple audits over time and monitor whether their AI spending efficiency improved month over month.

Finally, I would invest heavily into onboarding and growth loops. Features like referral codes, founder-focused landing pages, and integrations with Slack or Notion could turn the tool into a stronger lead-generation channel for Credex.

---

## 4. How I used AI tools

I used ChatGPT and Cursor throughout the project mainly for debugging help, UI improvements, and accelerating repetitive implementation tasks. AI was most useful when I needed quick explanations for deployment issues, TypeScript errors, or component structure ideas.

However, I deliberately avoided relying on AI for the actual pricing audit logic because I wanted deterministic and financially defensible recommendations. I also avoided blindly copying generated code without understanding it.

One specific time AI was wrong involved dependency debugging. The AI initially suggested forcing incompatible package versions during an npm conflict. After reviewing the dependency tree myself, I realized the real issue was an outdated Next.js version referenced from an earlier install attempt. Fixing the package versions manually solved the problem more cleanly.

I treated AI as a productivity tool and debugging assistant rather than an autonomous coding solution.

---

## 5. Self-rating

### Discipline — 8/10
I maintained steady progress across multiple days and continued debugging deployment issues even after repeated failures.

### Code quality — 7/10
The codebase is readable and modular, though with more time I would further improve abstraction boundaries and validation coverage.

### Design sense — 7/10
The interface is clean and functional, especially the audit results flow, but there is still room for stronger visual polish and branding.

### Problem-solving — 8/10
I handled multiple deployment and dependency issues methodically by testing hypotheses and using logs effectively.

### Entrepreneurial thinking — 8/10
I focused on building something realistically useful for founders rather than treating the assignment as only a frontend exercise.
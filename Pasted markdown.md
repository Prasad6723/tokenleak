# Missing MVP Assets for TokenLeak

## 1. `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm test
```

---

# 2. `TESTS.md`

````md
# Automated Test Coverage

## How to Run

```bash
npm test
````

---

## Tests Written

### 1. tests/audit-engine.test.ts

Covers recommendation generation for Claude pricing.

### 2. tests/audit-engine.test.ts

Covers reasoning output for Cursor plans.

### 3. tests/audit-engine.test.ts

Covers OpenAI API savings calculations.

### 4. tests/audit-engine.test.ts

Covers optimized result fallback handling.

### 5. tests/audit-engine.test.ts

Covers annual savings calculations.

### 6. tests/audit-engine.test.ts

Covers high-savings lead qualification logic.

````

---

# 3. `PROMPTS.md`

```md
# LLM Prompts

## Personalized Audit Summary Prompt

```txt
You are an AI infrastructure cost optimization advisor.

Given the user's AI stack, spending, team size, and recommendations, generate a concise 100-word summary explaining:
- where they are overspending
- what changes are recommended
- estimated monthly and annual savings
- whether Credex can help reduce infrastructure costs further

Keep the tone practical, founder-friendly, and data-driven.
````

---

## Why This Prompt

The prompt is intentionally constrained to:

* avoid hallucinated recommendations
* keep summaries concise
* focus on actionable savings
* maintain a professional tone

The audit calculations themselves are rule-based, not AI-generated.

---

## Failed Prompt Attempts

Earlier prompts produced:

* overly verbose summaries
* generic startup advice
* invented savings numbers

Adding structured bullet constraints improved consistency.

````

---

# 4. `ARCHITECTURE.md`

```md
# Architecture

## System Diagram

```mermaid
graph TD
    A[User Input Form] --> B[Audit Engine]
    B --> C[Savings Calculation]
    C --> D[AI Summary Generator]
    D --> E[Audit Results Page]
    E --> F[Lead Capture Form]
    F --> G[(Supabase Database)]
````

---

## Data Flow

1. User enters AI tools, plans, spend, and team details.
2. Form state persists locally in browser storage.
3. Audit engine evaluates optimization opportunities.
4. Savings totals are calculated.
5. AI generates a personalized summary.
6. Lead data is stored in Supabase.
7. Results can be shared through a public URL.

---

## Stack Choice

### Next.js

Chosen for:

* SSR support
* routing simplicity
* Vercel deployment
* Open Graph metadata support

### TypeScript

Chosen for:

* safer refactoring
* better audit logic reliability
* improved maintainability

### Supabase

Chosen for:

* fast backend setup
* hosted Postgres
* simple API integration

---

## Scaling to 10k Audits/Day

If scaled further:

* move audit calculations into API routes
* add Redis caching
* queue AI summary generation
* add database indexing
* use rate limiting middleware

````

---

# 5. `README.md` Additions

```md
## Decisions

### 1. Rule-based audit engine instead of AI reasoning
The pricing calculations are deterministic and financial in nature. Hardcoded logic improves reliability and avoids hallucinated savings.

### 2. Next.js App Router
Chosen for easier deployment, metadata support, and simplified routing.

### 3. Supabase for backend
Reduced setup complexity and enabled rapid MVP iteration.

### 4. No login wall before audit
The assignment emphasized value before lead capture.

### 5. Personalized summaries generated after calculations
AI is only used for communication, not financial logic.
````

---

# 6. `GTM.md`

```md
# Go-To-Market Strategy

## Target User

The ideal user is a technical founder or engineering manager at a 5–50 person startup actively using AI coding and productivity tools.

These teams often adopt multiple subscriptions quickly without centralized oversight. The result is duplicated tooling, unused seats, and expensive API usage.

---

## Discovery Moments

Users would search for this tool after:
- receiving a surprisingly high OpenAI bill
- comparing Cursor vs Claude Code pricing
- trying to reduce startup burn
- budgeting engineering tooling costs

Likely searches:
- “reduce AI API costs”
- “best Cursor alternative”
- “Claude vs OpenAI pricing”
- “AI spend calculator”

---

## Where Users Hang Out

- r/startups
- r/SideProject
- Indie Hackers
- Hacker News
- AI Engineering Discords
- Founder Twitter/X
- YC founder communities

---

## First 100 Users

1. Post spend comparison screenshots on X.
2. Share Hacker News launch.
3. DM founders using expensive AI stacks.
4. Publish a blog post comparing AI coding tools.
5. Offer free audit reviews in founder communities.

---

## Unfair Distribution Advantage

Credex already operates in AI infrastructure credits. The tool naturally feeds qualified leads into the business.

---

## Success Metrics

Week 1 traction:
- 100 completed audits
- 20 captured emails
- 5 consultation requests
- 2 qualified high-savings leads
```

---

# 7. `ECONOMICS.md`

```md
# Economics

## Lead Value

If a startup spends $2,000/month on AI infrastructure and Credex captures even 10% margin on credits, one customer could generate $200/month in revenue.

Annualized:
$200 x 12 = $2,400/year per customer.

---

## Estimated CAC

### Organic Founder Communities
CAC: $0–10

### Twitter/X Content
CAC: $20–50

### SEO Content
CAC: $50–100 initially

---

## Funnel Assumptions

1000 visitors
→ 250 audits completed
→ 50 email captures
→ 10 consultation requests
→ 2 converted customers

If each customer generates $2,400 ARR:
2 customers = $4,800 ARR

---

## Path to $1M ARR

To reach $1M ARR:

$1,000,000 / $2,400 ≈ 417 active customers.

At 2% visitor-to-customer conversion:
Approximately 20,000 highly targeted visitors/month would be needed.

---

## Key Assumption

The business only works if:
- startups continue increasing AI spend
- AI tooling fragmentation continues
- founders actively seek cost optimization
```

---

# 8. `METRICS.md`

```md
# Metrics

## North Star Metric

Completed audits per week.

This directly measures user interest and lead generation potential.

---

## Input Metrics

1. Landing page conversion rate
2. Audit completion rate
3. Lead capture rate

---

## First Instrumentation

- Page visits
- Form starts
- Form completion
- Result shares
- Consultation clicks

---

## Pivot Trigger

If fewer than 10% of audit users capture reports after 30 days, the perceived value proposition likely needs improvement.
```

---

# 9. Open Graph Metadata for `app/layout.tsx`

```tsx
export const metadata = {
  title: "TokenLeak AI Spend Auditor",
  description: "Audit your AI tool spend and discover savings opportunities.",
  openGraph: {
    title: "TokenLeak AI Spend Auditor",
    description: "See how much your startup can save on AI tools.",
    url: "https://your-domain.vercel.app",
    siteName: "TokenLeak",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokenLeak AI Spend Auditor",
    description: "Audit your startup's AI spending.",
    images: ["/og-image.png"],
  },
};
```

---

# 10. Supabase Environment Variables

Add in Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

# 11. Honeypot Anti-Spam Example

```tsx
<input
  type="text"
  name="website"
  style={{ display: "none" }}
  tabIndex={-1}
  autoComplete="off"
/>
```

Reject submissions if this field is filled.

---

# 12. Transactional Email Example (Resend)

```bash
npm install resend
```

```ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'audit@tokenleak.app',
  to: email,
  subject: 'Your AI Spend Audit',
  html: '<p>Your audit is ready.</p>',
});
```

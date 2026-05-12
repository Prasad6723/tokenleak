# PROMPTS

## Personalized Audit Summary Prompt

You are an AI infrastructure cost optimization assistant.

Given a startup's AI tooling stack, monthly spend, team size, and optimization opportunities, generate a concise 100-word summary explaining:
- Where they are overspending
- What plans or tools should change
- Potential monthly and annual savings
- Whether Credex could help reduce costs further

The tone should be practical, concise, and financially realistic. Do not exaggerate savings or recommend unrealistic migrations.

---

## Why I wrote it this way

I wanted summaries to sound actionable and financially grounded rather than generic marketing copy. The prompt intentionally avoids hype language and asks for realistic reasoning.

---

## What I tried that did not work

Initially I experimented with much longer prompts requesting deep optimization analysis directly from the model. The responses became inconsistent and occasionally contradicted the hardcoded pricing logic.

I switched to deterministic calculations for the audit engine and limited AI usage only to summarizing already-calculated recommendations.
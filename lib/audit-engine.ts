type AuditResult = {
  recommendation: string;
  savings: number;
  reason: string;
};

export function auditTool(
  tool: string,
  plan: string,
  seats: number
): AuditResult {

  if (tool === "ChatGPT" && plan === "Team" && seats <= 2) {
    return {
      recommendation: "Switch to ChatGPT Plus",
      savings: 20,
      reason: "Team plan is too expensive for very small teams.",
    };
  }

  if (tool === "Cursor" && plan === "Business" && seats === 1) {
    return {
      recommendation: "Downgrade to Cursor Pro",
      savings: 20,
      reason: "Business tier is unnecessary for solo developers.",
    };
  }

  if (tool === "Copilot" && plan === "Business" && seats <= 2) {
    return {
      recommendation: "Switch to Copilot Individual",
      savings: 9,
      reason: "Business plan provides little value for tiny teams.",
    };
  }
  if (tool === "Claude" && plan === "Team" && seats <= 2) {
  return {
    recommendation: "Switch to Claude Pro",
    savings: 10,
    reason: "Claude Team is unnecessary for tiny teams.",
  };
}

if (tool === "Gemini" && plan === "Ultra" && seats === 1) {
  return {
    recommendation: "Downgrade to Gemini Pro",
    savings: 10,
    reason: "Ultra plan is expensive for solo usage.",
  };
}
  return {
    recommendation: "Current setup looks optimized",
    savings: 0,
    reason: "No major savings opportunity detected.",
  };
}
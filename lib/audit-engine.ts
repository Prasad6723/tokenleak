export function auditTool(
  tool: string,
  plan: string,
  seats: number
) {
  if (tool === "ChatGPT" && plan === "Team" && seats <= 2) {
    return {
      recommendation: "Switch to ChatGPT Plus",
      savings: 20,
      reason: "Team plan is unnecessary for very small teams.",
    };
  }

  if (tool === "Cursor" && plan === "Business" && seats === 1) {
    return {
      recommendation: "Downgrade to Cursor Pro",
      savings: 20,
      reason: "Business tier is excessive for solo usage.",
    };
  }

  return {
    recommendation: "Current plan looks optimized",
    savings: 0,
    reason: "No major savings opportunities found.",
  };
}
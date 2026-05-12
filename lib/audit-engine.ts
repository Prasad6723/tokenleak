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

  // ChatGPT

  if (tool === "ChatGPT" && plan === "Team" && seats <= 2) {
    return {
      recommendation: "Switch to ChatGPT Plus",
      savings: 20,
      reason:
        "ChatGPT Team pricing is difficult to justify for very small teams.",
    };
  }

  if (tool === "ChatGPT" && plan === "Enterprise" && seats <= 5) {
    return {
      recommendation: "Downgrade to ChatGPT Team",
      savings: 150,
      reason:
        "Enterprise pricing is excessive for small collaborative teams.",
    };
  }

  // Claude

  if (tool === "Claude" && plan === "Team" && seats <= 2) {
    return {
      recommendation: "Switch to Claude Pro",
      savings: 20,
      reason:
        "Claude Team adds unnecessary collaboration overhead for tiny teams.",
    };
  }

  if (tool === "Claude" && plan === "Max" && seats === 1) {
    return {
      recommendation: "Downgrade to Claude Pro",
      savings: 80,
      reason:
        "Claude Max is expensive for solo usage unless usage volume is extremely high.",
    };
  }

  // Cursor

  if (tool === "Cursor" && plan === "Business" && seats === 1) {
    return {
      recommendation: "Switch to Cursor Pro",
      savings: 20,
      reason:
        "Cursor Business features rarely justify the additional cost for solo developers.",
    };
  }

  if (tool === "Cursor" && plan === "Enterprise" && seats <= 5) {
    return {
      recommendation: "Downgrade to Cursor Business",
      savings: 100,
      reason:
        "Enterprise tooling is unnecessary for very small engineering teams.",
    };
  }

  // Copilot

  if (tool === "Copilot" && plan === "Business" && seats <= 2) {
    return {
      recommendation: "Switch to Copilot Individual",
      savings: 9,
      reason:
        "GitHub Copilot Business adds little value for tiny teams.",
    };
  }

  if (tool === "Copilot" && plan === "Enterprise" && seats <= 5) {
    return {
      recommendation: "Downgrade to Copilot Business",
      savings: 100,
      reason:
        "Enterprise compliance features are likely underutilized at this scale.",
    };
  }

  // Gemini

  if (tool === "Gemini" && plan === "Ultra" && seats === 1) {
    return {
      recommendation: "Switch to Gemini Pro",
      savings: 10,
      reason:
        "Gemini Ultra pricing is difficult to justify for most solo users.",
    };
  }

  // API usage

  if (tool === "OpenAI API") {
    return {
      recommendation: "Consider prepaid infrastructure credits",
      savings: 100,
      reason:
        "Many startups overpay retail API pricing instead of using discounted infrastructure credits.",
    };
  }

  if (tool === "Anthropic API") {
    return {
      recommendation: "Consider discounted Anthropic credits",
      savings: 120,
      reason:
        "Committed usage discounts and infrastructure credits can reduce direct Anthropic API costs significantly.",
    };
  }

  // Windsurf

  if (tool === "Windsurf" && plan === "Teams" && seats <= 2) {
    return {
      recommendation: "Switch to Windsurf Pro",
      savings: 15,
      reason:
        "Teams pricing provides limited collaboration benefit for tiny teams.",
    };
  }

  return {
    recommendation: "Your current setup looks well optimized",
    savings: 0,
    reason:
      "No meaningful savings opportunities were detected for your current configuration.",
  };
}
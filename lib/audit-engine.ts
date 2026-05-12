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
        "Small teams usually do not benefit enough from ChatGPT Team collaboration features.",
    };
  }

  if (tool === "ChatGPT" && plan === "Enterprise" && seats <= 5) {
    return {
      recommendation: "Downgrade to ChatGPT Team",
      savings: 150,
      reason:
        "Enterprise plans become cost-effective only for larger organizations with strict compliance requirements.",
    };
  }

  // Claude

  if (tool === "Claude" && plan === "Team" && seats <= 2) {
    return {
      recommendation: "Switch to Claude Pro",
      savings: 20,
      reason:
        "Claude Team pricing is difficult to justify for very small teams.",
    };
  }

  if (tool === "Claude" && plan === "Max" && seats === 1) {
    return {
      recommendation: "Downgrade to Claude Pro",
      savings: 80,
      reason:
        "Claude Max is optimized for extremely heavy individual usage.",
    };
  }

  // Cursor

  if (tool === "Cursor" && plan === "Business" && seats === 1) {
    return {
      recommendation: "Switch to Cursor Pro",
      savings: 20,
      reason:
        "Solo developers rarely utilize Cursor Business collaboration capabilities.",
    };
  }

  if (tool === "Cursor" && plan === "Enterprise" && seats <= 5) {
    return {
      recommendation: "Downgrade to Cursor Business",
      savings: 100,
      reason:
        "Enterprise engineering tooling is unnecessary for very small teams.",
    };
  }

  // Copilot

  if (tool === "Copilot" && plan === "Business" && seats <= 2) {
    return {
      recommendation: "Switch to Copilot Individual",
      savings: 9,
      reason:
        "Copilot Business provides limited additional value for tiny engineering teams.",
    };
  }

  if (tool === "Copilot" && plan === "Enterprise" && seats <= 5) {
    return {
      recommendation: "Downgrade to Copilot Business",
      savings: 100,
      reason:
        "Enterprise governance features are often unnecessary for small teams.",
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

  // OpenAI API

  if (tool === "OpenAI API") {
    return {
      recommendation: "Use discounted infrastructure credits",
      savings: 100,
      reason:
        "Many startups overpay standard API pricing instead of using infrastructure credit programs.",
    };
  }

  // Anthropic API

  if (tool === "Anthropic API") {
    return {
      recommendation: "Use discounted Anthropic credits",
      savings: 120,
      reason:
        "Committed usage agreements often reduce Anthropic API costs significantly.",
    };
  }

  // Windsurf

  if (tool === "Windsurf" && plan === "Teams" && seats <= 2) {
    return {
      recommendation: "Switch to Windsurf Pro",
      savings: 15,
      reason:
        "Windsurf Teams features are underutilized by very small teams.",
    };
  }

  return {
    recommendation: "Your current setup looks well optimized",
    savings: 0,
    reason:
      "No meaningful savings opportunities were detected for your current configuration.",
  };
}
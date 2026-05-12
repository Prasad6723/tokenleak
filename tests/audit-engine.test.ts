import { auditTool } from "../lib/audit-engine";

describe("audit engine", () => {

  test("returns savings for ChatGPT Team", () => {

    const result = auditTool("ChatGPT", "Team", 1);

    expect(result.savings).toBeGreaterThan(0);

  });

  test("returns recommendation for Claude", () => {

    const result = auditTool("Claude", "Team", 2);

    expect(result.recommendation.length).toBeGreaterThan(0);

  });

  test("returns reason for Cursor", () => {

    const result = auditTool("Cursor", "Business", 1);

    expect(result.reason.length).toBeGreaterThan(0);

  });

  test("handles OpenAI API audits", () => {

    const result = auditTool("OpenAI API", "Direct", 1);

    expect(result.savings).toBeGreaterThan(0);

  });

  test("returns optimized result fallback", () => {

    const result = auditTool("Gemini", "Pro", 20);

    expect(result.savings).toBe(0);

  });

});
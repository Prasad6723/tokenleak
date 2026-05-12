export async function generateSummary({
  tool,
  plan,
  savings,
  recommendation,
}: {
  tool: string;
  plan: string;
  savings: number;
  recommendation: string;
}) {

  return `
You are currently using ${tool} on the ${plan} plan.

Based on your usage, we identified an estimated monthly savings of $${savings}.

Recommended optimization:
${recommendation}

Switching plans or consolidating tools can significantly reduce recurring AI software expenses while maintaining productivity.
  `;
}
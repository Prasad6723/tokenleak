"use client";

import { generateSummary } from "@/lib/generate-summary";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { auditTool } from "@/lib/audit-engine";

export default function Home() {

  const [tool, setTool] = useState("ChatGPT");
  const [plan, setPlan] = useState("Team");
  const [seats, setSeats] = useState(1);

  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState("Coding");

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [website, setWebsite] = useState("");

  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {

    const savedTool = localStorage.getItem("tool");
    const savedPlan = localStorage.getItem("plan");
    const savedSeats = localStorage.getItem("seats");
    const savedTeamSize = localStorage.getItem("teamSize");
    const savedUseCase = localStorage.getItem("useCase");

    if (savedTool) setTool(savedTool);
    if (savedPlan) setPlan(savedPlan);
    if (savedSeats) setSeats(Number(savedSeats));
    if (savedTeamSize) setTeamSize(Number(savedTeamSize));
    if (savedUseCase) setUseCase(savedUseCase);

  }, []);

  useEffect(() => {

    localStorage.setItem("tool", tool);
    localStorage.setItem("plan", plan);
    localStorage.setItem("seats", seats.toString());
    localStorage.setItem("teamSize", teamSize.toString());
    localStorage.setItem("useCase", useCase);

  }, [tool, plan, seats, teamSize, useCase]);

  const result = auditTool(tool, plan, seats);

  async function saveLead() {

    if (website) {
      return;
    }

    if (!email || !company || !role) {
      alert("Please fill all fields.");
      return;
    }

    setLoadingSummary(true);

    const generatedSummary = await generateSummary({
      tool,
      plan,
      savings: result.savings,
      recommendation: result.recommendation,
    });

    setSummary(generatedSummary);

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          Email: email,
          Company: company,
          Role: role,
        },
      ]);

    setLoadingSummary(false);

    if (error) {
      alert("Failed to save lead");
      console.log(error);
      return;
    }

    setEmail("");
    setCompany("");
    setRole("");

    alert("Lead saved successfully!");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-6xl font-bold leading-tight">
          Stop Overpaying for AI Tools
        </h1>

        <p className="mt-6 text-zinc-400 text-xl leading-8">
          Audit your AI stack instantly, identify overspending,
          and uncover hidden savings opportunities across your organization.
        </p>

        <div className="mt-10 bg-white text-black p-8 rounded-3xl shadow-2xl">

          <p className="text-sm uppercase tracking-wide">
            Estimated Savings
          </p>

          <h2 className="text-7xl font-bold mt-3">
            ${result.savings}
          </h2>

          <p className="mt-3 text-xl">
            per month · ${result.savings * 12} yearly
          </p>

        </div>

        <div className="mt-10 space-y-6 bg-zinc-900 border border-zinc-700 p-8 rounded-3xl">

          <div>

            <label className="block mb-2 text-sm text-zinc-400">
              AI Tool
            </label>

            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option>ChatGPT</option>
              <option>Claude</option>
              <option>Cursor</option>
              <option>Copilot</option>
              <option>Gemini</option>
              <option>OpenAI API</option>
              <option>Anthropic API</option>
              <option>Windsurf</option>
            </select>

          </div>

          <div>

            <label className="block mb-2 text-sm text-zinc-400">
              Current Plan
            </label>

            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option>Free</option>
              <option>Hobby</option>
              <option>Plus</option>
              <option>Pro</option>
              <option>Max</option>
              <option>Team</option>
              <option>Business</option>
              <option>Enterprise</option>
              <option>Ultra</option>
              <option>Individual</option>
              <option>API</option>
              <option>API direct</option>
              <option>Direct</option>
              <option>Teams</option>
            </select>

          </div>

          <div>

            <label className="block mb-2 text-sm text-zinc-400">
              Number of Seats
            </label>

            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm text-zinc-400">
              Team Size
            </label>

            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm text-zinc-400">
              Primary Use Case
            </label>

            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option>Coding</option>
              <option>Writing</option>
              <option>Research</option>
              <option>Data Analysis</option>
              <option>Mixed</option>
            </select>

          </div>

        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-700 p-8 rounded-3xl">

          <h2 className="text-4xl font-bold">
            Suggested Optimization
          </h2>

          <p className="mt-6 text-2xl">
            {result.recommendation}
          </p>

          <p className="mt-6 text-green-400 text-3xl font-bold">
            Save ${result.savings}/month
          </p>

          <p className="mt-6 text-zinc-400 leading-7">
            {result.reason}
          </p>

          {result.savings > 500 && (

            <div className="mt-8 bg-green-500/10 border border-green-500 p-5 rounded-2xl">

              <h3 className="text-2xl font-bold text-green-400">
                High Savings Opportunity Detected
              </h3>

              <p className="mt-3 text-zinc-300">
                Credex may help reduce your infrastructure costs even further
                through discounted AI infrastructure credits and enterprise optimization.
              </p>

            </div>

          )}

        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-700 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold">
            Get Full Report
          </h2>

          <p className="mt-3 text-zinc-400 leading-7">
            Save your audit and receive optimization updates.
          </p>

          <div className="mt-6 space-y-4">

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
            />

            <button
              onClick={saveLead}
              disabled={loadingSummary}
              className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:opacity-90 transition"
            >
              {loadingSummary
                ? "Generating Audit..."
                : "Save My Audit"}
            </button>

          </div>

        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-700 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold">
            AI Generated Audit Summary
          </h2>

          {loadingSummary ? (

            <p className="mt-6 text-zinc-400">
              Generating personalized audit summary...
            </p>

          ) : (

            <p className="mt-6 text-zinc-300 leading-8 whitespace-pre-line">
              {summary || "Save your audit to generate a personalized AI summary."}
            </p>

          )}

        </div>

      </div>

      <footer className="mt-24 text-center text-zinc-500 text-sm">
        Built for the Credex Web Development Internship Assignment
      </footer>

    </main>
  );
}
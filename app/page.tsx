"use client";

import { generateSummary } from "@/lib/generate-summary";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { auditTool } from "@/lib/audit-engine";

export default function Home() {

  const [tool, setTool] = useState("ChatGPT");
  const [plan, setPlan] = useState("Team");
  const [seats, setSeats] = useState(1);

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    const savedTool = localStorage.getItem("tool");
    const savedPlan = localStorage.getItem("plan");
    const savedSeats = localStorage.getItem("seats");

    if (savedTool) setTool(savedTool);
    if (savedPlan) setPlan(savedPlan);
    if (savedSeats) setSeats(Number(savedSeats));
  }, []);

  useEffect(() => {
    localStorage.setItem("tool", tool);
    localStorage.setItem("plan", plan);
    localStorage.setItem("seats", seats.toString());
  }, [tool, plan, seats]);

  const result = auditTool(tool, plan, seats);

  async function saveLead() {

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

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold">
          Stop Overpaying for AI Tools
        </h1>

        <p className="mt-4 text-zinc-400 text-lg">
          Audit your AI stack instantly and uncover hidden savings.
        </p>

        <div className="mt-10 bg-white text-black p-8 rounded-3xl">

          <p className="text-sm uppercase tracking-wide">
            Estimated Savings
          </p>

          <h2 className="text-6xl font-bold mt-2">
            ${result.savings}
          </h2>

          <p className="mt-2 text-lg">
            per month · ${result.savings * 12} yearly
          </p>

        </div>

        <div className="mt-10 space-y-6 bg-zinc-900 border border-zinc-700 p-6 rounded-2xl">

          <div>

            <label className="block mb-2 text-sm">
              Tool
            </label>

            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
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

            <label className="block mb-2 text-sm">
              Plan
            </label>

            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
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

            <label className="block mb-2 text-sm">
              Seats
            </label>

            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />

          </div>

        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-700 p-6 rounded-2xl">

          <h2 className="text-3xl font-bold">
            Suggested Optimization
          </h2>

          <p className="mt-4 text-xl">
            {result.recommendation}
          </p>

          <p className="mt-4 text-green-400 text-2xl font-bold">
            Save ${result.savings}/month
          </p>

          <p className="mt-4 text-zinc-400">
            {result.reason}
          </p>

        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-700 p-6 rounded-2xl">

          <h2 className="text-2xl font-bold">
            Get Full Report
          </h2>

          <p className="mt-2 text-zinc-400">
            Save your audit and receive optimization updates.
          </p>

          <div className="mt-6 space-y-4">

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />

            <button
              onClick={saveLead}
              className="w-full bg-white text-black py-3 rounded-xl font-semibold"
            >
              Save My Audit
            </button>

          </div>

        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-700 p-6 rounded-2xl">

          <h2 className="text-2xl font-bold">
            AI Generated Audit Summary
          </h2>

          {loadingSummary ? (

            <p className="mt-4 text-zinc-400">
              Generating personalized summary...
            </p>

          ) : (

            <p className="mt-4 text-zinc-300 leading-7 whitespace-pre-line">
              {summary || "Save your audit to generate an AI summary."}
            </p>

          )}

        </div>

      </div>

      <footer className="mt-20 text-center text-zinc-500 text-sm">
        Built for the Credex Web Development Internship Assignment
      </footer>

    </main>
  );
}
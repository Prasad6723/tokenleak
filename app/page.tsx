"use client";

import { useState } from "react";
import { auditTool } from "@/lib/audit-engine";

export default function Home() {
  const [tool, setTool] = useState("ChatGPT");
  const [plan, setPlan] = useState("Team");
  const [seats, setSeats] = useState(1);

  const result = auditTool(tool, plan, seats);

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
        <div className="mt-10 space-y-6 bg-zinc-800 border border-zinc-700 p-6 rounded-2xl">

          <div>
            <label className="block mb-2 text-sm">
              Tool
            </label>

            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800"
            >
              <option>ChatGPT</option>
              <option>Cursor</option>
              <option>Copilot</option>
              <option>Claude</option>
              <option>Gemini</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Plan
            </label>

            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800"
            >
              <option>Team</option>
              <option>Business</option>
              <option>Pro</option>
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
              className="w-full p-3 rounded-xl bg-zinc-800"
            />
          </div>

        </div>

        <div className="mt-10 bg-zinc-800 border border-zinc-700 p-6 rounded-2xl">

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

      </div>
      <footer className="mt-20 text-center text-zinc-500 text-sm">
  Built for the Credex Web Development Internship Assignment
</footer>
    </main>
  );
}
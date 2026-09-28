"use client";

import { useState } from "react";

export default function Home() {
  const [caseText, setCaseText] = useState("");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Legal Hindsight
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              AI-powered legal memory & consistency assistant
            </p>
          </div>

          <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            ● System Ready
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            Research the past before deciding the present.
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Enter a current legal matter to recall similar historical cases,
            previous arguments, outcomes, and potential consistency issues.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Current Case */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="mb-5">
              <h3 className="text-lg font-semibold">Current Case</h3>
              <p className="mt-1 text-sm text-slate-400">
                Describe the case, legal issue, argument, or facts you want to
                research.
              </p>
            </div>

            <textarea
              value={caseText}
              onChange={(e) => setCaseText(e.target.value)}
              placeholder="Example: The client is challenging a termination clause in a commercial agreement..."
              className="min-h-52 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
            />

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {caseText.length} characters
              </span>

              <button
                onClick={() =>
                  alert(
                    "Analysis will connect to the backend once the API is ready."
                  )
                }
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Analyze Case →
              </button>
            </div>
          </div>

          {/* How it works */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">How it works</h3>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-bold text-blue-400">
                    1
                  </span>
                  <span className="font-medium">Recall</span>
                </div>
                <p className="pl-11 text-sm leading-6 text-slate-400">
                  Find similar historical cases, arguments, and outcomes from
                  legal memory.
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-sm font-bold text-purple-400">
                    2
                  </span>
                  <span className="font-medium">Reflect</span>
                </div>
                <p className="pl-11 text-sm leading-6 text-slate-400">
                  Compare the current matter with previous legal reasoning.
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-sm font-bold text-amber-400">
                    3
                  </span>
                  <span className="font-medium">Flag</span>
                </div>
                <p className="pl-11 text-sm leading-6 text-slate-400">
                  Highlight potential inconsistencies for the lawyer to review.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Similar Cases</h3>
            <p className="mt-2 text-sm text-slate-500">
              Historical matches will appear here after analysis.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Potential Consistency Flags</h3>
            <p className="mt-2 text-sm text-slate-500">
              Previous positions that may require review will appear here.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Previous Arguments</h3>
            <p className="mt-2 text-sm text-slate-500">
              Relevant arguments and counterarguments from memory will appear
              here.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Reflections</h3>
            <p className="mt-2 text-sm text-slate-500">
              Hindsight-generated insights will appear here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
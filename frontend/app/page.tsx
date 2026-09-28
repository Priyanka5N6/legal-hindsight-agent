"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

const CONTRADICTING_SAMPLE =
  "Halden's delay caused Riverside only a minor inconvenience. Production continued with minimal interruption, and Riverside's actual losses from the delay were negligible.";

const CONSISTENT_SAMPLE =
  "Halden's twelve-day delay halted Riverside's production line and, under Section 4.2, constitutes a material breach causing significant losses.";

type CompareResponse = {
  without_memory: string;
  with_memory: string;
  memories_used: string[];
};

type ErrorResponse = {
  detail?: string;
};

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="space-y-3 text-sm leading-7 text-slate-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-5 text-2xl font-bold text-white first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-5 text-xl font-semibold text-white first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 text-lg font-semibold text-white first:mt-0">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="leading-7 text-slate-300">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="ml-5 list-disc space-y-2 text-slate-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-5 list-decimal space-y-2 text-slate-300">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-slate-600 pl-4 italic text-slate-400">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-blue-300">
              {children}
            </code>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-lg border border-slate-700">
              <table className="min-w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-800 text-slate-200">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-slate-700 px-4 py-3 font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-slate-800 px-4 py-3 text-slate-300">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function Home() {
  const [caseText, setCaseText] = useState("");
  const [result, setResult] = useState<CompareResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeCase() {
    const draft = caseText.trim();

    if (!draft) {
      setError("Please enter a draft paragraph before checking the case.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/compare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ draft }),
      });

      if (!response.ok) {
        let message = "The case could not be analyzed.";

        try {
          const errorData = (await response.json()) as ErrorResponse;

          if (errorData.detail) {
            message = errorData.detail;
          }
        } catch {
          // Keep the friendly fallback message.
        }

        throw new Error(message);
      }

      const data = (await response.json()) as CompareResponse;

      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Something went wrong while connecting to the legal memory backend."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function useSample(sample: string) {
    setCaseText(sample);
    setResult(null);
    setError("");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
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
            <span className="mr-2">●</span>
            System Ready
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            Research the past before deciding the present.
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
            Paste a draft paragraph from a legal brief and compare a plain LLM
            response with an answer grounded in the case&apos;s persistent
            Hindsight memory.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="mb-5">
            <h3 className="text-lg font-semibold">Current Draft</h3>
            <p className="mt-1 text-sm text-slate-400">
              Enter the paragraph you want the agent to check against previous
              filings and case memory.
            </p>
          </div>

          <textarea
            value={caseText}
            onChange={(event) => {
              setCaseText(event.target.value);

              if (error) {
                setError("");
              }
            }}
            disabled={loading}
            placeholder="Paste a draft paragraph here..."
            className="min-h-52 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              Try a sample
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => useSample(CONTRADICTING_SAMPLE)}
                disabled={loading}
                className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs font-medium text-amber-300 transition hover:bg-amber-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Contradicting sample
              </button>

              <button
                type="button"
                onClick={() => useSample(CONSISTENT_SAMPLE)}
                disabled={loading}
                className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Consistent sample
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-slate-500">
              {caseText.length} characters
            </span>

            <button
              type="button"
              onClick={analyzeCase}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900 disabled:text-blue-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-transparent" />
                  Checking case memory...
                </span>
              ) : (
                "Check against case memory →"
              )}
            </button>
          </div>

          {loading && (
            <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm text-blue-300">
              Hindsight is searching the case memory and comparing the draft.
              This can take 10–20 seconds.
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm text-red-300">
              <p className="font-semibold text-red-200">
                Unable to analyze the draft
              </p>
              <p className="mt-1">{error}</p>
            </div>
          )}
        </div>

        {result && !loading && (
          <div className="mt-8">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Memory comparison</h2>
              <p className="mt-1 text-sm text-slate-400">
                See what changes when the agent can access persistent case
                memory.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">
                      Without memory
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Plain LLM response
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                    No Hindsight
                  </span>
                </div>

                <MarkdownContent content={result.without_memory} />
              </article>

              <article className="rounded-2xl border border-emerald-500/40 bg-slate-900 p-6 shadow-lg shadow-emerald-950/20">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-300">
                      With Hindsight memory
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Persistent case memory applied
                    </p>
                  </div>

                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                    Memory Enabled
                  </span>
                </div>

                <MarkdownContent content={result.with_memory} />
              </article>
            </div>

            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-5">
                <h3 className="text-lg font-semibold">
                  What the agent remembered
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  These memory snippets were retrieved while analyzing the
                  draft.
                </p>
              </div>

              {result.memories_used.length > 0 ? (
                <ul className="space-y-3">
                  {result.memories_used.map((memory, index) => (
                    <li
                      key={`${index}-${memory}`}
                      className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm leading-6 text-slate-300"
                    >
                      <span className="mr-3 font-semibold text-emerald-400">
                        {index + 1}.
                      </span>
                      {memory}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  No memory snippets were returned for this analysis.
                </p>
              )}
            </section>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="font-semibold">Without memory</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                The plain LLM response will appear here after you analyze the
                draft.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-slate-900 p-6">
              <h3 className="font-semibold text-emerald-300">
                With Hindsight memory
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                The memory-grounded response, source documents, and confidence
                information will appear here.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
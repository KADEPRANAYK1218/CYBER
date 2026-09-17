import React, { useState } from 'react';
import { Sparkles, BrainCircuit, Search, Send, CheckCircle2, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { api } from '../../../services/api';

export const AIInsightsTabView: React.FC<{ onExploreGraph?: () => void }> = ({ onExploreGraph }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ q: string; a: string; time: string }>>([
    {
      q: 'Analyze transaction routing between Person A and Kabul Cargo Exchange.',
      a: 'Financial tracing identified ₹14.8 Crores routed through 3 intermediary corporate shell accounts (Imperial Trade Pvt Ltd and Escrow #8819). Total traversal hops: 3, with 98% probability of illegal hawala clearing.',
      time: '10 mins ago',
    },
    {
      q: 'Assess high-risk convergence bottlenecks in the Western corridor network.',
      a: 'Person B acts as the sole topological bridge between NCR logistical safehouses and the Nhava Sheva container port dock. Neutralizing Person B isolates 14 downstream freight operatives.',
      time: '1 hour ago',
    },
  ]);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    const currentQ = query;
    setLoading(true);
    setQuery('');

    const answer = await api.askAIInvestigator(currentQ);
    setHistory((prev) => [
      { q: currentQ, a: answer, time: 'Just now' },
      ...prev,
    ]);
    setLoading(false);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Header Banner */}
      <div className="bg-[#041628] rounded-xl border border-slate-800 p-4 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>AI Crime Intelligence Inference Suite</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-500/40">
                Gemini 2.5 Flash Online
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Natural language cross-graph queries, shortest illicit transaction pathing, and anomaly scoring.
            </p>
          </div>
        </div>

        {onExploreGraph && (
          <button
            onClick={onExploreGraph}
            className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>Network Graph</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Query Bar */}
      <div className="bg-[#041224] rounded-xl border border-slate-800 p-4 shadow-xl space-y-3">
        <form onSubmit={handleQuery} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask an investigative intelligence question (e.g. 'Trace Hawala links to safehouses')..."
              className="w-full h-10 pl-9 pr-4 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Run Inference</span>
          </button>
        </form>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Suggested queries:</span>
          {[
            'What is Person A centrality score and connected accounts?',
            'List all cross-border convoys near Terminal 3 border post',
            'Show Hawala accounts with turnover above ₹10 Crores',
            'Find anomalous phone calls originating from Noida Safehouse',
          ].map((sq) => (
            <button
              key={sq}
              onClick={() => setQuery(sq)}
              className="px-2.5 py-1 rounded bg-[#07192C] hover:bg-slate-800 text-[11px] text-slate-300 hover:text-indigo-300 border border-slate-800 transition cursor-pointer"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Inference Output Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 px-1">
          Recent Intelligence Inferences
        </h3>

        {history.map((h, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-[#041224] border border-slate-800 hover:border-indigo-500/50 transition space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-indigo-400" />
                <span>{h.q}</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">{h.time}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-[#07192C] p-3 rounded-lg border border-slate-800/80">
              {h.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

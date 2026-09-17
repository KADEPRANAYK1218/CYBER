import React from 'react';
import { X, Sparkles, BrainCircuit, Network, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { AIInsightItem } from '../../types';

interface AIInsightDetailModalProps {
  insight: AIInsightItem;
  onClose: () => void;
  onExploreNetwork?: () => void;
}

export const AIInsightDetailModal: React.FC<AIInsightDetailModalProps> = ({
  insight,
  onClose,
  onExploreNetwork,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-sky-500/50 rounded-2xl w-full max-w-xl shadow-2xl flex flex-col overflow-hidden text-slate-100 select-none">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061d36] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-600 text-white uppercase">
                  {insight.type}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">98.4% Confidence</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide mt-0.5">
                {insight.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-sky-400" />
              <span>Algorithmic Deduction</span>
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed bg-[#07192C] p-3 rounded-xl border border-slate-800 font-sans">
              {insight.description}
            </p>
          </div>

          {/* Mathematical graph metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Betweenness Centrality</span>
              <span className="text-xs font-bold text-sky-400 mt-1 block font-mono">0.892 (High Bridge)</span>
            </div>
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Anomaly Detection Score</span>
              <span className="text-xs font-bold text-amber-400 mt-1 block font-mono">3.8σ Deviation</span>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Investigative Recommendations</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="p-2 bg-[#07192C] rounded-lg border border-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Subpoena CDR records for identified intermediate bridging nodes.</span>
              </li>
              <li className="p-2 bg-[#07192C] rounded-lg border border-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Flag linked accounts in FIU-IND FinTrace automated monitor.</span>
              </li>
              <li className="p-2 bg-[#07192C] rounded-lg border border-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Initiate electronic surveillance warrant under Section 69 IT Act.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#030e1c] flex items-center justify-between text-xs">
          {onExploreNetwork && (
            <button
              onClick={() => {
                onClose();
                onExploreNetwork();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Explore on Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

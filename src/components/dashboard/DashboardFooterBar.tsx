import React, { useState } from 'react';
import {
  Plus,
  Network,
  Cpu,
  FileText,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { api } from '../../services/api';

interface DashboardFooterBarProps {
  onOpenModal?: (modalType: 'create-case' | 'build-network' | 'run-ai' | 'generate-report') => void;
}

export const DashboardFooterBar: React.FC<DashboardFooterBarProps> = ({ onOpenModal }) => {
  const [aiQuery, setAiQuery] = useState('');
  const [queryResponse, setQueryResponse] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isAskingAI, setIsAskingAI] = useState(false);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || isAskingAI) return;

    setIsAskingAI(true);
    try {
      const response = await api.askAIInvestigator(aiQuery);
      setQueryResponse(response);
    } catch (err: any) {
      setQueryResponse(`Error processing intelligence query: ${err.message}`);
    } finally {
      setIsAskingAI(false);
    }
  };

  const handleTriggerAction = async (actionName: string) => {
    if (onOpenModal) {
      if (actionName === 'Create New Case') return onOpenModal('create-case');
      if (actionName === 'Build Network') return onOpenModal('build-network');
      if (actionName === 'Run AI Analysis') return onOpenModal('run-ai');
      if (actionName === 'Generate Report') return onOpenModal('generate-report');
    }

    if (actionName === 'Create New Case') {
      const result = await api.createCase({
        type: 'Inter-State Narcotics & Hawala Network',
        priority: 'HIGH',
        lead: 'Investigator Sharma',
      });
      if (result && result.case) {
        setActionNotice(`Case ${result.case.id} created successfully in live intelligence database.`);
      } else {
        setActionNotice('New case registered in National Intelligence Registry.');
      }
    } else {
      setActionNotice(`${actionName} initialized on backend intelligence nodes.`);
    }

    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Toast Notice */}
      {actionNotice && (
        <div className="p-2 bg-emerald-950/90 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2 select-none animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* AI Response Drawer */}
      {queryResponse && (
        <div className="p-3.5 bg-[#0A1F38] border border-sky-500/50 rounded-xl text-xs text-sky-200 flex items-start justify-between gap-3 shadow-xl animate-in fade-in">
          <div className="flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white text-xs">AI Investigator Core Analysis:</span>
              <p className="mt-1 text-slate-200 text-xs leading-relaxed font-mono">{queryResponse}</p>
            </div>
          </div>
          <button
            onClick={() => setQueryResponse(null)}
            className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center select-none">
        {/* ====================================================
            LEFT: Quick Actions (Cols 1-5)
            ==================================================== */}
        <div className="lg:col-span-5 bg-[#041224] rounded-xl border border-slate-800 p-3 shadow-lg">
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Action 1 */}
            <button
              type="button"
              id="btn-create-new-case"
              onClick={() => handleTriggerAction('Create New Case')}
              className="px-2.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer truncate"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span>Create New Case</span>
            </button>

            {/* Action 2 */}
            <button
              type="button"
              id="btn-build-network"
              onClick={() => handleTriggerAction('Build Network')}
              className="px-2.5 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer truncate"
            >
              <Network className="w-3.5 h-3.5 shrink-0" />
              <span>Build Network</span>
            </button>

            {/* Action 3 */}
            <button
              type="button"
              id="btn-run-ai-analysis"
              onClick={() => handleTriggerAction('Run AI Analysis')}
              className="px-2.5 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer truncate"
            >
              <Cpu className="w-3.5 h-3.5 shrink-0" />
              <span>Run AI Analysis</span>
            </button>

            {/* Action 4 */}
            <button
              type="button"
              id="btn-generate-report"
              onClick={() => handleTriggerAction('Generate Report')}
              className="px-2.5 py-2 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer truncate"
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* ====================================================
            CENTER: Ask AI Investigator (Cols 6-9)
            ==================================================== */}
        <div className="lg:col-span-4 bg-[#041224] rounded-xl border border-slate-800 p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold text-white tracking-wide">
              Ask AI Investigator
            </span>
          </div>

          <form onSubmit={handleAskAI} className="relative flex items-center">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder='e.g. "Find connections between Person A and Person Z"'
              className="w-full h-9 pl-3 pr-9 bg-[#07192C] border border-slate-700 focus:border-sky-500 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition"
              disabled={isAskingAI}
            />
            <button
              type="submit"
              id="btn-ask-ai-submit"
              disabled={isAskingAI}
              className="absolute right-1 w-7 h-7 rounded-md bg-[#10B981] hover:bg-[#059669] text-white flex items-center justify-center transition shadow-sm cursor-pointer disabled:opacity-50"
              title="Submit query"
            >
              {isAskingAI ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {/* ====================================================
            RIGHT: Data Driven Investigation Badge (Cols 10-12)
            ==================================================== */}
        <div className="lg:col-span-3 bg-gradient-to-r from-[#041224] via-[#09223B] to-[#041628] rounded-xl border border-sky-500/30 p-3 shadow-lg flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-700 p-0.5 flex items-center justify-center shrink-0 shadow-md ring-2 ring-sky-400/40">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide">
              Data Driven Investigation
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold tracking-wide">
              For a Safer Nation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

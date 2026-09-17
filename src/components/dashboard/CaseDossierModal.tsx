import React, { useEffect, useState } from 'react';
import { X, FileText, ShieldAlert, CheckCircle2, Clock, MapPin, PhoneCall, DollarSign, Download } from 'lucide-react';
import { api } from '../../services/api';

interface CaseDossierModalProps {
  caseId: string;
  onClose: () => void;
}

export const CaseDossierModal: React.FC<CaseDossierModalProps> = ({ caseId, onClose }) => {
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'Investigating' | 'Analysis' | 'Pending' | 'Review'>('Investigating');
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.getCase(caseId).then((res) => {
      if (isMounted) {
        if (res) {
          setCaseData(res);
          setStatus(res.status);
        } else {
          // Fallback case dossier
          setCaseData({
            id: caseId,
            type: 'Organized Hawala & Contraband Network',
            priority: 'HIGH',
            status: 'Investigating',
            lead: 'ACP Vikram S. Rathore',
            firNumber: `FIR-DL-${caseId.replace('#', '')}/2026`,
            jurisdiction: 'Special Cell, Delhi Police & ATS Maharashtra',
            summary: 'Cross-border syndicate facilitating shadow ledger settlements and automated layered corporate shell remittances.',
            financialVolume: '₹48.6 Crores',
            suspectsCount: 14,
            interceptedCallsCount: 184,
            timeline: [
              { date: '2026-09-05', note: 'Financial intelligence flagged 3 shell corporate transactions to Kabul Cargo Exchange.' },
              { date: '2026-09-03', note: 'Wiretap transcript logged Person A directive to Noida safehouse coordinator.' },
              { date: '2026-08-29', note: 'FASTag toll gate intercept confirmed convoy movement through Western Highway corridor.' },
            ],
            evidenceItems: [
              'CDR logs spanning 6 burner IMEI numbers',
              'Seized shadow Hawala ledger with encrypted transaction codes',
              'Surveillance photographs at Nhava Sheva CFS container dock',
              'Encrypted drive containing corporate shell ledgers',
            ],
          });
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [caseId]);

  const handleStatusChange = async (newStatus: any) => {
    setStatus(newStatus);
    const res = await api.updateCase(caseId, { status: newStatus });
    setNotice(`Case status updated to ${newStatus} in central registry.`);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleExportDocket = () => {
    const text = `NATIONAL CRIMINAL INVESTIGATION INTELLIGENCE DOSSIER\nCASE ID: ${caseId}\nFIR: ${caseData?.firNumber || 'N/A'}\nSTATUS: ${status}\nLEAD: ${caseData?.lead || 'ACP Rathore'}\nFINANCIAL VOLUME: ${caseData?.financialVolume || 'N/A'}\nSUMMARY: ${caseData?.summary || 'N/A'}\nTIMELINE:\n${(caseData?.timeline || []).map((t: any) => `[${t.date}] ${t.note}`).join('\n')}\nEVIDENCE:\n${(caseData?.evidenceItems || []).map((e: string) => `- ${e}`).join('\n')}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Intelligence-Docket-${caseId.replace('#', '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-sky-500/50 rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100 select-none">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061d36] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {caseId}
                </span>
                <h3 className="text-base font-bold text-white tracking-wide">
                  {caseData?.type || 'Case File Dossier'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                  {caseData?.priority || 'HIGH PRIORITY'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                {caseData?.firNumber} // Jurisdiction: {caseData?.jurisdiction}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice Toast */}
        {notice && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-6 py-1.5 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{notice}</span>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Lead Officer</span>
              <span className="text-xs font-bold text-white mt-1 block truncate">
                {caseData?.lead || 'ACP Rathore'}
              </span>
            </div>
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Financial Volume</span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block">
                {caseData?.financialVolume || '₹48.6 Cr'}
              </span>
            </div>
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Monitored Suspects</span>
              <span className="text-xs font-bold text-sky-400 mt-1 block">
                {caseData?.suspectsCount || 14} Identified
              </span>
            </div>
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Intercepted Calls</span>
              <span className="text-xs font-bold text-amber-400 mt-1 block">
                {caseData?.interceptedCallsCount || 184} Transcripts
              </span>
            </div>
          </div>

          {/* Investigation Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Intelligence Summary & Modus Operandi
            </h4>
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
              {caseData?.summary}
            </div>
          </div>

          {/* Evidence Ledger */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Seized Evidence & Intercept Logs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(caseData?.evidenceItems || []).map((item: string, i: number) => (
                <div
                  key={i}
                  className="p-2.5 bg-[#07192C]/80 rounded-lg border border-slate-800/90 text-xs text-slate-200 flex items-start gap-2"
                >
                  <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chronological Investigation Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Operational Chronology
            </h4>
            <div className="space-y-2">
              {(caseData?.timeline || []).map((step: any, i: number) => (
                <div
                  key={i}
                  className="p-2.5 bg-[#07192C]/60 rounded-lg border border-slate-800/80 flex items-start gap-3 text-xs"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-slate-400 font-semibold">{step.date}:</span>{' '}
                    <span className="text-slate-200">{step.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Changer */}
          <div className="p-3 bg-[#061d36] rounded-xl border border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-white block">Investigation Status</span>
              <span className="text-[11px] text-slate-400">Current active disposition of case file</span>
            </div>
            <div className="flex items-center gap-1.5">
              {(['Investigating', 'Analysis', 'Pending', 'Review'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
                    status === st
                      ? 'bg-sky-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#030e1c] flex items-center justify-between text-xs">
          <button
            onClick={handleExportDocket}
            className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Case Docket</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

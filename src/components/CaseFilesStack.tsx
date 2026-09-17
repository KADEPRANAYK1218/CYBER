import React, { useState } from 'react';
import { FileText, PhoneCall, CreditCard, Radio, ShieldAlert, FolderLock, X } from 'lucide-react';
import { CaseFile } from '../types';

const CASE_FILES_DATA: CaseFile[] = [
  {
    id: 'fir-01',
    code: 'FIR',
    title: 'First Information Reports (FIR Core Register)',
    count: '1,420 Cases Indexed',
    status: 'REAL-TIME SYNC',
    classification: 'RESTRICTED // POLICE SPECIAL CELL',
  },
  {
    id: 'fir-02',
    code: 'FIR',
    title: 'Cognizable Offenses & Syndicate FIRs',
    count: '89 Active FIR Leads',
    status: 'MULTI-STATE TRACE',
    classification: 'CONFIDENTIAL // SPECIAL SQUAD',
  },
  {
    id: 'cdr-03',
    code: 'CDR',
    title: 'Call Detail Records (CDR Forensics)',
    count: '8.4M Cell Pings',
    status: 'TOWER DUMP PROCESSED',
    classification: 'RESTRICTED // TELCO INTEL',
  },
  {
    id: 'fin-04',
    code: 'FINANCIAL',
    title: 'Financial Forensics & Hawala Trails',
    count: '₹412 Cr Traced',
    status: 'FIU-IND INTEGRATION',
    classification: 'HIGH PRIORITY // MONEY TRAIL',
  },
  {
    id: 'surv-05',
    code: 'SURVEILLANCE',
    title: 'ANPR, Drone & Electronic Surveillance',
    count: '24 City Feeds',
    status: 'AI FACIAL MATCHING',
    classification: 'ACTIVE OPS // FIELD UNITS',
  },
  {
    id: 'intel-06',
    code: 'INTELLIGENCE',
    title: 'Inter-Agency Dossiers & Crime Grids',
    count: '94 Syndicate Profiles',
    status: 'MULTI-AGENCY LEADS',
    classification: 'TOP SECRET // AUTHORIZED ONLY',
  },
];

export const CaseFilesStack: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<CaseFile | null>(null);

  const getIcon = (code: string) => {
    switch (code) {
      case 'FIR':
        return <FileText className="w-3.5 h-3.5 text-amber-400" />;
      case 'CDR':
        return <PhoneCall className="w-3.5 h-3.5 text-sky-400" />;
      case 'FINANCIAL':
        return <CreditCard className="w-3.5 h-3.5 text-emerald-400" />;
      case 'SURVEILLANCE':
        return <Radio className="w-3.5 h-3.5 text-red-400" />;
      case 'INTELLIGENCE':
        return <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <FolderLock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="relative z-20">
      {/* Visual Desk Binders Stack (matches reference image stack on officer desk) */}
      <div className="flex flex-col w-52 sm:w-64 select-none drop-shadow-xl">
        {CASE_FILES_DATA.map((file, idx) => (
          <button
            key={`${file.id}-${idx}`}
            id={`case-binder-${idx}-${file.code.toLowerCase()}`}
            onClick={() => setSelectedFile(file)}
            className="group relative flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-[#0d141e] via-[#1a2536] to-[#0f1722] hover:from-[#1b2b40] hover:to-[#172537] border-y border-slate-700/60 border-l-4 border-l-slate-400/80 hover:border-l-sky-400 text-left transition-all duration-150 cursor-pointer shadow-sm hover:translate-x-1"
            style={{
              marginBottom: '-1px',
            }}
          >
            {/* Binder ring rivet simulation */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500/80 group-hover:bg-sky-400 shadow-xs"></span>
              <span className="font-mono text-[11px] sm:text-xs font-black tracking-widest text-slate-200 group-hover:text-white uppercase drop-shadow-xs">
                {file.code}
              </span>
            </div>

            <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              {getIcon(file.code)}
              <span className="text-[9px] font-mono text-slate-400">DOC</span>
            </div>
          </button>
        ))}
      </div>

      {/* Detailed Modal on binder click */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#09172e] border border-cyan-500/40 rounded-xl p-5 max-w-md w-full shadow-2xl shadow-cyan-950/60 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedFile(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded bg-slate-800 text-sky-300 border border-sky-500/40">
                {selectedFile.code}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
                {selectedFile.title}
              </h4>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-slate-700/60 pt-3">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">DATA VOLUME:</span>
                <span className="text-white font-semibold">{selectedFile.count}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-emerald-400 font-semibold">{selectedFile.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">CLASSIFICATION:</span>
                <span className="text-amber-400 font-semibold">{selectedFile.classification}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="px-4 py-1.5 bg-[#0b2144] hover:bg-[#123161] text-white text-xs font-semibold rounded-md border border-sky-400/40 cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { FileSpreadsheet, Download, FileText, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { api } from '../../../services/api';

export const ReportsTabView: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadedReport, setDownloadedReport] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getReports().then((data) => {
      if (isMounted) {
        setReports(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDownload = (rep: any) => {
    const text = `NATIONAL CRIMINAL INVESTIGATION SYSTEM\nREPORT ID: ${rep.id}\nTITLE: ${rep.title}\nAUTHOR: ${rep.author}\nDATE: ${rep.date}\nCLASSIFICATION: ${rep.classification}\n\nSUMMARY:\nGenerated automated synthesis of criminal hierarchy, call data records (CDR), bank account links, and surveillance geo-proximity logs.\n\nCERTIFICATION:\nApproved for judicial evidentiary submission and Inter-Agency taskforce deployment.`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rep.id}-${rep.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadedReport(`Downloaded dossier for "${rep.title}"`);
    setTimeout(() => setDownloadedReport(null), 3500);
  };

  return (
    <div className="space-y-4 select-none">
      <div className="bg-[#041628] rounded-xl border border-slate-800 p-4 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-sky-400" />
            <span>Official Intelligence Reports & Legal Dockets</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Court-admissible intelligence briefs, FIR evidence compilations, and inter-state syndicate audits.
          </p>
        </div>
      </div>

      {downloadedReport && (
        <div className="bg-emerald-950/90 border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadedReport}</span>
        </div>
      )}

      <div className="space-y-3">
        {reports.map((r) => (
          <div
            key={r.id}
            className="p-4 rounded-xl bg-[#041224] border border-slate-800 hover:border-sky-500/50 transition flex items-center justify-between gap-4 shadow-lg"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">
                  {r.classification}
                </span>
                <span className="text-xs font-mono text-slate-400">{r.date}</span>
                <span className="text-xs font-mono text-slate-500">{r.pages} pages</span>
              </div>
              <h3 className="text-sm font-bold text-white">{r.title}</h3>
              <p className="text-xs text-slate-400 font-mono">
                Lead Signatory: {r.author} // ID: {r.id}
              </p>
            </div>

            <button
              onClick={() => handleDownload(r)}
              className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Export Docket</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

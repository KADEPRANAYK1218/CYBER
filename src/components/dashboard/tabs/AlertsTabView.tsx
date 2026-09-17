import React, { useEffect, useState } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw, Send, Lock } from 'lucide-react';
import { AlertItem } from '../../../types';
import { api } from '../../../services/api';

export const AlertsTabView: React.FC<{ onSelectCase?: (caseId: string) => void }> = ({ onSelectCase }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const fetchAlerts = async () => {
    setLoading(true);
    const data = await api.getAlerts();
    setAlerts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleResolve = async (id: string, action: string) => {
    await api.resolveAlert(id, action);
    setActionNotice(`Alert ${id} processed: "${action}"`);
    fetchAlerts();
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Banner */}
      <div className="bg-[#041628] rounded-xl border border-slate-800 p-4 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>Real-time Threat & Early Warning Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated sensor feeds from CDR cell-tower dumps, banking transaction velocity, and toll gate FASTag scans.
          </p>
        </div>

        <button
          onClick={fetchAlerts}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
        </button>
      </div>

      {actionNotice && (
        <div className="bg-emerald-950/90 border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Alerts Grid */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-sky-400" />
            <span className="text-xs">Connecting to automated telemetry pipeline...</span>
          </div>
        ) : (
          alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg ${
                alt.severity === 'high'
                  ? 'bg-red-950/20 border-red-800/50 hover:border-red-500/70'
                  : 'bg-amber-950/20 border-amber-800/40 hover:border-amber-500/60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      alt.severity === 'high' ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
                    }`}
                  >
                    {alt.severity} SEVERITY
                  </span>
                  <span className="text-xs font-mono text-slate-400">{alt.time}</span>
                  <span className="text-xs font-mono text-sky-400 font-bold">Case {alt.caseId}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{alt.title}</h3>
                <p className="text-xs text-slate-300 font-mono">
                  Telemetry ID: {alt.id} // Threat Vector: Inter-State Cell Correlation Alert
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleResolve(alt.id, 'Dispatched Field Surveillance')}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Deploy Intercept</span>
                </button>
                <button
                  onClick={() => handleResolve(alt.id, 'Asset Freeze Initiated')}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Freeze Account</span>
                </button>
                <button
                  onClick={() => handleResolve(alt.id, 'Acknowledged & Logged')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition cursor-pointer"
                >
                  Resolve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

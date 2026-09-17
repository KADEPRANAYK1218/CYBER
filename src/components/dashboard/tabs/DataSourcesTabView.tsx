import React, { useEffect, useState } from 'react';
import { Database, CheckCircle2, ShieldCheck, Activity, RefreshCw } from 'lucide-react';
import { api } from '../../../services/api';

export const DataSourcesTabView: React.FC = () => {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSources = async () => {
    setLoading(true);
    const data = await api.getDataSources();
    setSources(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSources();
  }, []);

  return (
    <div className="space-y-4 select-none">
      <div className="bg-[#041628] rounded-xl border border-slate-800 p-4 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>National Intelligence Data Ingestion Gateways</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time synchronization status across statutory policing, CDR telemetry, banking hawala gateways, and toll feeds.
          </p>
        </div>

        <button
          onClick={fetchSources}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {sources.map((src) => (
          <div
            key={src.id}
            className="p-4 rounded-xl bg-[#041224] border border-slate-800 hover:border-emerald-500/50 transition shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{src.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {src.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#07192C] p-2.5 rounded-lg border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">Latency:</span>
                <span className="text-emerald-400 font-bold">{src.latency}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Ingested Data:</span>
                <span className="text-sky-300 font-bold">{src.recordsCount}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-800/80">
                <span className="text-slate-400 text-[10px]">Last Heartbeat: </span>
                <span className="text-slate-200">{src.lastSync}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

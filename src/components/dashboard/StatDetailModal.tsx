import React, { useEffect, useState } from 'react';
import { X, Search, ShieldAlert, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

interface StatDetailModalProps {
  statType: string;
  onClose: () => void;
  onSelectCase?: (caseId: string) => void;
  onSelectPlayer?: (playerName: string) => void;
  onSelectCommunity?: (commId: string) => void;
}

export const StatDetailModal: React.FC<StatDetailModalProps> = ({
  statType,
  onClose,
  onSelectCase,
  onSelectPlayer,
  onSelectCommunity,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.getStatDetails(statType).then((res) => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [statType]);

  const items = data?.items || [];
  const filteredItems = items.filter((item: any) => {
    const text = JSON.stringify(item).toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-sky-500/40 rounded-2xl w-full max-w-4xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden text-slate-100 select-none">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061e38] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  {data?.title || 'Intelligence Records'}
                </h3>
                {data?.count && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-600 text-white">
                    {data.count}
                  </span>
                )}
                {data?.trend && (
                  <span className="text-xs font-semibold text-emerald-400 font-mono">
                    {data.trend}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{data?.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-[#041224] flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by keyword, name, ID, or location..."
              className="w-full h-9 pl-9 pr-4 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Showing {filteredItems.length} of {items.length} records
          </span>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-sky-400" />
              <span className="text-xs">Connecting to central intelligence repository...</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching records found in intelligence query.
            </div>
          ) : (
            filteredItems.map((item: any, idx: number) => (
              <div
                key={item.id || idx}
                className="p-3.5 rounded-xl bg-[#07192C]/80 border border-slate-800 hover:border-sky-500/50 transition-all flex items-center justify-between gap-4 hover:bg-[#0a233e]"
              >
                {/* Left details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {item.name || item.title || item.id || `Record #${idx + 1}`}
                    </span>
                    {item.alias && (
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                        alias: {item.alias}
                      </span>
                    )}
                    {item.risk && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          item.risk === 'HIGH' || item.risk === 'CRITICAL'
                            ? 'bg-red-600 text-white'
                            : item.risk === 'MEDIUM'
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {item.risk}
                      </span>
                    )}
                    {item.severity && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          item.severity === 'HIGH' ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
                        }`}
                      >
                        {item.severity}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-300 font-mono">
                    {item.type && <div><span className="text-slate-500">Type:</span> {item.type}</div>}
                    {item.syndicate && <div><span className="text-slate-500">Syndicate:</span> <span className="text-sky-300">{item.syndicate}</span></div>}
                    {item.lead && <div><span className="text-slate-500">Lead:</span> {item.lead}</div>}
                    {item.status && <div><span className="text-slate-500">Status:</span> <span className="text-emerald-300">{item.status}</span></div>}
                    {item.connections && <div><span className="text-slate-500">Links:</span> <span className="text-white font-bold">{item.connections} nodes</span></div>}
                    {item.threatVector && <div><span className="text-slate-500">Threat:</span> <span className="text-rose-300">{item.threatVector}</span></div>}
                    {item.trigger && <div><span className="text-slate-500">Trigger:</span> <span className="text-amber-200">{item.trigger}</span></div>}
                    {item.turnover && <div><span className="text-slate-500">Turnover:</span> <span className="text-emerald-400 font-bold">{item.turnover}</span></div>}
                    {item.action && <div><span className="text-slate-500">Action:</span> <span className="text-sky-200">{item.action}</span></div>}
                  </div>
                </div>

                {/* Right action button */}
                <div className="shrink-0">
                  {item.id?.startsWith('#') && onSelectCase && (
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCase(item.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>View Dossier</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {item.name?.startsWith('Person') && onSelectPlayer && (
                    <button
                      onClick={() => {
                        onClose();
                        onSelectPlayer(item.name);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {item.name?.includes('Pipeline') && onSelectCommunity && (
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCommunity('comm-1');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Examine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#030e1c] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Live Central Database Synchronized (REST Protocol)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { X, Network, Users, Building, Globe, Layers, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';

interface CommunityDossierModalProps {
  communityId: string;
  onClose: () => void;
  onSelectPlayer?: (name: string) => void;
}

export const CommunityDossierModal: React.FC<CommunityDossierModalProps> = ({
  communityId,
  onClose,
  onSelectPlayer,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.getCommunity(communityId).then((res) => {
      if (isMounted) {
        if (res) {
          setData(res);
        } else {
          setData({
            id: communityId,
            name: 'Apex Hawala & Smuggling Pipeline',
            members: 14,
            keyNode: 'Person A',
            strength: 'High Density (88%)',
            territories: ['National Capital Region', 'Mumbai Western Freight Corridor', 'Punjab Border Sector'],
            interceptedVolume: '₹142 Crores across 12 months',
            operationalModus: 'Layered shell invoicing disguised as agro-commodity transit with off-ledger hawala settlements.',
            keyAssociates: [
              { name: 'Person A', role: 'Syndicate Apex Kingpin', status: 'Active Surveillance' },
              { name: 'Person B', role: 'Inter-Community Bridge Liaison', status: 'Wiretap Active' },
              { name: 'Person C', role: 'Hawala Chief Cashier', status: 'Lookout Circular Issued' },
              { name: 'Person D', role: 'Fleet & Convoy Logistics Head', status: 'Tracked via FASTag' },
            ],
            frontCompanies: ['Imperial Trade Pvt Ltd', 'Apex Global Logistics', 'Kabul Cargo Exchange'],
          });
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [communityId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-emerald-500/40 rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100 select-none">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061d36] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  {data?.name || 'Criminal Network Community'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                  {data?.members || 14} Members
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Cluster Density: <span className="text-emerald-400 font-mono font-semibold">{data?.strength}</span> // Apex: <span className="text-white font-bold">{data?.keyNode}</span>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Operational Modus */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Syndicate Modus Operandi</span>
            </h4>
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
              {data?.operationalModus}
            </div>
          </div>

          {/* Operational Scope & Volume */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Intercepted Turnover</span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block font-mono">
                {data?.interceptedVolume || '₹142 Crores'}
              </span>
            </div>
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Key Controller</span>
              <span className="text-xs font-bold text-sky-400 mt-1 block font-mono">
                {data?.keyNode} (Eigen Centrality 0.98)
              </span>
            </div>
          </div>

          {/* Key Associates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span>Identified Key Associates & Cell Heads</span>
            </h4>
            <div className="space-y-1.5">
              {(data?.keyAssociates || []).map((assoc: any, idx: number) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[#07192C] rounded-lg border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-white">{assoc.name}</span>
                    <span className="text-slate-400 ml-2">— {assoc.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                      {assoc.status}
                    </span>
                    {onSelectPlayer && (
                      <button
                        onClick={() => {
                          onClose();
                          onSelectPlayer(assoc.name);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition cursor-pointer"
                        title="View Profile"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Front Shell Companies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              <span>Correlated Commercial Shell Entities</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(data?.frontCompanies || []).map((comp: string, idx: number) => (
                <div key={idx} className="p-2 bg-[#07192C] rounded-lg border border-slate-800 text-xs text-slate-200">
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#030e1c] flex items-center justify-end text-xs">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

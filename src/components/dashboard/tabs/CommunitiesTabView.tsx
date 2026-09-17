import React, { useEffect, useState } from 'react';
import { Users, Network, ArrowRight, ShieldAlert, Building, DollarSign } from 'lucide-react';
import { NetworkCommunity } from '../../../types';
import { api } from '../../../services/api';

export const CommunitiesTabView: React.FC<{ onSelectCommunity: (commId: string) => void }> = ({
  onSelectCommunity,
}) => {
  const [communities, setCommunities] = useState<NetworkCommunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.getCommunities().then((data) => {
      if (isMounted) {
        setCommunities(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-4 select-none">
      <div className="bg-[#041628] rounded-xl border border-slate-800 p-4 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span>Criminal Syndicates & Community Clusters</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Louvain modularity clustering and Girvan-Newman community partition across all monitored nodes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {communities.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCommunity(c.id)}
            className="p-4 rounded-xl bg-[#041224] border border-slate-800 hover:border-purple-500/60 transition cursor-pointer shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">{c.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-900 text-purple-200 border border-purple-700/50">
                {c.members} Nodes
              </span>
            </div>

            <div className="space-y-2 text-xs bg-[#07192C] p-3 rounded-lg border border-slate-800 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Cluster Density:</span>
                <span className="text-emerald-400 font-bold">{c.density}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Apex Key Node:</span>
                <span className="text-sky-300 font-bold">{c.keyNode}</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectCommunity(c.id);
              }}
              className="w-full py-2 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <span>Examine Cluster Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

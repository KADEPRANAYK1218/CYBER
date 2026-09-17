import React from 'react';
import { ArrowRight, Users, Network } from 'lucide-react';

interface NetworkCommunitiesCardProps {
  onSelectCommunity?: (commId: string) => void;
  onViewAll?: () => void;
}

export const NetworkCommunitiesCard: React.FC<NetworkCommunitiesCardProps> = ({
  onSelectCommunity,
  onViewAll,
}) => {
  const communities = [
    {
      id: 'comm-1',
      title: 'Community 01',
      members: '14 people | 3 orgs',
      strength: 'High',
      keyNode: 'Person A',
      icon: Users,
      bgColor: 'bg-gradient-to-b from-[#251119] to-[#170910]',
      borderColor: 'border-red-900/60 hover:border-red-500/60',
      iconColor: 'bg-red-500/20 text-red-400',
    },
    {
      id: 'comm-2',
      title: 'Community 02',
      members: '9 people | 2 orgs',
      strength: 'Medium',
      keyNode: 'Person F',
      icon: Users,
      bgColor: 'bg-gradient-to-b from-[#0F1D33] to-[#081220]',
      borderColor: 'border-sky-900/60 hover:border-sky-500/60',
      iconColor: 'bg-sky-500/20 text-sky-400',
    },
    {
      id: 'comm-3',
      title: 'Community 03',
      members: '7 people | 1 org',
      strength: 'Low',
      keyNode: 'Person K',
      icon: Network,
      bgColor: 'bg-gradient-to-b from-[#0E251E] to-[#061713]',
      borderColor: 'border-emerald-900/60 hover:border-emerald-500/60',
      iconColor: 'bg-emerald-500/20 text-emerald-400',
    },
  ];

  return (
    <div className="bg-[#041224] rounded-xl border border-slate-800 shadow-xl p-4 flex flex-col justify-between select-none h-[270px]">
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide">
            Network Communities
          </h4>
          <button
            type="button"
            onClick={onViewAll}
            className="text-[11px] font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer transition"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 3 cards side-by-side */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {communities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => onSelectCommunity && onSelectCommunity(item.id)}
                title="Click to view community dossier"
                className={`p-3 rounded-lg border ${item.borderColor} ${item.bgColor} flex flex-col items-center text-center transition-all duration-150 cursor-pointer shadow-sm hover:scale-105 active:scale-95`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${item.iconColor} flex items-center justify-center mb-2`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-xs font-bold text-white mb-1">{item.title}</div>
                <div className="text-[10px] text-slate-300 font-mono mb-2">{item.members}</div>

                <div className="w-full pt-1.5 border-t border-white/10 text-[10px] space-y-0.5">
                  <div className="text-slate-400">
                    Strength: <span className="text-white font-semibold">{item.strength}</span>
                  </div>
                  <div className="text-slate-400 truncate">
                    Key Node: <span className="text-sky-300 font-semibold">{item.keyNode}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

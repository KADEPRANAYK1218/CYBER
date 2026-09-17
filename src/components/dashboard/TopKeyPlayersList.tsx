import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { KeyPlayer } from '../../types';

const KEY_PLAYERS_DATA: KeyPlayer[] = [
  { rank: 1, name: 'Person A', connections: 47, risk: 'HIGH' },
  { rank: 2, name: 'Person B', connections: 39, risk: 'HIGH' },
  { rank: 3, name: 'Person C', connections: 28, risk: 'MEDIUM' },
  { rank: 4, name: 'Person D', connections: 21, risk: 'MEDIUM' },
  { rank: 5, name: 'Person E', connections: 18, risk: 'LOW' },
];

interface TopKeyPlayersListProps {
  onSelectPlayer?: (name: string) => void;
  onViewAll?: () => void;
}

export const TopKeyPlayersList: React.FC<TopKeyPlayersListProps> = ({ onSelectPlayer, onViewAll }) => {
  const getRiskBadge = (risk: KeyPlayer['risk']) => {
    switch (risk) {
      case 'HIGH':
        return 'bg-[#EF4444] text-white';
      case 'MEDIUM':
        return 'bg-[#F97316] text-white';
      case 'LOW':
        return 'bg-[#22C55E] text-white';
    }
  };

  return (
    <div className="bg-[#041224] rounded-xl border border-slate-800 shadow-xl p-4 flex flex-col justify-between select-none h-[270px]">
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide">
            Top Key Players
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

        {/* Rows */}
        <div className="space-y-1.5 mt-2.5">
          {KEY_PLAYERS_DATA.map((player) => (
            <div
              key={player.rank}
              onClick={() => onSelectPlayer && onSelectPlayer(player.name)}
              title="Click to view suspect intelligence dossier"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-800/80 hover:border-sky-500/40 border border-transparent transition-all select-none cursor-pointer group"
            >
              {/* Rank and Avatar and Name */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-400 w-3 group-hover:text-sky-400">
                  {player.rank}
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:border-sky-400">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-white group-hover:text-sky-300">{player.name}</span>
              </div>

              {/* Connections and Risk badge */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400">
                  {player.connections} connections
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider ${getRiskBadge(
                    player.risk
                  )}`}
                >
                  {player.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

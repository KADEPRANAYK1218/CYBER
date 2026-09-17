import React, { useEffect, useState } from 'react';
import { Folder, User, Network, AlertTriangle, Link2 } from 'lucide-react';
import { api, DashboardStats } from '../../services/api';

interface StatCardsRowProps {
  onSelectStat?: (statType: string) => void;
}

export const StatCardsRow: React.FC<StatCardsRowProps> = ({ onSelectStat }) => {
  const [backendStats, setBackendStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getStats().then((data) => {
      if (isMounted && data) {
        setBackendStats(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    {
      id: 'stat-active-cases',
      statKey: 'active-cases',
      label: 'Active Cases',
      value: backendStats ? String(backendStats.activeCases.value) : '128',
      trend: backendStats ? backendStats.activeCases.trend : '↑ 12%',
      trendPositive: backendStats ? backendStats.activeCases.isPositive : true,
      icon: Folder,
      iconBg: 'bg-[#153B66] text-[#38BDF8]',
      cardBg: 'bg-gradient-to-b from-[#091D33] to-[#071728] border-slate-700/60',
    },
    {
      id: 'stat-persons-identified',
      statKey: 'persons-identified',
      label: 'Persons Identified',
      value: backendStats ? String(backendStats.personsIdentified.value) : '2,846',
      trend: backendStats ? backendStats.personsIdentified.trend : '↑ 8%',
      trendPositive: backendStats ? backendStats.personsIdentified.isPositive : true,
      icon: User,
      iconBg: 'bg-[#153B66] text-[#38BDF8]',
      cardBg: 'bg-gradient-to-b from-[#091D33] to-[#071728] border-slate-700/60',
    },
    {
      id: 'stat-criminal-networks',
      statKey: 'criminal-networks',
      label: 'Criminal Networks',
      value: backendStats ? String(backendStats.criminalNetworks.value) : '47',
      trend: backendStats ? backendStats.criminalNetworks.trend : '↑ 15%',
      trendPositive: backendStats ? backendStats.criminalNetworks.isPositive : true,
      icon: Network,
      iconBg: 'bg-[#311E54] text-[#C084FC]',
      cardBg: 'bg-gradient-to-b from-[#111C33] to-[#091526] border-purple-900/40',
    },
    {
      id: 'stat-high-risk-nodes',
      statKey: 'high-risk-nodes',
      label: 'High-Risk Nodes',
      value: backendStats ? String(backendStats.highRiskNodes.value) : '63',
      trend: backendStats ? backendStats.highRiskNodes.trend : '↑ 9%',
      trendPositive: backendStats ? backendStats.highRiskNodes.isPositive : false,
      icon: AlertTriangle,
      iconBg: 'bg-[#4C121A] text-[#F87171]',
      cardBg: 'bg-gradient-to-b from-[#241017] to-[#160A0F] border-red-900/50',
    },
    {
      id: 'stat-suspicious-activities',
      statKey: 'suspicious-activities',
      label: 'Suspicious Activities',
      value: backendStats ? String(backendStats.suspiciousActivities.value) : '121',
      trend: backendStats ? backendStats.suspiciousActivities.trend : '↑ 22%',
      trendPositive: backendStats ? backendStats.suspiciousActivities.isPositive : true,
      icon: AlertTriangle,
      iconBg: 'bg-[#45220C] text-[#FB923C]',
      cardBg: 'bg-gradient-to-b from-[#24170E] to-[#170E08] border-orange-900/50',
    },
    {
      id: 'stat-unresolved-connections',
      statKey: 'unresolved-connections',
      label: 'Unresolved Connections',
      value: backendStats ? String(backendStats.unresolvedConnections.value) : '37',
      trend: backendStats ? backendStats.unresolvedConnections.trend : '↓ 6%',
      trendPositive: backendStats ? backendStats.unresolvedConnections.isPositive : false,
      icon: Link2,
      iconBg: 'bg-[#0E353D] text-[#2DD4BF]',
      cardBg: 'bg-gradient-to-b from-[#081F26] to-[#051419] border-teal-900/50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            id={item.id}
            onClick={() => onSelectStat && onSelectStat(item.statKey)}
            title="Click to inspect intelligence records"
            className={`p-3.5 rounded-xl border ${item.cardBg} flex items-center gap-3.5 shadow-lg shadow-black/20 hover:border-sky-400/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 select-none cursor-pointer group`}
          >
            {/* Left square icon container */}
            <div
              className={`w-11 h-11 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform`}
            >
              <Icon className="w-5 h-5 stroke-[2]" />
            </div>

            {/* Right content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="block text-[11px] font-medium text-slate-300 truncate group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-1 mt-0.5">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  {item.value}
                </span>
                <span
                  className={`text-[11px] font-semibold ${
                    item.trendPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}
                >
                  {item.trend}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

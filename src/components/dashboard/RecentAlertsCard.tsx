import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { AlertItem } from '../../types';

const ALERTS_DATA: AlertItem[] = [
  {
    id: 'alt-1',
    title: 'Suspicious financial transaction detected',
    caseId: '#26190',
    timeAgo: '2 hours ago',
    severity: 'high',
  },
  {
    id: 'alt-2',
    title: 'New connection between high-risk entities',
    caseId: '#26190',
    timeAgo: '4 hours ago',
    severity: 'warning',
  },
  {
    id: 'alt-3',
    title: 'Unusual communication pattern',
    caseId: '#26188',
    timeAgo: '6 hours ago',
    severity: 'warning',
  },
  {
    id: 'alt-4',
    title: 'Potential money laundering chain',
    caseId: '#26187',
    timeAgo: '8 hours ago',
    severity: 'warning',
  },
];

interface RecentAlertsCardProps {
  onSelectAlert?: (alert: AlertItem) => void;
  onViewAll?: () => void;
}

export const RecentAlertsCard: React.FC<RecentAlertsCardProps> = ({ onSelectAlert, onViewAll }) => {
  return (
    <div className="bg-[#041224] rounded-xl border border-slate-800 shadow-xl p-4 flex flex-col justify-between select-none h-[270px]">
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide">
            Recent Alerts
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

        {/* List of alerts */}
        <div className="space-y-2 mt-2.5">
          {ALERTS_DATA.map((item) => {
            const isHigh = item.severity === 'high';

            return (
              <div
                key={item.id}
                onClick={() => onSelectAlert && onSelectAlert(item)}
                title="Click to view alert telemetry & forensics"
                className={`p-2 rounded-lg border flex items-start gap-2.5 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                  isHigh
                    ? 'bg-red-950/30 border-red-900/50 hover:border-red-500/80'
                    : 'bg-amber-950/25 border-amber-900/40 hover:border-amber-500/70'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    isHigh ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>

                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-200 truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    Case {item.caseId} · {item.timeAgo}
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

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { DashboardCase } from '../../types';
import { api } from '../../services/api';

const DEFAULT_CASES: DashboardCase[] = [
  { id: '#26189', type: 'Organized Crime Network', priority: 'HIGH', status: 'Investigating' },
  { id: '#26190', type: 'Financial Network', priority: 'HIGH', status: 'Analysis' },
  { id: '#26191', type: 'Communication Network', priority: 'MEDIUM', status: 'Investigating' },
  { id: '#26192', type: 'Drug Trafficking Network', priority: 'MEDIUM', status: 'Pending' },
  { id: '#26193', type: 'Cyber Fraud Ring', priority: 'LOW', status: 'Review' },
];

interface RecentCasesTableProps {
  onSelectCase?: (caseId: string) => void;
  onViewAll?: () => void;
}

export const RecentCasesTable: React.FC<RecentCasesTableProps> = ({ onSelectCase, onViewAll }) => {
  const [cases, setCases] = useState<DashboardCase[]>(DEFAULT_CASES);

  useEffect(() => {
    let isMounted = true;
    api.getCases().then((data) => {
      if (isMounted && data && data.length > 0) {
        setCases(data.slice(0, 5));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const getPriorityBadge = (priority: DashboardCase['priority']) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-[#EF4444] text-white';
      case 'MEDIUM':
        return 'bg-[#F97316] text-white';
      case 'LOW':
        return 'bg-[#22C55E] text-white';
    }
  };

  const getStatusBadge = (status: DashboardCase['status']) => {
    switch (status) {
      case 'Investigating':
        return 'bg-[#1E3A8A] text-sky-200 border-sky-600/40';
      case 'Analysis':
        return 'bg-[#1D4ED8] text-sky-100 border-sky-500/40';
      case 'Pending':
        return 'bg-[#0F172A] text-slate-300 border-slate-700';
      case 'Review':
        return 'bg-[#134E4A] text-teal-200 border-teal-600/40';
    }
  };

  return (
    <div className="bg-[#041224] rounded-xl border border-slate-800 shadow-xl p-4 flex flex-col justify-between select-none h-[270px]">
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide">
            Recent Cases
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

        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-2.5 px-2">
          <div className="col-span-3">Case ID</div>
          <div className="col-span-4">Type</div>
          <div className="col-span-2 text-center">Priority</div>
          <div className="col-span-3 text-right">Status</div>
        </div>

        {/* Table rows */}
        <div className="space-y-1.5 mt-1.5">
          {cases.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCase && onSelectCase(item.id)}
              title="Click to view full case dossier"
              className="grid grid-cols-12 gap-2 items-center px-2 py-1.5 rounded-md hover:bg-slate-800/80 hover:border-sky-500/40 border border-transparent text-xs transition select-none cursor-pointer group"
            >
              <div className="col-span-3 font-mono font-bold text-slate-200 group-hover:text-sky-400">{item.id}</div>
              <div className="col-span-4 text-slate-300 truncate text-[11px] group-hover:text-white">{item.type}</div>
              <div className="col-span-2 text-center">
                <span
                  className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider ${getPriorityBadge(
                    item.priority
                  )}`}
                >
                  {item.priority}
                </span>
              </div>
              <div className="col-span-3 text-right">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

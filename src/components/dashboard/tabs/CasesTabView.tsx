import React, { useEffect, useState } from 'react';
import { Search, Plus, Filter, FileText, ArrowRight, ShieldAlert, Download, RefreshCw } from 'lucide-react';
import { DashboardCase } from '../../../types';
import { api } from '../../../services/api';

interface CasesTabViewProps {
  onSelectCase: (caseId: string) => void;
  onCreateNewCase: () => void;
}

export const CasesTabView: React.FC<CasesTabViewProps> = ({ onSelectCase, onCreateNewCase }) => {
  const [cases, setCases] = useState<DashboardCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCases = async () => {
    setLoading(true);
    const data = await api.getCases();
    setCases(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const filteredCases = cases.filter((c) => {
    const matchesPriority = filterPriority === 'ALL' || c.priority === filterPriority;
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.lead && c.lead.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-4 select-none">
      {/* Top Banner */}
      <div className="bg-[#041628] rounded-xl border border-slate-800 p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>Central Case Docket Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Active FIR investigations and synchronized inter-state criminal syndicate dockets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCreateNewCase}
            className="px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Case</span>
          </button>
          <button
            onClick={fetchCases}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Refresh cases from backend"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#041224] rounded-xl border border-slate-800 p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by case ID, title, or lead officer..."
            className="w-full h-9 pl-9 pr-4 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-mono">Priority:</span>
          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                filterPriority === p
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-[#041224] rounded-xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-[#061d36] text-[11px] font-mono text-slate-300 uppercase tracking-wider border-b border-slate-800">
          <div className="col-span-2">Case ID</div>
          <div className="col-span-4">Syndicate / Subject</div>
          <div className="col-span-2">Lead Officer</div>
          <div className="col-span-2 text-center">Priority</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y divide-slate-800/80">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-sky-400" />
              <span className="text-xs">Fetching active case files...</span>
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching case files found.
            </div>
          ) : (
            filteredCases.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className="grid grid-cols-12 gap-3 items-center px-4 py-3 hover:bg-slate-800/50 transition cursor-pointer text-xs"
              >
                <div className="col-span-2 font-mono font-bold text-sky-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>{c.id}</span>
                </div>
                <div className="col-span-4 text-white font-medium truncate">
                  {c.type}
                </div>
                <div className="col-span-2 text-slate-400 font-mono truncate">
                  {c.lead || 'Investigator Sharma'}
                </div>
                <div className="col-span-2 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.priority === 'HIGH'
                        ? 'bg-red-600 text-white'
                        : c.priority === 'MEDIUM'
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {c.priority}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCase(c.id);
                    }}
                    className="px-2.5 py-1 rounded bg-sky-600/80 hover:bg-sky-500 text-white text-[11px] font-semibold inline-flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

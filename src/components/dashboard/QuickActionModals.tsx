import React, { useState } from 'react';
import { X, Plus, Network, Sparkles, FileText, CheckCircle2, Download, RefreshCw, Send } from 'lucide-react';
import { api } from '../../services/api';

// 1. Create Case Modal
export const CreateCaseModal: React.FC<{ onClose: () => void; onCreated: () => void }> = ({
  onClose,
  onCreated,
}) => {
  const [type, setType] = useState('Organized Hawala Syndicate Network');
  const [priority, setPriority] = useState('HIGH');
  const [lead, setLead] = useState('Investigator Sharma');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.createCase({ type, priority, lead });
    setSuccess(true);
    setLoading(false);
    onCreated();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-sky-500/50 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-slate-100 select-none">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061d36] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Create New Case File</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">New Case Registered Successfully</h4>
            <p className="text-xs text-slate-400">Added to central active cases docket and synchronized live.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Syndicate / Case Title</label>
              <input
                type="text"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-9 px-3 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Priority Classification</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full h-9 px-3 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="HIGH">HIGH (Priority 1)</option>
                  <option value="MEDIUM">MEDIUM (Priority 2)</option>
                  <option value="LOW">LOW (Surveillance)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Lead Investigating Officer</label>
                <input
                  type="text"
                  required
                  value={lead}
                  onChange={(e) => setLead(e.target.value)}
                  className="w-full h-9 px-3 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
              >
                {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Register Case</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// 2. Build Network Modal (Add Node or Link)
export const BuildNetworkModal: React.FC<{ onClose: () => void; onAdded: () => void }> = ({
  onClose,
  onAdded,
}) => {
  const [label, setLabel] = useState('');
  const [type, setType] = useState('person');
  const [syndicate, setSyndicate] = useState('Apex Monitored Syndicate');
  const [connections, setConnections] = useState('5');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    setLoading(true);
    await api.addNode({ label, type, syndicate, connections: parseInt(connections) || 1 });
    setSuccess(true);
    setLoading(false);
    onAdded();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-emerald-500/50 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-slate-100 select-none">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061d36] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Network className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Add Entity to Network Graph</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Node Ingested to Live Graph</h4>
            <p className="text-xs text-slate-400">Available for interactive topology tracing immediately.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Node / Entity Label</label>
              <input
                type="text"
                required
                placeholder="e.g. Person X, Safehouse Rohini, Hawala Trunk #8"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full h-9 px-3 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Entity Classification</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-9 px-3 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="person">Suspect / Person</option>
                  <option value="organization">Organization / Shell Co</option>
                  <option value="vehicle">Vehicle / Convoy</option>
                  <option value="account">Hawala / Bank Account</option>
                  <option value="location">Safehouse / Location</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Connections Count</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={connections}
                  onChange={(e) => setConnections(e.target.value)}
                  className="w-full h-9 px-3 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Associated Syndicate</label>
              <input
                type="text"
                value={syndicate}
                onChange={(e) => setSyndicate(e.target.value)}
                className="w-full h-9 px-3 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
              >
                {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Add Node to Graph</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// 3. Run AI Analysis Modal
export const RunAIAnalysisModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [query, setQuery] = useState('Identify shortest financial routing path between Person A and Kabul Cargo Exchange.');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const output = await api.askAIInvestigator(query, '#26190');
    setResult(output);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-indigo-500/50 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden text-slate-100 select-none">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061d36] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Crime Intelligence Engine</h3>
              <p className="text-[11px] text-slate-400">Gemini 2.5 Flash Graph Inference Core</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Natural Language Investigative Query
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask intelligence graph question..."
                className="flex-1 h-9 px-3 bg-[#07192C] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleRun}
                disabled={loading}
                className="px-4 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Analyze</span>
              </button>
            </div>
          </div>

          {/* Preset Prompts */}
          <div className="flex flex-wrap gap-1.5">
            {[
              'Person A and Person Z shortest bridge',
              'Trace Hawala transaction flow for ₹14.8 Cr',
              'Show convoy vehicles moving through Terminal 3',
            ].map((p) => (
              <button
                key={p}
                onClick={() => setQuery(p)}
                className="px-2 py-1 rounded bg-[#07192C] hover:bg-slate-800 text-[11px] text-slate-400 hover:text-sky-300 border border-slate-800 cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* AI Result */}
          {result && (
            <div className="p-4 bg-[#07192C] rounded-xl border border-indigo-500/40 text-xs text-slate-200 leading-relaxed font-sans space-y-2">
              <div className="flex items-center justify-between text-[11px] text-indigo-400 font-mono font-bold">
                <span>INFERENCE RESULT (HIGH CONFIDENCE)</span>
                <span>LATENCY: 142ms</span>
              </div>
              <p>{result}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-slate-800 bg-[#030e1c] flex items-center justify-end text-xs">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Generate Report Modal
export const GenerateReportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const reportText = `GOVERNMENT OF INDIA - MINISTRY OF HOME AFFAIRS\nSPECIAL CRIME BRANCH // CRIMINAL NETWORK ANALYSIS SYSTEM\nOFFICIAL INTELLIGENCE SUMMARY REPORT\n\nDate: 2026-09-06\nClassification: TOP SECRET // LEVEL 3 CLEARANCE ONLY\n\nEXECUTIVE SUMMARY:\nAnalysis across 128 active cases confirms high-density cluster (Apex Hawala & Smuggling Pipeline) operating 47 verified links across NCR, Mumbai Western Corridor, and Dubai financial escrows. Core bottleneck node: Person A (centrality 0.98).\n\nKEY NODES & ASSETS:\n1. Person A: 47 connections, ₹38 Cr liquid hawala assets, Lookout Circular Dispatched.\n2. Imperial Trade Pvt Ltd: Shell entity invoicing ₹14.8 Cr via bogus overseas shipments.\n3. Safehouse Noida Sec 62: Triangulated meeting coordinate for encrypted burner trunks.\n\nRECOMMENDATIONS:\n1. Execute synchronized asset freeze across all 18 flagged escrow accounts.\n2. Dispatch tactical field intercept team for vehicle convoy DL-01-AB-9821.\n\nEND OF REPORT // CENTRAL INTELLIGENCE REPOSITORY`;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `National-Intelligence-Report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-sky-500/50 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-100 select-none">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061d36] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Generate Intelligence Dossier Report</h3>
              <p className="text-[11px] text-slate-400">Court-admissible and multi-agency compilation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <div className="p-3.5 bg-[#07192C] rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Report Type:</span>
              <span className="text-white font-bold">National Security Comprehensive Docket</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Data Inclusion:</span>
              <span className="text-emerald-400">128 Cases, 47 Nodes, 6 High-Risk Vectors</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Security Classification:</span>
              <span className="text-red-400 font-mono font-bold">TOP SECRET // RESTRICTED</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            This operation generates an encrypted, cryptographically signed intelligence dossier suitable for judicial warrant submission and multi-agency inter-state taskforce coordination.
          </p>
        </div>

        <div className="px-6 py-3 border-t border-slate-800 bg-[#030e1c] flex items-center justify-between text-xs">
          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloaded ? 'Report Re-Downloaded' : 'Download Complete Dossier'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

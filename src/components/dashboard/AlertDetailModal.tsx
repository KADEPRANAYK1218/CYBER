import React, { useState } from 'react';
import { X, AlertTriangle, Shield, CheckCircle2, Clock, Send, Lock } from 'lucide-react';
import { AlertItem } from '../../types';
import { api } from '../../services/api';

interface AlertDetailModalProps {
  alert: AlertItem;
  onClose: () => void;
  onAlertResolved?: () => void;
}

export const AlertDetailModal: React.FC<AlertDetailModalProps> = ({
  alert,
  onClose,
  onAlertResolved,
}) => {
  const [resolvedMessage, setResolvedMessage] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const handleAction = async (actionType: string) => {
    setLoadingAction(true);
    await api.resolveAlert(alert.id, actionType);
    setResolvedMessage(`Action "${actionType}" dispatched successfully to central command.`);
    setLoadingAction(false);
    if (onAlertResolved) onAlertResolved();
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-rose-500/50 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden text-slate-100 select-none">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061d36] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase">
                  {alert.severity} SEVERITY
                </span>
                <span className="text-xs font-mono text-slate-400">{alert.time}</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide mt-0.5">
                {alert.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status notice */}
        {resolvedMessage && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-6 py-2 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{resolvedMessage}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Associated Case File:</span>
              <span className="text-sky-400 font-mono font-bold">{alert.caseId}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Incident Alert ID:</span>
              <span className="text-slate-200 font-mono">{alert.id}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Threat Sensor:</span>
              <span className="text-amber-300">Automated Financial & CDR Pattern Correlator</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Incident Forensics & Telemetry
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#07192C] p-3 rounded-xl border border-slate-800 font-mono">
              Suspicious activity burst detected across linked nodes. Multiple synchronized hops identified within short time interval exceeding standard operational threshold. Immediate tactical or financial countermeasures recommended.
            </p>
          </div>

          {/* Action Dispatch */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Dispatch Intercept Countermeasure
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => handleAction('Dispatch Rapid Surveillance Unit')}
                disabled={loadingAction || !!resolvedMessage}
                className="p-2.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Deploy Field Unit</span>
              </button>
              <button
                onClick={() => handleAction('Emergency Bank & Hawala Account Freeze')}
                disabled={loadingAction || !!resolvedMessage}
                className="p-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Enforce Asset Freeze</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#030e1c] flex items-center justify-between text-xs">
          <button
            onClick={() => handleAction('Mark Acknowledged & Resolved')}
            disabled={loadingAction || !!resolvedMessage}
            className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mark Alert Resolved</span>
          </button>
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

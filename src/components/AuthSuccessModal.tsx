import React from 'react';
import { CheckCircle2, ShieldCheck, UserCheck, Terminal, LogOut, ArrowRight, Activity, Database, Sparkles } from 'lucide-react';
import { UserSession } from '../types';
import { EmblemOfIndia } from './EmblemOfIndia';

interface AuthSuccessModalProps {
  session: UserSession;
  onSignOut: () => void;
}

export const AuthSuccessModal: React.FC<AuthSuccessModalProps> = ({ session, onSignOut }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0c1f38] border border-cyan-500/50 rounded-xl max-w-xl w-full p-6 text-white shadow-2xl shadow-cyan-950/80 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-700/80 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <EmblemOfIndia size={42} variant="gold" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  AUTHORIZATION VERIFIED
                </span>
                <span className="text-xs font-mono text-slate-400">SESSION #{session.token.slice(-6)}</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide mt-1">
                AI-Powered Criminal Network Analysis System
              </h2>
            </div>
          </div>
          <button
            onClick={onSignOut}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition"
            title="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* User clearance badge */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SECURITY CLEARANCE: {session.clearanceLevel}</span>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
              CONFIDENTIAL // MHA OPS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono mt-3 text-slate-300">
            <div>
              <span className="text-slate-500 block">AUTHORIZED IDENTIFIER:</span>
              <span className="text-white font-bold">{session.identifier}</span>
            </div>
            <div>
              <span className="text-slate-500 block">OFFICER / AGENT:</span>
              <span className="text-white font-bold">{session.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">DEPARTMENT / WING:</span>
              <span className="text-white">{session.department}</span>
            </div>
            <div>
              <span className="text-slate-500 block">COMMAND STATION:</span>
              <span className="text-white">{session.station}</span>
            </div>
          </div>
        </div>

        {/* Live system state */}
        <div className="space-y-2 mb-5 text-xs font-mono bg-slate-950/60 p-3.5 rounded border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Neural Graph Pipeline: ONLINE
            </span>
            <span>Latency: 14ms</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Database className="w-3.5 h-3.5" />
              CCTNS & FIU-IND Gateway: SYNCHRONIZED
            </span>
            <span>2.8M Active Edges</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              AI Pattern Detection Engine: ACTIVE (v4.2-IND)
            </span>
            <span>99.98% Confidence</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onSignOut}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium transition cursor-pointer"
          >
            ← Return to Login Portal
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Launching Criminal Intelligence Workbench with Active Case Dossiers...")}
              className="px-4 py-2 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-900/50 cursor-pointer"
            >
              <span>Launch Intelligence Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

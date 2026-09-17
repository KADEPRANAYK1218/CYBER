import React from 'react';
import { Settings, Shield, Key, Cpu, Server, CheckCircle2, Lock } from 'lucide-react';
import { UserSession } from '../../../types';

export const SettingsTabView: React.FC<{ session?: UserSession | null }> = ({ session }) => {
  return (
    <div className="space-y-4 select-none">
      <div className="bg-[#041628] rounded-xl border border-slate-800 p-4 shadow-xl">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-sky-400" />
          <span>System Security & Node Configuration</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Station security clearance, cryptographic authorization, and live microservice health telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Officer Clearance */}
        <div className="p-4 rounded-xl bg-[#041224] border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Active Station Credentials</span>
          </div>

          <div className="space-y-2 text-xs bg-[#07192C] p-3 rounded-lg border border-slate-800 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Investigator:</span>
              <span className="text-white font-bold">{session?.name || 'Investigator Sharma'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Clearance:</span>
              <span className="text-emerald-400 font-bold">{session?.clearanceLevel || 'LEVEL 3 (RESTRICTED)'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Department:</span>
              <span className="text-sky-300">{session?.department || 'Special Cell / Anti-Terrorism Squad'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Active Token:</span>
              <span className="text-amber-300">{session?.token || 'INV-889123'}</span>
            </div>
          </div>
        </div>

        {/* Backend & Node Telemetry */}
        <div className="p-4 rounded-xl bg-[#041224] border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Server className="w-4 h-4 text-sky-400" />
            <span>Backend Server Environment</span>
          </div>

          <div className="space-y-2 text-xs bg-[#07192C] p-3 rounded-lg border border-slate-800 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Server Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Online (:3000)
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-t border-slate-800/80">
              <span className="text-slate-400">Localhost Link:</span>
              <span className="text-sky-300 font-mono select-all">http://localhost:3000/</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-400">Network Link:</span>
              <span className="text-emerald-300 font-mono text-[11px] select-all truncate max-w-[240px]">
                {typeof window !== 'undefined' ? window.location.origin : 'https://ais-dev-...'}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-400">Container Network IP:</span>
              <span className="text-slate-300 font-mono">http://169.254.8.1:3000/</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">AI Inference Engine:</span>
              <span className="text-indigo-400 font-bold">Gemini 2.5 Flash API</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Protocol:</span>
              <span className="text-slate-200">Express + Vite SPA Middleware</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Encryption:</span>
              <span className="text-emerald-400 font-bold">AES-256 State Secrets Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

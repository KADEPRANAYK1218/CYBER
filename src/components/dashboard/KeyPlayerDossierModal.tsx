import React, { useEffect, useState } from 'react';
import { X, User, AlertTriangle, ShieldCheck, MapPin, Car, DollarSign, Radio, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';

interface KeyPlayerDossierModalProps {
  playerName: string;
  onClose: () => void;
  onViewInGraph?: (nodeId: string) => void;
}

export const KeyPlayerDossierModal: React.FC<KeyPlayerDossierModalProps> = ({
  playerName,
  onClose,
  onViewInGraph,
}) => {
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [locIssued, setLocIssued] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.getKeyPlayer(playerName).then((res) => {
      if (isMounted) {
        if (res) {
          setPlayer(res);
        } else {
          setPlayer({
            rank: 1,
            name: playerName,
            connections: 47,
            risk: 'HIGH',
            role: 'Apex Syndicate Kingpin',
            alias: 'The Shadow Architect',
            age: 44,
            nationality: 'Indian',
            centralityScore: 0.98,
            riskLevel: 'HIGH - PRIORITY TARGET',
            activeCases: ['#26189', '#26190'],
            knownLocations: ['Safehouse Noida Sector 62', 'BKC Commercial Hub Mumbai', 'Al Karama Terminal Dubai'],
            registeredVehicles: ['DL-01-AB-9821 (Toyota Fortuner)', 'UP-16-ZZ-1109 (Skoda Octavia)'],
            financialAssets: ['₹38 Crores offshore escrow', '3 shadow Hawala ledgers'],
            interceptionOrders: 'MHA Sec 5(2) Indian Telegraph Act Intercept Active',
          });
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [playerName]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#041628] border border-amber-500/40 rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100 select-none">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#061d36] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-base font-mono">
              #{player?.rank || 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  {player?.name || playerName}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                  {player?.risk || 'HIGH'} RISK
                </span>
                {player?.alias && (
                  <span className="text-xs text-amber-300 font-mono">"{player.alias}"</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{player?.role}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Eigen Centrality</span>
              <span className="text-sm font-bold text-sky-400 mt-0.5 block font-mono">
                {player?.centralityScore || 0.98}
              </span>
            </div>
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Direct Node Links</span>
              <span className="text-sm font-bold text-white mt-0.5 block font-mono">
                {player?.connections || 47} connections
              </span>
            </div>
            <div className="p-3 bg-[#07192C] rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Active Cases</span>
              <span className="text-sm font-bold text-amber-400 mt-0.5 block font-mono">
                {(player?.activeCases || ['#26189', '#26190']).join(', ')}
              </span>
            </div>
          </div>

          {/* Interception Order */}
          <div className="p-3 bg-red-950/40 rounded-xl border border-red-800/40 text-xs text-red-200 flex items-start gap-2.5">
            <Radio className="w-4 h-4 text-red-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="font-bold text-red-300 block">MHA Electronic Intercept Order</span>
              <span>{player?.interceptionOrders || 'Authorized under Section 5(2) Indian Telegraph Act for active wiretap and IMEI tracing.'}</span>
            </div>
          </div>

          {/* Known Safehouses / Locations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Correlated Geolocation Sighting Coordinates</span>
            </h4>
            <div className="space-y-1.5">
              {(player?.knownLocations || []).map((loc: string, idx: number) => (
                <div key={idx} className="p-2 bg-[#07192C] rounded-lg border border-slate-800 text-xs text-slate-200">
                  {loc}
                </div>
              ))}
            </div>
          </div>

          {/* Registered Vehicles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>Registered Convoy & Vehicle Licences</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(player?.registeredVehicles || []).map((veh: string, idx: number) => (
                <div key={idx} className="p-2 bg-[#07192C] rounded-lg border border-slate-800 text-xs text-slate-200 font-mono">
                  {veh}
                </div>
              ))}
            </div>
          </div>

          {/* Financial Assets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Flagged Financial Assets & Shadow Hawala Accounts</span>
            </h4>
            <div className="space-y-1.5">
              {(player?.financialAssets || []).map((asset: string, idx: number) => (
                <div key={idx} className="p-2 bg-[#07192C] rounded-lg border border-slate-800 text-xs text-emerald-300 font-mono">
                  {asset}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#030e1c] flex items-center justify-between text-xs">
          <button
            onClick={() => setLocIssued(true)}
            disabled={locIssued}
            className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              locIssued
                ? 'bg-emerald-700 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{locIssued ? 'Lookout Circular (LOC) Dispatched' : 'Issue Bureau of Immigration LOC'}</span>
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

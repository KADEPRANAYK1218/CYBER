import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Network, Shield, LogOut, Globe, Copy, Check, ExternalLink, Laptop, Server } from 'lucide-react';
import { EmblemOfIndia } from '../EmblemOfIndia';
import { AshokaChakra } from '../AshokaChakra';
import { IndiaGateGraphic } from './ArchitecturalGraphics';
import { UserSession } from '../../types';
import { api } from '../../services/api';

interface DashboardHeaderProps {
  onSearch?: (query: string) => void;
  onLogout?: () => void;
  session?: UserSession | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onSearch, onLogout, session }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showHostLinks, setShowHostLinks] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [networkInfo, setNetworkInfo] = useState<{
    localUrl: string;
    networkUrl: string;
    cloudDevUrl: string;
    port: number;
  }>({
    localUrl: 'http://localhost:3000/',
    networkUrl: 'http://0.0.0.0:3000/',
    cloudDevUrl: typeof window !== 'undefined' ? window.location.origin : 'https://ais-dev-2nvgp5u43crufuou7dh7w4-464102511624.asia-southeast1.run.app',
    port: 3000,
  });

  useEffect(() => {
    api.getNetworkInfo().then((info) => {
      if (info) {
        setNetworkInfo({
          localUrl: info.localUrl || 'http://localhost:3000/',
          networkUrl: info.networkUrl || 'http://0.0.0.0:3000/',
          cloudDevUrl: typeof window !== 'undefined' && window.location.origin.includes('http') ? window.location.origin : info.cloudDevUrl,
          port: info.port || 3000,
        });
      }
    });
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const displayName = session?.name || 'Investigator Sharma';
  const displayRole = session?.role === 'government-id' ? 'Government Official' : 'Analyst';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="relative w-full bg-[#031526] text-white border-b border-slate-800/80 overflow-hidden select-none z-30">
      {/* Background Decorative Sweeping Tricolor Silk Wave */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft India Map Silhouette in subtle dark navy */}
        <div
          className="absolute left-[34%] top-1/2 -translate-y-1/2 w-64 h-64 opacity-10 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(3,21,38,0) 70%)`,
          }}
        />

        {/* Sweeping Tricolor Ribbon crossing across right side */}
        <div className="absolute -right-16 -top-24 w-[620px] h-[220px] opacity-90 rotate-[-4deg] pointer-events-none">
          {/* Saffron Band */}
          <div className="w-full h-10 bg-gradient-to-r from-transparent via-[#FF7A00] to-[#FF8C1A] opacity-90 blur-[0.5px]" />
          {/* White Band */}
          <div className="w-full h-10 bg-gradient-to-r from-transparent via-white/95 to-slate-100 shadow-md shadow-black/20" />
          {/* Green Band */}
          <div className="w-full h-10 bg-gradient-to-r from-transparent via-[#138808] to-[#10B981] opacity-90 blur-[0.5px]" />
        </div>
      </div>

      <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* ====================================================
            LEFT: State Emblem + System Title
            ==================================================== */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="p-1 rounded-sm">
            <EmblemOfIndia size={50} variant="white" />
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              AI-Powered
            </span>
            <div className="flex items-center gap-1.5 text-lg sm:text-[22px] font-black tracking-tight leading-tight">
              <span className="text-[#FF7A00]">Criminal</span>
              <span className="text-[#10B981]">Network</span>
              <span className="text-white">Analysis System</span>
            </div>
            <span className="text-[11px] text-sky-200/80 font-medium tracking-wide">
              From Data to Actionable Intelligence
            </span>
          </div>
        </div>

        {/* ====================================================
            CENTER: Search Bar
            ==================================================== */}
        <div className="flex-1 max-w-xl mx-4 hidden lg:block">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search person, phone, vehicle, organization, location..."
                className="w-full h-10.5 pl-11 pr-11 bg-white/10 hover:bg-white/15 focus:bg-[#071F36] border border-white/20 focus:border-sky-400/80 rounded-full text-xs sm:text-[13px] text-white placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-400 transition backdrop-blur-md shadow-inner"
              />
              <button
                type="button"
                className="absolute right-2.5 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Graph Filter"
              >
                <Network className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* ====================================================
            RIGHT: Ashoka Chakra + India Gate + Slogan + Profile
            ==================================================== */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* Ashoka Chakra overlaying the white ribbon band */}
          <div className="hidden xl:flex items-center justify-center relative">
            <AshokaChakra size={48} className="drop-shadow-lg" />
          </div>

          {/* India Gate Silhouette */}
          <div className="hidden 2xl:flex items-center">
            <IndiaGateGraphic />
          </div>

          {/* Slogan */}
          <div className="hidden md:flex flex-col text-right pr-2">
            <span className="text-xs font-black tracking-wider text-white uppercase drop-shadow-sm">
              Safer India
            </span>
            <span className="text-xs font-bold text-slate-200 tracking-wide drop-shadow-sm">
              Stronger Tomorrow
            </span>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="w-5 h-0.5 bg-[#FF7A00] rounded-xs"></span>
              <span className="w-5 h-0.5 bg-[#10B981] rounded-xs"></span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-9 w-px bg-white/20 hidden sm:block"></div>

          {/* Localhost & Network Links Trigger */}
          <div className="relative">
            <button
              type="button"
              id="btn-network-host-links"
              onClick={() => setShowHostLinks(!showHostLinks)}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/50 hover:border-emerald-400 text-[11px] font-mono text-emerald-300 transition cursor-pointer shadow-sm"
              title="Click to view Localhost & Network access links"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">Local :3000</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-300 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Network</span>
              </span>
            </button>

            {/* Popover Dropdown for Local & Network Links */}
            {showHostLinks && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#041628] border border-slate-700/90 rounded-xl shadow-2xl p-4 text-xs z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>Server Access & Network Links</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                    ONLINE :3000
                  </span>
                </div>

                <div className="space-y-3 font-mono">
                  {/* Local Link */}
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                        <Laptop className="w-3.5 h-3.5 text-sky-400" />
                        Localhost Link
                      </span>
                      <span className="text-[10px] text-sky-400">Local Dev</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <code className="text-sky-300 text-xs truncate select-all font-mono">
                        {networkInfo.localUrl}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(networkInfo.localUrl, 'local')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] flex items-center gap-1 transition cursor-pointer shrink-0"
                      >
                        {copiedKey === 'local' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Network / Web URL */}
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                        <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        Network / Cloud URL
                      </span>
                      <span className="text-[10px] text-emerald-400">Public Live</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <code className="text-emerald-300 text-[11px] truncate select-all font-mono">
                        {networkInfo.cloudDevUrl}
                      </code>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopy(networkInfo.cloudDevUrl, 'network')}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] flex items-center gap-1 transition cursor-pointer"
                        >
                          {copiedKey === 'network' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-300">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <a
                          href={networkInfo.cloudDevUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="Open in new window"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Container IP */}
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Internal Network IP:</span>
                    <span className="text-slate-300 font-mono">{networkInfo.networkUrl}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Backend: Node Express + Vite (ESM)</span>
                  <button
                    onClick={() => setShowHostLinks(false)}
                    className="text-slate-400 hover:text-white transition cursor-pointer underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              id="btn-header-notifications"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                3
              </span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#091C30] border border-slate-700 rounded-lg shadow-2xl p-3 text-xs z-50 animate-in fade-in zoom-in-95">
                <div className="font-bold text-white mb-2 pb-1.5 border-b border-slate-700 flex justify-between">
                  <span>Priority Alerts</span>
                  <span className="text-red-400 font-mono">3 Unread</span>
                </div>
                <div className="space-y-2">
                  <div className="p-1.5 rounded bg-red-950/40 border border-red-500/30 text-red-200">
                    <p className="font-semibold">Suspicious financial transaction</p>
                    <span className="text-[10px] text-slate-400">Case #26190 · 2 hours ago</span>
                  </div>
                  <div className="p-1.5 rounded bg-amber-950/40 border border-amber-500/30 text-amber-200">
                    <p className="font-semibold">New high-risk connection detected</p>
                    <span className="text-[10px] text-slate-400">Case #26190 · 4 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Officer Avatar & Dropdown */}
          <div className="relative">
            <button
              type="button"
              id="btn-header-profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-800 p-0.5 ring-2 ring-white/30 overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Investigator Sharma"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white leading-tight">
                  {displayName}
                </div>
                <div className="text-[10px] text-slate-300 font-medium">{displayRole}</div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#081B30] border border-slate-700/80 rounded-xl shadow-2xl p-2 z-50 text-xs text-slate-200 animate-in fade-in">
                <div className="px-3 py-2 border-b border-slate-700/60">
                  <p className="font-bold text-white">{displayName}</p>
                  <p className="text-[11px] text-slate-400">
                    {session?.department || 'Special Crime Branch • Intelligence'}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 text-slate-200"
                  >
                    Officer ID: {session?.token || 'DL-88219'}
                  </button>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 text-slate-200"
                  >
                    {session?.clearanceLevel || 'Clearance: Level 3 (Restricted)'}
                  </button>
                </div>
                <div className="pt-1 border-t border-slate-700/60">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full text-left px-3 py-1.5 rounded text-red-400 hover:bg-red-950/40 font-semibold flex items-center justify-between"
                  >
                    <span>Sign Out to Login Page</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

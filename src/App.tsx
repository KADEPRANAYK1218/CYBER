import React, { useState } from 'react';
import {
  Network,
  Cpu,
  UserCheck,
  TrendingUp,
  LayoutDashboard,
  LogIn,
} from 'lucide-react';
import { UserSession } from './types';
import { EmblemOfIndia } from './components/EmblemOfIndia';
import { TricolorRibbon } from './components/TricolorRibbon';
import { NetworkGraph } from './components/NetworkGraph';
import { CaseFilesStack } from './components/CaseFilesStack';
import { LoginCard } from './components/LoginCard';
import { DashboardView } from './components/dashboard/DashboardView';
import carbonCopyBg from './assets/images/carbon_copy_bg_1788682579222.jpg';
import commandCenterBg from './assets/images/command_center_bg_1788682292622.jpg';

export default function App() {
  // Navigation view state: 'login' (default start) or 'dashboard'
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('login');
  const [activeSession, setActiveSession] = useState<UserSession | null>(null);

  const features = [
    {
      id: 'feature-1',
      icon: <Network className="w-5 h-5 text-sky-300" />,
      title: 'Discover Hidden Networks',
      description: 'Uncover complex criminal relationships',
    },
    {
      id: 'feature-2',
      icon: <Cpu className="w-5 h-5 text-sky-300" />,
      title: 'AI-Powered Pattern Detection',
      description: 'Identify unusual activities & risks',
    },
    {
      id: 'feature-3',
      icon: <UserCheck className="w-5 h-5 text-sky-300" />,
      title: 'Identify Key Individuals',
      description: 'Find influential players in the network',
    },
    {
      id: 'feature-4',
      icon: <TrendingUp className="w-5 h-5 text-sky-300" />,
      title: 'Generate Actionable Intelligence',
      description: 'Support faster, smarter investigations',
    },
  ];

  const handleLoginSuccess = (session: UserSession) => {
    setActiveSession(session);
    // Transition straight into the Live Dashboard
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setActiveSession(null);
    setCurrentView('login');
  };

  return (
    <div className="relative min-h-screen bg-[#020914] text-slate-100 font-sans">
      {/* Top Floating View Toggle Bar */}
      <div className="fixed top-3 right-4 z-50 select-none">
        <div className="flex items-center gap-1 p-1 bg-[#041427]/90 backdrop-blur-md rounded-full border border-sky-500/40 shadow-2xl">
          <button
            type="button"
            id="nav-toggle-login"
            onClick={() => setCurrentView('login')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'login'
                ? 'bg-[#FF7A00] text-white shadow-md shadow-orange-950/40'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login Portal</span>
          </button>

          <button
            type="button"
            id="nav-toggle-dashboard"
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-[#0E7A68] text-white shadow-md shadow-teal-950/40'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Live Dashboard</span>
          </button>
        </div>
      </div>

      {/* ====================================================
          VIEW 1: LIVE DASHBOARD (Exact match to Dashboard reference image)
          ==================================================== */}
      {currentView === 'dashboard' && (
        <DashboardView onSwitchToLogin={handleSignOut} session={activeSession} />
      )}

      {/* ====================================================
          VIEW 2: LOGIN PORTAL (Exact match to Login reference image)
          ==================================================== */}
      {currentView === 'login' && (
        <div className="relative w-screen min-h-screen lg:h-screen lg:overflow-hidden bg-[#030914] text-slate-100 flex flex-col lg:flex-row select-none">
          {/* Full-Screen Cinematic Command Center Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src={carbonCopyBg || commandCenterBg}
              alt="AI Criminal Network Analysis Command Center"
              className="w-full h-full object-cover object-center opacity-65 scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030914]/90 via-[#041226]/60 to-[#030d1d]/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020712] via-transparent to-[#040e1e]/60" />
          </div>

          {/* Dynamic Animated Network Graph */}
          <div className="absolute inset-0 lg:w-[60%] z-5 pointer-events-none">
            <NetworkGraph />
          </div>

          {/* LEFT SIDE: ~55% SCREEN WIDTH (Exact match to Login reference) */}
          <div className="w-full lg:w-[55%] h-auto lg:h-full relative flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 z-20 overflow-y-auto lg:overflow-visible">
            {/* Top-Left Emblem */}
            <div className="relative z-20 mb-2">
              <EmblemOfIndia size={62} variant="white" showText={true} />
            </div>

            {/* Main Title */}
            <div className="relative z-20 my-auto py-2">
              <div className="space-y-0.5 mb-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.12]">
                  <span className="text-white block font-sans">AI-Powered</span>
                  <span className="block font-sans">
                    <span className="text-[#FF7A00]">Criminal</span>{' '}
                    <span className="text-[#10B981]">Network</span>
                  </span>
                  <span className="text-white block font-sans">Analysis System</span>
                </h1>
              </div>

              <p className="text-sm md:text-[16px] text-[#DCE8F8] font-normal tracking-wide max-w-lg mb-6 lg:mb-7">
                From Data to Actionable Intelligence
              </p>

              {/* 4 Core Capability Highlights */}
              <div className="space-y-3.5 sm:space-y-4 max-w-xl">
                {features.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 group transition-transform duration-200 hover:translate-x-1"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#061e3d] border border-sky-400/60 flex items-center justify-center shadow-md shadow-sky-950/50 group-hover:border-sky-300 group-hover:bg-[#0a2e5c] transition-colors">
                      {item.icon}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-sm md:text-[15px] font-bold text-white tracking-wide leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-[13px] text-slate-300 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section: Case Files & Motto */}
            <div className="relative z-20 pt-4 mt-2">
              <CaseFilesStack />
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[11px] md:text-xs font-semibold font-sans tracking-[0.25em] text-[#94A3B8] uppercase">
                  SAFER &nbsp;INDIA &nbsp;&nbsp;|&nbsp;&nbsp; SMARTER &nbsp;INVESTIGATIONS &nbsp;&nbsp;|&nbsp;&nbsp; STRONGER &nbsp;NATION
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ~45% SCREEN WIDTH (Exact Floating Login Card) */}
          <div className="w-full lg:w-[45%] h-auto lg:h-full relative flex items-center justify-center p-5 sm:p-7 lg:p-9 z-20">
            <div className="absolute w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <LoginCard onLoginSuccess={handleLoginSuccess} />
          </div>

          {/* Tricolor Ribbon */}
          <TricolorRibbon />
        </div>
      )}
    </div>
  );
}

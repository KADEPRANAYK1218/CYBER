import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Share2,
  Cpu,
  AlertTriangle,
  FileSpreadsheet,
  Database,
  Users,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { ParliamentGraphic } from './ArchitecturalGraphics';

export type SidebarTab =
  | 'dashboard'
  | 'cases'
  | 'network-analysis'
  | 'ai-insights'
  | 'alerts'
  | 'reports'
  | 'data-sources'
  | 'communities'
  | 'settings';

interface DashboardSidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems: {
    id: SidebarTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cases', label: 'Cases', icon: FileText },
    { id: 'network-analysis', label: 'Network Analysis', icon: Share2 },
    { id: 'ai-insights', label: 'AI Insights', icon: Cpu, badge: 5 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: 3 },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'data-sources', label: 'Data Sources', icon: Database },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      id="dashboard-sidebar"
      className="w-60 bg-[#041628] border-r border-slate-800/80 flex flex-col justify-between p-3 select-none shrink-0"
    >
      {/* Navigation items list */}
      <nav className="space-y-1.5 pt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`w-full h-11 px-3.5 rounded-lg flex items-center justify-between text-xs sm:text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#0E7A68] text-white font-semibold shadow-md shadow-[#0E7A68]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {isActive ? (
                <ArrowRight className="w-3.5 h-3.5 text-white/80" />
              ) : item.badge ? (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Sidebar bottom: Indian Parliament House Line Art + Emblem Motto */}
      <div className="pt-6 pb-2 border-t border-slate-800/60">
        <ParliamentGraphic />
      </div>
    </aside>
  );
};

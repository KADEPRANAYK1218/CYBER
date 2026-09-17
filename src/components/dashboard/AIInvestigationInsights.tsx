import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Users,
  UserCheck,
  Search,
  MapPin,
  ArrowRight,
  User,
  Share2,
  AlertCircle,
  X,
} from 'lucide-react';

interface AIInvestigationInsightsProps {
  onSelectInsight?: (insight: any) => void;
  onViewAll?: () => void;
}

export const AIInvestigationInsights: React.FC<AIInvestigationInsightsProps> = ({
  onSelectInsight,
  onViewAll,
}) => {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const metrics = [
    { label: 'Communities Detected', value: '3', icon: Users },
    { label: 'High-Priority Nodes', value: '5', icon: UserCheck },
    { label: 'Anomalous Patterns', value: '4', icon: Search },
    { label: 'Significant Relationship Paths', value: '7', icon: MapPin },
  ];

  const cards = [
    {
      id: 'high-priority',
      title: 'High Priority',
      description: 'Person A has unusually high network centrality.',
      type: 'high-risk',
      icon: User,
      borderColor: 'border-red-500/40',
      bgColor: 'bg-red-950/25 hover:bg-red-950/40',
      iconColor: 'bg-red-500/20 text-red-400',
      titleColor: 'text-red-400',
      details:
        'Person A commands 47 direct links across 3 separate criminal cells, acting as the singular convergence apex for hawala laundering and vehicle dispatch.',
    },
    {
      id: 'network-bridge',
      title: 'Network Bridge',
      description: 'Person B connects two separate communities.',
      type: 'bridge',
      icon: Share2,
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-950/25 hover:bg-amber-950/40',
      iconColor: 'bg-amber-500/20 text-amber-400',
      titleColor: 'text-amber-400',
      details:
        'Person B functions as the critical liaison between the Delhi logistics syndicate and the Mumbai port clearing agency. Interception here isolates both rings.',
    },
    {
      id: 'financial-anomaly',
      title: 'Financial Anomaly',
      description: 'Unusual transaction chain detected.',
      type: 'anomaly',
      icon: AlertCircle,
      borderColor: 'border-sky-500/40',
      bgColor: 'bg-sky-950/25 hover:bg-sky-950/40',
      iconColor: 'bg-sky-500/20 text-sky-400',
      titleColor: 'text-sky-400',
      details:
        'Rapid dispersion of ₹14.8 Crores across 18 unverified escrow accounts within 14 minutes. Matches automated layering modus operandi.',
    },
  ];

  return (
    <div
      id="ai-insights-panel"
      className="bg-[#041224] rounded-xl border border-slate-800 shadow-xl p-4 flex flex-col justify-between select-none h-[440px]"
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-wide">
              AI Investigation Insights
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-950/80 text-sky-400 border border-sky-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by AI
            </span>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="text-[11px] font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer transition"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Top box: Analysis Complete */}
        <div className="mt-3 p-2.5 rounded-lg bg-[#06182F] border border-slate-700/60 flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-white">Analysis Complete</div>
            <div className="text-[10px] text-slate-400">Key patterns and connections identified</div>
          </div>
        </div>

        {/* 4 Summary stats */}
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-300 font-mono">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="flex items-center gap-2 py-0.5">
                <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-bold text-white text-[13px]">{m.value}</span>
                <span className="text-[11px] text-slate-400 font-sans truncate">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Detail insight cards */}
      <div className="space-y-2 mt-2">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => {
                if (onSelectInsight) {
                  onSelectInsight(card);
                } else {
                  setSelectedInsight(card.id);
                }
              }}
              className={`p-2.5 rounded-lg border ${card.borderColor} ${card.bgColor} flex items-center justify-between gap-2.5 transition-all duration-150 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-7 h-7 rounded-full ${card.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-bold ${card.titleColor} leading-tight`}>
                    {card.title}
                  </div>
                  <div className="text-[11px] text-slate-300 truncate mt-0.5">
                    {card.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white shrink-0">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          {(() => {
            const current = cards.find((c) => c.id === selectedInsight)!;
            return (
              <div className="bg-[#091D33] border border-sky-500/40 rounded-xl p-5 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95">
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded ${current.iconColor}`}>
                    AI INSIGHT
                  </span>
                  <h4 className="text-base font-bold text-white">{current.title}</h4>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{current.details}</p>
                <div className="mt-4 pt-3 border-t border-slate-700 flex justify-end">
                  <button
                    onClick={() => setSelectedInsight(null)}
                    className="px-4 py-1.5 bg-sky-700 hover:bg-sky-600 text-white rounded text-xs font-semibold"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

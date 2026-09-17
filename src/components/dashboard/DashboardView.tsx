import React, { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar, SidebarTab } from './DashboardSidebar';
import { StatCardsRow } from './StatCardsRow';
import { NetworkOverviewCanvas } from './NetworkOverviewCanvas';
import { AIInvestigationInsights } from './AIInvestigationInsights';
import { RecentCasesTable } from './RecentCasesTable';
import { NetworkCommunitiesCard } from './NetworkCommunitiesCard';
import { TopKeyPlayersList } from './TopKeyPlayersList';
import { RecentAlertsCard } from './RecentAlertsCard';
import { DashboardFooterBar } from './DashboardFooterBar';
import { UserSession, AlertItem } from '../../types';
import { api } from '../../services/api';

// Modal imports
import { StatDetailModal } from './StatDetailModal';
import { CaseDossierModal } from './CaseDossierModal';
import { KeyPlayerDossierModal } from './KeyPlayerDossierModal';
import { CommunityDossierModal } from './CommunityDossierModal';
import { AlertDetailModal } from './AlertDetailModal';
import { AIInsightDetailModal } from './AIInsightDetailModal';
import {
  CreateCaseModal,
  BuildNetworkModal,
  RunAIAnalysisModal,
  GenerateReportModal,
} from './QuickActionModals';

// Tab View imports
import { CasesTabView } from './tabs/CasesTabView';
import { AIInsightsTabView } from './tabs/AIInsightsTabView';
import { AlertsTabView } from './tabs/AlertsTabView';
import { DataSourcesTabView } from './tabs/DataSourcesTabView';
import { ReportsTabView } from './tabs/ReportsTabView';
import { CommunitiesTabView } from './tabs/CommunitiesTabView';
import { SettingsTabView } from './tabs/SettingsTabView';

interface DashboardViewProps {
  onSwitchToLogin: () => void;
  session?: UserSession | null;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSwitchToLogin, session }) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [searchNotification, setSearchNotification] = useState<string | null>(null);

  // Modal active states
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState<string | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<any | null>(null);
  const [activeQuickModal, setActiveQuickModal] = useState<
    'create-case' | 'build-network' | 'run-ai' | 'generate-report' | null
  >(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setSearchNotification(`Searching backend intelligence nodes for: "${query}"...`);
    const searchData = await api.search(query);
    const entityCount = searchData?.results?.entities?.length || 0;
    const caseCount = searchData?.results?.cases?.length || 0;
    setSearchNotification(
      `Search complete for "${query}": Found ${entityCount} linked nodes and ${caseCount} correlated cases.`
    );
    setTimeout(() => setSearchNotification(null), 4500);
  };

  const handleSelectNode = (node: any) => {
    if (node.type === 'person') {
      setSelectedPlayerName(node.label);
    } else {
      setSelectedInsight({
        title: `${node.label} (${node.type.toUpperCase()})`,
        type: node.type,
        details: `Identified intelligence node ${node.id} with ${node.connections} active connections. Tagged: ${node.syndicate || 'Under Surveillance'}. Positioned in live central topology.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#020A14] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* 1. Top Header */}
      <DashboardHeader onSearch={handleSearch} onLogout={onSwitchToLogin} session={session} />

      {/* Global Search Notification Banner */}
      {searchNotification && (
        <div className="bg-sky-900/90 text-sky-200 border-b border-sky-500/50 py-1.5 px-6 text-xs text-center font-mono animate-in fade-in">
          {searchNotification}
        </div>
      )}

      {/* 2. Main Body: Left Sidebar + Central Content Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Central Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-gradient-to-b from-[#020A14] via-[#030E1C] to-[#020812]">
          {/* Render Tab Views or Primary Dashboard */}
          {activeTab === 'cases' && (
            <CasesTabView
              onSelectCase={(caseId) => setSelectedCaseId(caseId)}
              onCreateNewCase={() => setActiveQuickModal('create-case')}
            />
          )}

          {activeTab === 'network-analysis' && (
            <div className="space-y-3">
              <div className="bg-[#041628] rounded-xl border border-slate-800 p-4 shadow-xl flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Full-Spectrum Topological Network Graph</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time inter-entity clustering, money trail hops, and suspect proximity triangulation.
                  </p>
                </div>
              </div>
              <NetworkOverviewCanvas onSelectNode={handleSelectNode} />
            </div>
          )}

          {activeTab === 'ai-insights' && (
            <AIInsightsTabView onExploreGraph={() => setActiveTab('network-analysis')} />
          )}

          {activeTab === 'alerts' && (
            <AlertsTabView onSelectCase={(caseId) => setSelectedCaseId(caseId)} />
          )}

          {activeTab === 'reports' && <ReportsTabView />}

          {activeTab === 'data-sources' && <DataSourcesTabView />}

          {activeTab === 'communities' && (
            <CommunitiesTabView onSelectCommunity={(id) => setSelectedCommunityId(id)} />
          )}

          {activeTab === 'settings' && <SettingsTabView session={session} />}

          {activeTab === 'dashboard' && (
            <>
              {/* Row 1: 6 Stat Cards */}
              <StatCardsRow onSelectStat={(statKey) => setSelectedStat(statKey)} />

              {/* Row 2: Split View - Network Canvas (Left) + AI Investigation Insights (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
                {/* Left 8 Cols: Interactive Network Overview */}
                <div className="lg:col-span-8">
                  <NetworkOverviewCanvas onSelectNode={handleSelectNode} />
                </div>

                {/* Right 4 Cols: AI Investigation Insights */}
                <div className="lg:col-span-4">
                  <AIInvestigationInsights
                    onSelectInsight={(insight) => setSelectedInsight(insight)}
                    onViewAll={() => setActiveTab('ai-insights')}
                  />
                </div>
              </div>

              {/* Row 3: 4 Bottom Analytics Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
                <RecentCasesTable
                  onSelectCase={(caseId) => setSelectedCaseId(caseId)}
                  onViewAll={() => setActiveTab('cases')}
                />
                <NetworkCommunitiesCard
                  onSelectCommunity={(commId) => setSelectedCommunityId(commId)}
                  onViewAll={() => setActiveTab('communities')}
                />
                <TopKeyPlayersList
                  onSelectPlayer={(name) => setSelectedPlayerName(name)}
                  onViewAll={() => setSelectedStat('persons-identified')}
                />
                <RecentAlertsCard
                  onSelectAlert={(alt) => setSelectedAlert(alt)}
                  onViewAll={() => setActiveTab('alerts')}
                />
              </div>

              {/* Row 4: Bottom Quick Actions & Ask AI Investigator Bar */}
              <div className="pt-1">
                <DashboardFooterBar onOpenModal={(modal) => setActiveQuickModal(modal)} />
              </div>
            </>
          )}
        </main>
      </div>

      {/* ====================================================
          MODALS LAYER: Interactive inspection for EVERY element
          ==================================================== */}

      {/* 1. Stat Card Records Inspection Modal */}
      {selectedStat && (
        <StatDetailModal
          statType={selectedStat}
          onClose={() => setSelectedStat(null)}
          onSelectCase={(caseId) => {
            setSelectedStat(null);
            setSelectedCaseId(caseId);
          }}
        />
      )}

      {/* 2. Case Dossier Modal */}
      {selectedCaseId && (
        <CaseDossierModal
          caseId={selectedCaseId}
          onClose={() => setSelectedCaseId(null)}
        />
      )}

      {/* 3. Key Player Suspect Dossier Modal */}
      {selectedPlayerName && (
        <KeyPlayerDossierModal
          playerName={selectedPlayerName}
          onClose={() => setSelectedPlayerName(null)}
        />
      )}

      {/* 4. Community Syndicate Dossier Modal */}
      {selectedCommunityId && (
        <CommunityDossierModal
          communityId={selectedCommunityId}
          onClose={() => setSelectedCommunityId(null)}
        />
      )}

      {/* 5. Alert Forensics Modal */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onInspectCase={(caseId) => {
            setSelectedAlert(null);
            setSelectedCaseId(caseId);
          }}
        />
      )}

      {/* 6. AI Insight Detail Modal */}
      {selectedInsight && (
        <AIInsightDetailModal
          insight={selectedInsight}
          onClose={() => setSelectedInsight(null)}
        />
      )}

      {/* 7. Quick Action Modals */}
      {activeQuickModal === 'create-case' && (
        <CreateCaseModal
          onClose={() => setActiveQuickModal(null)}
          onCreated={() => {
            setActiveQuickModal(null);
            setActiveTab('cases');
          }}
        />
      )}

      {activeQuickModal === 'build-network' && (
        <BuildNetworkModal onClose={() => setActiveQuickModal(null)} />
      )}

      {activeQuickModal === 'run-ai' && (
        <RunAIAnalysisModal onClose={() => setActiveQuickModal(null)} />
      )}

      {activeQuickModal === 'generate-report' && (
        <GenerateReportModal onClose={() => setActiveQuickModal(null)} />
      )}
    </div>
  );
};

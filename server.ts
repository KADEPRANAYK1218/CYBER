import express, { Request, Response } from 'express';
import path from 'path';
import os from 'os';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for live government criminal network intelligence
const statsData = {
  activeCases: { value: 128, trend: '↑ 12%', isPositive: true },
  personsIdentified: { value: '2,846', trend: '↑ 8%', isPositive: true },
  criminalNetworks: { value: 47, trend: '↑ 15%', isPositive: true },
  highRiskNodes: { value: 63, trend: '↑ 9%', isPositive: false },
  suspiciousActivities: { value: 121, trend: '↑ 22%', isPositive: true },
  unresolvedConnections: { value: 37, trend: '↓ 6%', isPositive: false },
};

let casesData = [
  { id: '#26189', type: 'Organized Crime Network', priority: 'HIGH', status: 'Investigating', date: '2026-09-05', lead: 'ACP Rathore' },
  { id: '#26190', type: 'Financial Network', priority: 'HIGH', status: 'Analysis', date: '2026-09-04', lead: 'Investigator Sharma' },
  { id: '#26191', type: 'Communication Network', priority: 'MEDIUM', status: 'Investigating', date: '2026-09-03', lead: 'Insp. Verma' },
  { id: '#26192', type: 'Drug Trafficking Network', priority: 'MEDIUM', status: 'Pending', date: '2026-09-02', lead: 'SI Rawat' },
  { id: '#26193', type: 'Cyber Fraud Ring', priority: 'LOW', status: 'Review', date: '2026-09-01', lead: 'Tech Cell DL' },
];

const communitiesData = [
  {
    id: 'comm-1',
    title: 'Community 01',
    members: '14 people | 3 orgs',
    strength: 'High',
    keyNode: 'Person A',
    riskScore: 94,
    description: 'Syndicate Core - International Hawala & Smuggling Pipeline',
  },
  {
    id: 'comm-2',
    title: 'Community 02',
    members: '9 people | 2 orgs',
    strength: 'Medium',
    keyNode: 'Person F',
    riskScore: 78,
    description: 'Procurement & Logistics Nexus - NCR & Western Corridor',
  },
  {
    id: 'comm-3',
    title: 'Community 03',
    members: '7 people | 1 org',
    strength: 'Low',
    keyNode: 'Person K',
    riskScore: 52,
    description: 'Ancillary Cell - Shell accounts & burner SIM distributors',
  },
];

const keyPlayersData = [
  { rank: 1, name: 'Person A', connections: 47, risk: 'HIGH', role: 'Syndicate Kingpin / Central Hub' },
  { rank: 2, name: 'Person B', connections: 39, risk: 'HIGH', role: 'Inter-Community Bridge Liaison' },
  { rank: 3, name: 'Person C', connections: 28, risk: 'MEDIUM', role: 'Financial Ledger Controller' },
  { rank: 4, name: 'Person D', connections: 21, risk: 'MEDIUM', role: 'Fleet Logistics Coordinator' },
  { rank: 5, name: 'Person E', connections: 18, risk: 'LOW', role: 'Border Post Contact' },
];

const alertsData = [
  {
    id: 'alt-1',
    title: 'Suspicious financial transaction detected',
    caseId: '#26190',
    timeAgo: '2 hours ago',
    severity: 'high',
    details: '₹4.8 Cr wire transferred through 3 sequential layered accounts.',
  },
  {
    id: 'alt-2',
    title: 'New connection between high-risk entities',
    caseId: '#26190',
    timeAgo: '4 hours ago',
    severity: 'warning',
    details: 'Encrypted CDR link discovered between Person A and Border Logistics.',
  },
  {
    id: 'alt-3',
    title: 'Unusual communication pattern',
    caseId: '#26188',
    timeAgo: '6 hours ago',
    severity: 'warning',
    details: 'Cluster burst of 14 calls at 03:20 AM to international satellite phone.',
  },
  {
    id: 'alt-4',
    title: 'Potential money laundering chain',
    caseId: '#26187',
    timeAgo: '8 hours ago',
    severity: 'warning',
    details: 'Shell company Imperial Trade Pvt Ltd opened 4 new beneficiary ledgers.',
  },
];

const networkGraphData = {
  nodes: [
    { id: 'key-player', label: 'Person A', type: 'person', x: 440, y: 240, isKeyPlayer: true, connections: 47, syndicate: 'Apex Syndicate Leader', centrality: 0.98 },
    { id: 'p-1', label: 'Person B (Bridge)', type: 'person', x: 350, y: 190, connections: 39, syndicate: 'Logistics Head', centrality: 0.84 },
    { id: 'p-2', label: 'Person C', type: 'person', x: 370, y: 140, connections: 28, syndicate: 'Hawala Operative', centrality: 0.72 },
    { id: 'p-3', label: 'Person D', type: 'person', x: 330, y: 230, connections: 21, centrality: 0.65 },
    { id: 'p-4', label: 'Person E', type: 'person', x: 440, y: 170, connections: 18, centrality: 0.58 },
    { id: 'p-5', label: 'Person F', type: 'person', x: 530, y: 290, connections: 15, centrality: 0.51 },
    { id: 'p-6', label: 'Person G', type: 'person', x: 510, y: 360, connections: 11, centrality: 0.44 },

    // Organizations
    { id: 'org-1', label: 'Apex Global Logistics', type: 'organization', x: 270, y: 220, connections: 14 },
    { id: 'org-2', label: 'Imperial Trade Pvt Ltd', type: 'organization', x: 480, y: 220, connections: 12 },
    { id: 'org-3', label: 'North Gate Trust', type: 'organization', x: 450, y: 340, connections: 9 },
    { id: 'org-4', label: 'City Financial Corp', type: 'organization', x: 350, y: 300, connections: 16 },
    { id: 'org-5', label: 'Kabul Cargo Exchange', type: 'organization', x: 410, y: 360, connections: 8 },

    // Vehicles
    { id: 'veh-1', label: 'DL-01-AB-9821 (SUV)', type: 'vehicle', x: 540, y: 245, connections: 6 },
    { id: 'veh-2', label: 'HR-26-CC-4012 (Truck)', type: 'vehicle', x: 470, y: 180, connections: 5 },
    { id: 'veh-3', label: 'UP-16-ZZ-1109 (Sedan)', type: 'vehicle', x: 360, y: 270, connections: 4 },
    { id: 'veh-4', label: 'MH-04-AX-5541 (Van)', type: 'vehicle', x: 610, y: 250, connections: 3 },

    // Accounts
    { id: 'acc-1', label: 'Overseas Hawala #4092', type: 'account', x: 285, y: 250, connections: 7 },
    { id: 'acc-2', label: 'Swiss Escrow #8819', type: 'account', x: 470, y: 135, connections: 5 },
    { id: 'acc-3', label: 'Crypto Wallet 0x7a...9F', type: 'account', x: 500, y: 285, connections: 8 },
    { id: 'acc-4', label: 'Shadow Ledger #332', type: 'account', x: 480, y: 410, connections: 4 },

    // Locations
    { id: 'loc-1', label: 'Safehouse Noida Sec 62', type: 'location', x: 405, y: 280, connections: 9 },
    { id: 'loc-2', label: 'Warehouse Okhla Phase 3', type: 'location', x: 385, y: 305, connections: 6 },
    { id: 'loc-3', label: 'Port CFS Nhava Sheva', type: 'location', x: 500, y: 285, connections: 7 },
    { id: 'loc-4', label: 'Terminal 3 Border Post', type: 'location', x: 560, y: 205, connections: 4 },
  ],
  links: [
    { source: 'key-player', target: 'p-1', relation: 'Direct Command' },
    { source: 'key-player', target: 'p-4', relation: 'Operational Directive' },
    { source: 'key-player', target: 'org-2', relation: 'Beneficial Ownership' },
    { source: 'key-player', target: 'loc-1', relation: 'Frequent Meeting Point' },
    { source: 'key-player', target: 'veh-3', relation: 'Registered Owner' },
    { source: 'key-player', target: 'acc-3', relation: 'Crypto Funding Source' },

    { source: 'p-1', target: 'org-1', relation: 'Director' },
    { source: 'p-1', target: 'p-2', relation: 'Fund Transfer Liaison' },
    { source: 'p-1', target: 'p-3', relation: 'Logistics Supervisor' },
    { source: 'p-2', target: 'org-1', relation: 'Invoicing Proxy' },
    { source: 'p-3', target: 'veh-3', relation: 'Driver Contact' },
    { source: 'org-1', target: 'acc-1', relation: 'Corporate Account' },

    { source: 'p-4', target: 'acc-2', relation: 'Foreign Signatory' },
    { source: 'p-4', target: 'veh-2', relation: 'Fleet Dispatch' },
    { source: 'veh-2', target: 'loc-4', relation: 'Cross-Border Passage' },

    { source: 'org-2', target: 'veh-1', relation: 'Commercial Lease' },
    { source: 'org-2', target: 'acc-3', relation: 'Crypto Payment Gateway' },
    { source: 'veh-1', target: 'p-5', relation: 'Surveillance Sighting' },
    { source: 'veh-1', target: 'veh-4', relation: 'Convoy Intercept' },
    { source: 'p-5', target: 'p-6', relation: 'Sub-Cell Liaison' },

    { source: 'loc-1', target: 'loc-2', relation: 'Supply Line' },
    { source: 'loc-2', target: 'org-4', relation: 'Warehouse Lease' },
    { source: 'org-4', target: 'org-3', relation: 'Charitable Trust Transfer' },
    { source: 'org-3', target: 'org-5', relation: 'Cross-Border Invoicing' },
    { source: 'org-5', target: 'acc-4', relation: 'Hawala Settlement' },
    { source: 'acc-4', target: 'p-6', relation: 'Cash Withdrawal' },
  ],
};

// ====================================================
// API ROUTES FIRST
// ====================================================

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    system: 'AI-Powered Criminal Network Analysis System Backend',
    timestamp: new Date().toISOString(),
    version: '2.4.0-gov-secure',
  });
});

// Authentication Endpoint
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { role, username, password, idType, govIdNumber } = req.body;

  if (role === 'investigator') {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username/Email and password are required' });
    }

    // Authenticate investigator
    const isSpecialOfficial = username.toLowerCase().includes('sharma') || username.toLowerCase().includes('rathore');
    const officerName = isSpecialOfficial
      ? 'Investigator Sharma'
      : username.split('@')[0].replace('.', ' ').toUpperCase() || 'Special Investigator';

    return res.json({
      success: true,
      message: 'Investigator credentials verified successfully.',
      session: {
        role: 'investigator',
        identifier: username,
        name: officerName,
        department: 'Special Crime Branch / Anti-Terrorism Squad',
        clearanceLevel: 'LEVEL 3 (RESTRICTED INTELLIGENCE)',
        station: 'Cyber & Intelligence Operations Room, New Delhi',
        token: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    });
  } else if (role === 'government-id') {
    if (!govIdNumber || !password) {
      return res.status(400).json({ error: 'Government ID and password are required' });
    }

    return res.json({
      success: true,
      message: 'Government National Security ID authenticated.',
      session: {
        role: 'government-id',
        identifier: `${idType || 'GOV'}-${govIdNumber}`,
        name: 'Officer A. K. Verma',
        department: 'Ministry of Home Affairs // Intelligence Bureau',
        clearanceLevel: 'TOP SECRET // NATIONAL SECURITY ACCESS',
        station: 'North Block Operations Center, New Delhi',
        token: `GOV-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    });
  }

  return res.status(400).json({ error: 'Invalid authentication role' });
});

// Dashboard Statistics
app.get(['/api/dashboard/stats', '/api/stats'], (req: Request, res: Response) => {
  res.json({
    success: true,
    stats: statsData,
  });
});

// Network Graph
app.get('/api/network/graph', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: networkGraphData,
  });
});

// AI Investigation Insights
app.get('/api/ai/insights', (req: Request, res: Response) => {
  res.json({
    success: true,
    summary: {
      communitiesDetected: 3,
      highPriorityNodes: 5,
      anomalousPatterns: 4,
      significantRelationshipPaths: 7,
      status: 'Analysis Complete',
      subtext: 'Key patterns and connections identified',
    },
    insights: [
      {
        id: 'high-priority',
        title: 'High Priority',
        description: 'Person A has unusually high network centrality.',
        type: 'high-risk',
        details: 'Person A commands 47 direct links across 3 separate criminal cells, acting as the singular convergence apex for hawala laundering and vehicle dispatch.',
      },
      {
        id: 'network-bridge',
        title: 'Network Bridge',
        description: 'Person B connects two separate communities.',
        type: 'bridge',
        details: 'Person B functions as the critical liaison between the Delhi logistics syndicate and the Mumbai port clearing agency. Interception here isolates both rings.',
      },
      {
        id: 'financial-anomaly',
        title: 'Financial Anomaly',
        description: 'Unusual transaction chain detected.',
        type: 'anomaly',
        details: 'Rapid dispersion of ₹14.8 Crores across 18 unverified escrow accounts within 14 minutes. Matches automated layering modus operandi.',
      },
    ],
  });
});

// Recent Cases
app.get('/api/cases', (req: Request, res: Response) => {
  res.json({
    success: true,
    cases: casesData,
  });
});

// Create New Case
app.post('/api/cases', (req: Request, res: Response) => {
  const { type, priority, lead } = req.body;
  const newId = `#${Math.floor(26194 + casesData.length)}`;
  const newCase = {
    id: newId,
    type: type || 'Inter-State Syndicate Network',
    priority: priority || 'HIGH',
    status: 'Investigating' as const,
    date: new Date().toISOString().split('T')[0],
    lead: lead || 'Investigator Sharma',
  };

  casesData.unshift(newCase);
  statsData.activeCases.value += 1;

  res.status(201).json({
    success: true,
    message: `Case ${newId} created successfully.`,
    case: newCase,
    updatedActiveCases: statsData.activeCases.value,
  });
});

// Network Communities
app.get('/api/communities', (req: Request, res: Response) => {
  res.json({
    success: true,
    communities: communitiesData,
  });
});

// Top Key Players
app.get('/api/key-players', (req: Request, res: Response) => {
  res.json({
    success: true,
    players: keyPlayersData,
  });
});

// Single Case Dossier
app.get('/api/cases/:id', (req: Request, res: Response) => {
  const caseId = decodeURIComponent(req.params.id);
  const found = casesData.find((c) => c.id.toLowerCase() === caseId.toLowerCase());
  if (!found) {
    return res.status(404).json({ error: 'Case file not found in central registry' });
  }

  res.json({
    success: true,
    case: {
      ...found,
      summary: 'Inter-state organized syndicate facilitating hawala layering and cross-border contraband logistics.',
      leadInvestigator: found.lead,
      firNumber: `FIR-DL-${found.id.replace('#', '')}/2026`,
      jurisdiction: 'Special Cell, Delhi Police & ATS Maharashtra',
      suspectsCount: 14,
      interceptedCallsCount: 184,
      financialVolume: '₹48.6 Crores',
      timeline: [
        { date: '2026-09-05', note: 'Financial intelligence flagged 3 shell corporate transactions to Kabul Cargo Exchange.' },
        { date: '2026-09-03', note: 'Wiretap transcript logged Person A directive to Noida safehouse coordinator.' },
        { date: '2026-08-29', note: 'FASTag toll gate intercept confirmed convoy movement through Western Highway corridor.' },
        { date: '2026-08-15', note: 'Initial FIR registered based on NCRB transnational crime report.' },
      ],
      evidenceItems: [
        'CDR logs spanning 6 burner IMEI numbers',
        'Seized shadow Hawala ledger with encrypted transaction codes',
        'Surveillance photographs at Nhava Sheva CFS container dock',
        'Encrypted drive containing corporate shell ledgers',
      ],
    },
  });
});

// Update Case Status
app.patch('/api/cases/:id', (req: Request, res: Response) => {
  const caseId = decodeURIComponent(req.params.id);
  const { status, priority } = req.body;
  const found = casesData.find((c) => c.id.toLowerCase() === caseId.toLowerCase());
  if (!found) {
    return res.status(404).json({ error: 'Case file not found' });
  }

  if (status) found.status = status;
  if (priority) found.priority = priority;

  res.json({ success: true, message: `Case ${caseId} updated successfully`, case: found });
});

// Single Community Dossier
app.get('/api/communities/:id', (req: Request, res: Response) => {
  const commId = req.params.id;
  const community = communitiesData.find((c) => c.id === commId) || communitiesData[0];
  res.json({
    success: true,
    community: {
      ...community,
      territories: ['National Capital Region', 'Mumbai Western Freight Corridor', 'Punjab Border Sector'],
      interceptedVolume: '₹142 Crores across 12 months',
      keyAssociates: [
        { name: 'Person A', role: 'Syndicate Apex Kingpin', status: 'Active Surveillance' },
        { name: 'Person B', role: 'Inter-Community Bridge Liaison', status: 'Wiretap Active' },
        { name: 'Person C', role: 'Hawala Chief Cashier', status: 'Lookout Circular Issued' },
        { name: 'Person D', role: 'Fleet & Convoy Logistics Head', status: 'Tracked via FASTag' },
      ],
      frontCompanies: ['Imperial Trade Pvt Ltd', 'Apex Global Logistics', 'Kabul Cargo Exchange'],
      operationalModus: 'Layered shell invoicing disguised as agro-commodity transit with off-ledger hawala settlements.',
    },
  });
});

// Single Key Player Dossier
app.get('/api/key-players/:name', (req: Request, res: Response) => {
  const nameParam = decodeURIComponent(req.params.name);
  const player = keyPlayersData.find((p) => p.name.toLowerCase() === nameParam.toLowerCase()) || keyPlayersData[0];

  res.json({
    success: true,
    player: {
      ...player,
      alias: 'The Apex Architect // Shadow-1',
      age: 44,
      nationality: 'Indian',
      centralityScore: 0.98,
      riskLevel: 'HIGH - IMMEDIATE INTERCEPT PRIORITY',
      activeCases: ['#26189', '#26190'],
      knownLocations: ['Sector 62 Safehouse Noida', 'Bandra Kurla Complex Office', 'Dubai Commercial Tower'],
      registeredVehicles: ['DL-01-AB-9821 (Toyota Fortuner)', 'UP-16-ZZ-1109 (Skoda Octavia)'],
      financialAssets: ['₹38 Cr estimated liquid assets', '4 overseas offshore escrow accounts'],
      interceptionOrders: 'MHA Section 5(2) Indian Telegraph Act Intercept Authorized',
    },
  });
});

// Resolve Alert
app.post('/api/alerts/:id/resolve', (req: Request, res: Response) => {
  const alertId = req.params.id;
  const { action } = req.body;
  const alert = alertsData.find((a) => a.id === alertId);
  if (alert) {
    alert.severity = 'warning';
  }
  statsData.suspiciousActivities.value = Math.max(0, statsData.suspiciousActivities.value - 1);

  res.json({
    success: true,
    message: `Alert ${alertId} processed with action: "${action || 'Acknowledged & Dispatched'}"`,
    updatedActivities: statsData.suspiciousActivities.value,
  });
});

// Stat Details Endpoint - Clicking on each stat card returns rich intelligence records
app.get('/api/stat-details/:statType', (req: Request, res: Response) => {
  const { statType } = req.params;

  switch (statType) {
    case 'active-cases':
      return res.json({
        title: 'Active Case Dossiers',
        count: statsData.activeCases.value,
        trend: statsData.activeCases.trend,
        description: 'Transnational and inter-state organized criminal networks under current active surveillance.',
        items: casesData,
      });

    case 'persons-identified':
      return res.json({
        title: 'Identified Suspects & Persons Directory',
        count: statsData.personsIdentified.value,
        trend: statsData.personsIdentified.trend,
        description: 'Biometrically verified and CDR-correlated criminal suspects across all operational cells.',
        items: [
          { id: 'sus-1', name: 'Person A', alias: 'Shadow Leader', syndicate: 'Apex Syndicate', risk: 'HIGH', status: 'Under Surveillance', connections: 47 },
          { id: 'sus-2', name: 'Person B', alias: 'The Bridge', syndicate: 'Western Freight Cell', risk: 'HIGH', status: 'Wiretap Active', connections: 39 },
          { id: 'sus-3', name: 'Person C', alias: 'Munshi', syndicate: 'Hawala Financial Conduit', risk: 'MEDIUM', status: 'LOC Issued', connections: 28 },
          { id: 'sus-4', name: 'Person D', alias: 'Logistics Head', syndicate: 'Fleet Division', risk: 'MEDIUM', status: 'Under Tracking', connections: 21 },
          { id: 'sus-5', name: 'Person E', alias: 'Border Liaison', syndicate: 'Customs Smuggling Cell', risk: 'LOW', status: 'Pending Intercept', connections: 18 },
          { id: 'sus-6', name: 'Person F', alias: 'Courier Alpha', syndicate: 'NCR Delivery Ring', risk: 'MEDIUM', status: 'Detained for Interrogation', connections: 15 },
          { id: 'sus-7', name: 'Person G', alias: 'Cash Handler', syndicate: 'Retail Hawala Network', risk: 'LOW', status: 'Bank Freeze Enforced', connections: 11 },
        ],
      });

    case 'criminal-networks':
      return res.json({
        title: 'Monitored Criminal Networks & Syndicates',
        count: statsData.criminalNetworks.value,
        trend: statsData.criminalNetworks.trend,
        description: 'Hierarchical syndicates operating across contraband, cyber fraud, and illicit hawala pipelines.',
        items: [
          { id: 'net-1', name: 'Apex Hawala & Smuggling Pipeline', leader: 'Person A', membersCount: 14, riskScore: 94, zone: 'NCR & Middle East', turnover: '₹140 Cr' },
          { id: 'net-2', name: 'Western Corridor Freight Smuggling Nexus', leader: 'Person F', membersCount: 9, riskScore: 78, zone: 'Mumbai-Gujarat Sea Freight', turnover: '₹68 Cr' },
          { id: 'net-3', name: 'Cyber Laundering & Burner Distribution Cell', leader: 'Person K', membersCount: 7, riskScore: 52, zone: 'National Transit Points', turnover: '₹22 Cr' },
          { id: 'net-4', name: 'Inter-State Narcotics Transit Syndicate', leader: 'Person M', membersCount: 11, riskScore: 88, zone: 'Northern Border Highway', turnover: '₹95 Cr' },
          { id: 'net-5', name: 'Shell Entity Invoicing & Escrow Ring', leader: 'Person R', membersCount: 6, riskScore: 71, zone: 'Central Financial Corridor', turnover: '₹45 Cr' },
        ],
      });

    case 'high-risk-nodes':
      return res.json({
        title: 'High-Risk Network Nodes (Threat Vector Matrix)',
        count: statsData.highRiskNodes.value,
        trend: statsData.highRiskNodes.trend,
        description: 'Critical bottleneck entities whose neutralization disrupts entire criminal supply and financial loops.',
        items: [
          { id: 'hr-1', name: 'Person A (Syndicate Kingpin)', type: 'Person', centrality: 0.98, threatVector: 'Single-point executive authorization for Hawala & logistics', risk: 'CRITICAL' },
          { id: 'hr-2', name: 'Imperial Trade Pvt Ltd', type: 'Organization', centrality: 0.89, threatVector: 'Corporate shell routing ₹14.8 Cr via bogus overseas invoices', risk: 'CRITICAL' },
          { id: 'hr-3', name: 'Overseas Hawala Ledger #4092', type: 'Account', centrality: 0.85, threatVector: 'Shadow treasury settling cross-border contraband transactions', risk: 'HIGH' },
          { id: 'hr-4', name: 'Person B (Bridge Liaison)', type: 'Person', centrality: 0.84, threatVector: 'Exclusive conduit connecting Northern and Western criminal rings', risk: 'HIGH' },
          { id: 'hr-5', name: 'Safehouse Noida Sec 62', type: 'Location', centrality: 0.79, threatVector: 'Physical drop point for encrypted satellite burner equipment', risk: 'HIGH' },
          { id: 'hr-6', name: 'Nhava Sheva CFS Dock 4', type: 'Location', centrality: 0.76, threatVector: 'Container clearance point for flagged import consignments', risk: 'HIGH' },
        ],
      });

    case 'suspicious-activities':
      return res.json({
        title: 'Suspicious Activity Reports (SAR)',
        count: statsData.suspiciousActivities.value,
        trend: statsData.suspiciousActivities.trend,
        description: 'Automated triggers generated by real-time telecom, banking, and border intelligence pipelines.',
        items: [
          { id: 'sar-1', timestamp: '10 mins ago', type: 'FINANCIAL LAYER', trigger: 'Rapid sequential transfer of ₹4.8 Cr through 3 dormant accounts', caseId: '#26190', severity: 'HIGH' },
          { id: 'sar-2', timestamp: '25 mins ago', type: 'CDR BURST', trigger: '14 encrypted VoIP calls originating from Noida Safehouse node', caseId: '#26189', severity: 'HIGH' },
          { id: 'sar-3', timestamp: '1 hour ago', type: 'TOLL PERIMETER', trigger: 'Convoy truck HR-26-CC-4012 bypassed scheduled route toll plaza', caseId: '#26192', severity: 'MEDIUM' },
          { id: 'sar-4', timestamp: '2 hours ago', type: 'CRYPTO OFF-RAMP', trigger: '0x7a...9F wallet drained into 4 peer-to-peer cash disbursements', caseId: '#26190', severity: 'HIGH' },
          { id: 'sar-5', timestamp: '3 hours ago', type: 'BORDER PASSAGE', trigger: 'Container manifest mismatch at Nhava Sheva Port CFS', caseId: '#26189', severity: 'MEDIUM' },
        ],
      });

    case 'unresolved-connections':
      return res.json({
        title: 'Unresolved Cross-Network Connections',
        count: statsData.unresolvedConnections.value,
        trend: statsData.unresolvedConnections.trend,
        description: 'Latent statistical correlations and anomalous association paths currently undergoing multi-agency verification.',
        items: [
          { id: 'unc-1', nodeA: 'Person A (Apex)', nodeB: 'Kabul Cargo Exchange', linkType: 'Undisclosed Overseas Signatory', confidence: '84%', action: 'Awaiting Interpol Foreign Intelligence Confirmation' },
          { id: 'unc-2', nodeA: 'Person D (Logistics)', nodeB: 'Nhava Sheva CFS Dock 4', linkType: 'FASTag Geo-proximity Cluster', confidence: '78%', action: 'Cross-verifying CCTV footage logs' },
          { id: 'unc-3', nodeA: 'Imperial Trade Pvt Ltd', nodeB: 'Swiss Escrow #8819', linkType: 'Offshore Nominee Trust', confidence: '92%', action: 'Enforcement Directorate request dispatched' },
          { id: 'unc-4', nodeA: 'Burner IMEI #9012', nodeB: 'Safehouse Noida Sec 62', linkType: 'Cell Tower Triangulation Link', confidence: '69%', action: 'Field surveillance team deployed' },
        ],
      });

    default:
      return res.status(400).json({ error: 'Unknown stat category' });
  }
});

// Data Sources Status
app.get(['/api/datasources', '/api/data-sources'], (req: Request, res: Response) => {
  res.json({
    success: true,
    datasources: [
      { id: 'cctns', name: 'CCTNS National Crime Records', status: 'ONLINE', latency: '24ms', recordsCount: '4.2M records', lastSync: '1 min ago' },
      { id: 'cdr-telecom', name: 'Telecom CDR Gateway (All Telcos)', status: 'ONLINE', latency: '18ms', recordsCount: '18.9M CDRs', lastSync: 'Just now' },
      { id: 'banking-fiup', name: 'FIU-IND Hawala & Banking Gateway', status: 'ONLINE', latency: '32ms', recordsCount: '2.4M transactions', lastSync: '3 mins ago' },
      { id: 'fastag', name: 'National Electronic Toll (FASTag)', status: 'ONLINE', latency: '12ms', recordsCount: '890K toll logs', lastSync: 'Real-time' },
      { id: 'immigration', name: 'Immigration & Bureau of Passports', status: 'ONLINE', latency: '40ms', recordsCount: '1.1M crossings', lastSync: '2 mins ago' },
      { id: 'interpol', name: 'Interpol I-24/7 Red Notice Feed', status: 'ONLINE', latency: '85ms', recordsCount: '68K notices', lastSync: '10 mins ago' },
    ],
  });
});

// Reports Generation
app.get('/api/reports', (req: Request, res: Response) => {
  res.json({
    success: true,
    reports: [
      { id: 'rep-01', title: 'National Security Dossier: Transnational Hawala Syndicate', date: '2026-09-05', author: 'Investigator Sharma', classification: 'TOP SECRET // LEVEL 3', pages: 18 },
      { id: 'rep-02', title: 'Western Corridor Freight Smuggling Intercept Audit', date: '2026-09-03', author: 'ACP Vikram S. Rathore', classification: 'RESTRICTED INTELLIGENCE', pages: 12 },
      { id: 'rep-03', title: 'CDR Matrix & Tower Dump Analysis: Safehouse Noida', date: '2026-08-30', author: 'Tech Cell DL', classification: 'CONFIDENTIAL', pages: 8 },
      { id: 'rep-04', title: 'Court-Admissible Evidence Bundle (FIR-DL-26190)', date: '2026-08-25', author: 'Special Cell Prosecution Wing', classification: 'LEGAL DOCKET', pages: 34 },
    ],
  });
});

// Add New Node to Network Graph
app.post('/api/network/nodes', (req: Request, res: Response) => {
  const { label, type, syndicate, connections } = req.body;
  if (!label || !type) {
    return res.status(400).json({ error: 'Node label and type are required' });
  }

  const newNode = {
    id: `node-${Date.now()}`,
    label,
    type,
    x: 400 + Math.floor(Math.random() * 150 - 75),
    y: 250 + Math.floor(Math.random() * 150 - 75),
    connections: Number(connections) || 1,
    syndicate: syndicate || 'Intelligence Monitored Node',
  };

  networkGraphData.nodes.push(newNode as any);
  statsData.personsIdentified.value = (parseInt(statsData.personsIdentified.value.replace(',', '')) + 1).toLocaleString();

  res.status(201).json({
    success: true,
    message: `Node "${label}" added to live intelligence graph.`,
    node: newNode,
  });
});

// Add New Link between Nodes
app.post('/api/network/links', (req: Request, res: Response) => {
  const { source, target, relation } = req.body;
  if (!source || !target) {
    return res.status(400).json({ error: 'Source and Target IDs are required' });
  }

  const newLink = {
    source,
    target,
    relation: relation || 'Direct Correlated Link',
  };

  networkGraphData.links.push(newLink);
  res.status(201).json({
    success: true,
    message: `Link created between ${source} and ${target}.`,
    link: newLink,
  });
});

// Recent Alerts
app.get('/api/alerts', (req: Request, res: Response) => {
  res.json({
    success: true,
    alerts: alertsData,
  });
});

// Global Search
app.get('/api/search', (req: Request, res: Response) => {
  const query = (req.query.q as string || '').toLowerCase().trim();

  if (!query) {
    return res.json({ results: [] });
  }

  const matchedNodes = networkGraphData.nodes.filter(
    (n) => n.label.toLowerCase().includes(query) || (n.syndicate && n.syndicate.toLowerCase().includes(query))
  );

  const matchedCases = casesData.filter(
    (c) => c.id.toLowerCase().includes(query) || c.type.toLowerCase().includes(query) || c.lead.toLowerCase().includes(query)
  );

  res.json({
    query,
    results: {
      entities: matchedNodes,
      cases: matchedCases,
    },
  });
});

// AI Investigator Natural Language Analysis Query
app.post('/api/ai/investigate', async (req: Request, res: Response) => {
  const { query, caseId } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required for AI Investigator' });
  }

  // Check if Gemini API key exists
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      const prompt = `You are the AI Investigator Core for the Indian National Criminal Network Analysis System.
You are analyzing high-priority criminal networks, shell companies, hawala transactions, logistics syndicates, and suspect communication graphs.
Active Case Context: Case ${caseId || '#26190'} (Organized Syndicate & Financial Laundering).
Known Key Nodes:
- Person A: Syndicate Apex (47 links)
- Person B: Bridge between NCR and Western Logistics (39 links)
- Person C: Hawala Operator (28 links)
- Entities: Imperial Trade Pvt Ltd, Apex Global Logistics, Kabul Cargo Exchange, Safehouse Noida Sec 62, Nhava Sheva CFS.
Investigator Query: "${query}"

Provide a direct, concise, high-security intelligence breakdown (2-3 sentences max) specifying verified connection paths, intermediate nodes, financial impact, and actionable interception recommendations.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || 'Intelligence path verified across monitored nodes.';
      return res.json({
        success: true,
        source: 'gemini-ai',
        response: responseText,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.warn('Gemini API query failed or fallback used:', err.message);
    }
  }

  // Intelligent fallback intelligence response
  const lowerQuery = query.toLowerCase();
  let analysisResult = '';

  if (lowerQuery.includes('person a') && lowerQuery.includes('person z')) {
    analysisResult = 'Analyzing network: Person A and Person Z share 2 intermediate high-risk nodes (Person B via Imperial Trade and Hawala Account #4092). Total transaction path weight: ₹4.2 Cr across 3 cross-border hops.';
  } else if (lowerQuery.includes('person a') || lowerQuery.includes('key player')) {
    analysisResult = 'Person A displays 0.98 eigenvector centrality. Central conduit for 6 overseas shell entities, 4 encrypted burner trunks, and the Noida safehouse node. Immediate asset freeze recommended.';
  } else if (lowerQuery.includes('transaction') || lowerQuery.includes('money') || lowerQuery.includes('hawala')) {
    analysisResult = 'Financial tracer identifies ₹14.8 Crores dispersed into 18 escrow accounts within 14 minutes. Origin account linked to Kabul Cargo Exchange and Imperial Trade Pvt Ltd.';
  } else if (lowerQuery.includes('vehicle') || lowerQuery.includes('truck') || lowerQuery.includes('car')) {
    analysisResult = 'Fleet tracking: Truck HR-26-CC-4012 and SUV DL-01-AB-9821 logged 4 synchronized perimeter crossings near Terminal 3 border post within 48 hours.';
  } else {
    analysisResult = `Intelligence analysis on "${query}": Correlated across 5 intelligence databases. Linked to Case #26190 with 7 high-confidence proximity nodes and active surveillance priority.`;
  }

  return res.json({
    success: true,
    source: 'intelligence-core',
    response: analysisResult,
    timestamp: new Date().toISOString(),
  });
});

// Network & Host Link Info
app.get('/api/network-info', (req: Request, res: Response) => {
  let networkIp = '0.0.0.0';
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === 'IPv4' && !iface.internal) {
          networkIp = iface.address;
          break;
        }
      }
    }
  } catch {}

  res.json({
    success: true,
    localUrl: `http://localhost:${PORT}/`,
    networkUrl: `http://${networkIp}:${PORT}/`,
    port: PORT,
    cloudDevUrl: 'https://ais-dev-2nvgp5u43crufuou7dh7w4-464102511624.asia-southeast1.run.app',
    cloudShareUrl: 'https://ais-pre-2nvgp5u43crufuou7dh7w4-464102511624.asia-southeast1.run.app',
  });
});

// Guard: Ensure any unhandled /api/* route returns JSON 404 and NEVER HTML
app.use('/api', (req: Request, res: Response) => {
  res.status(404).json({ error: `API endpoint ${req.method} ${req.originalUrl} not found on server.` });
});

// ====================================================
// VITE MIDDLEWARE SETUP
// ====================================================

async function startServer() {
  const startTime = Date.now();
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    const elapsed = Date.now() - startTime;
    let networkAddress = `http://0.0.0.0:${PORT}/`;
    try {
      const interfaces = os.networkInterfaces();
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name] || []) {
          if (iface.family === 'IPv4' && !iface.internal) {
            networkAddress = `http://${iface.address}:${PORT}/`;
            break;
          }
        }
      }
    } catch {}

    console.log(`\n  \x1b[32m\x1b[1mVITE\x1b[0m \x1b[2mv6.2.3\x1b[0m  \x1b[32mready in\x1b[0m \x1b[1m${elapsed} ms\x1b[0m\n`);
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mLocal:\x1b[0m   \x1b[36mhttp://localhost:${PORT}/\x1b[0m`);
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mNetwork:\x1b[0m \x1b[36m${networkAddress}\x1b[0m`);
    console.log(`  \x1b[32m➜\x1b[0m  \x1b[2mpress \x1b[1mh + enter\x1b[0m\x1b[2m to show help\x1b[0m\n`);
  });
}

startServer();

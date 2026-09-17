import React, { useState, useRef, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  RotateCcw,
  Eye,
  User,
  Building2,
  MapPin,
  Car,
  CreditCard,
  ChevronDown,
} from 'lucide-react';

interface NetworkNode {
  id: string;
  label: string;
  type: 'person' | 'organization' | 'location' | 'vehicle' | 'account';
  x: number;
  y: number;
  isKeyPlayer?: boolean;
  connections: number;
  syndicate?: string;
}

interface NetworkLink {
  source: string;
  target: string;
  strength?: number;
}

const INITIAL_NODES: NetworkNode[] = [
  { id: 'key-player', label: 'Key Player (Person A)', type: 'person', x: 440, y: 240, isKeyPlayer: true, connections: 47, syndicate: 'Apex Syndicate Leader' },
  { id: 'p-1', label: 'Person B (Bridge)', type: 'person', x: 350, y: 190, connections: 39, syndicate: 'Logistics Head' },
  { id: 'p-2', label: 'Person C', type: 'person', x: 370, y: 140, connections: 28, syndicate: 'Hawala Operative' },
  { id: 'p-3', label: 'Person D', type: 'person', x: 330, y: 230, connections: 21 },
  { id: 'p-4', label: 'Person E', type: 'person', x: 440, y: 170, connections: 18 },
  { id: 'p-5', label: 'Person F', type: 'person', x: 530, y: 290, connections: 15 },
  { id: 'p-6', label: 'Person G', type: 'person', x: 510, y: 360, connections: 11 },

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
];

const INITIAL_LINKS: NetworkLink[] = [
  { source: 'key-player', target: 'p-1' },
  { source: 'key-player', target: 'p-4' },
  { source: 'key-player', target: 'org-2' },
  { source: 'key-player', target: 'loc-1' },
  { source: 'key-player', target: 'veh-3' },
  { source: 'key-player', target: 'acc-3' },

  { source: 'p-1', target: 'org-1' },
  { source: 'p-1', target: 'p-2' },
  { source: 'p-1', target: 'p-3' },
  { source: 'p-2', target: 'org-1' },
  { source: 'p-3', target: 'veh-3' },
  { source: 'org-1', target: 'acc-1' },

  { source: 'p-4', target: 'acc-2' },
  { source: 'p-4', target: 'veh-2' },
  { source: 'veh-2', target: 'loc-4' },

  { source: 'org-2', target: 'veh-1' },
  { source: 'org-2', target: 'acc-3' },
  { source: 'veh-1', target: 'p-5' },
  { source: 'veh-1', target: 'veh-4' },
  { source: 'p-5', target: 'p-6' },

  { source: 'loc-1', target: 'loc-2' },
  { source: 'loc-2', target: 'org-4' },
  { source: 'org-4', target: 'org-3' },
  { source: 'org-3', target: 'org-5' },
  { source: 'org-5', target: 'acc-4' },
  { source: 'acc-4', target: 'p-6' },
];

interface NetworkOverviewCanvasProps {
  onSelectNode?: (node: NetworkNode) => void;
}

export const NetworkOverviewCanvas: React.FC<NetworkOverviewCanvasProps> = ({ onSelectNode }) => {
  const [nodes, setNodes] = useState<NetworkNode[]>(INITIAL_NODES);
  const [links] = useState<NetworkLink[]>(INITIAL_LINKS);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [is3DMode, setIs3DMode] = useState(false);
  const [layoutMode, setLayoutMode] = useState('Force Layout');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.6));
  const handleResetZoom = () => setZoomLevel(1);

  // Dragging handlers for SVG nodes
  const handleMouseDown = (node: NetworkNode, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraggingNodeId(node.id);
    setDragOffset({ x: e.clientX - node.x, y: e.clientY - node.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    setNodes((prevNodes) =>
      prevNodes.map((n) => (n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n))
    );
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  const getNodeColor = (type: NetworkNode['type']) => {
    switch (type) {
      case 'person':
        return '#EF4444'; // Red
      case 'organization':
        return '#38BDF8'; // Blue
      case 'location':
        return '#22C55E'; // Green
      case 'vehicle':
        return '#F97316'; // Orange
      case 'account':
        return '#A855F7'; // Purple
      default:
        return '#94A3B8';
    }
  };

  const getNodeIcon = (type: NetworkNode['type']) => {
    switch (type) {
      case 'person':
        return User;
      case 'organization':
        return Building2;
      case 'location':
        return MapPin;
      case 'vehicle':
        return Car;
      case 'account':
        return CreditCard;
    }
  };

  return (
    <div
      ref={containerRef}
      id="network-overview-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative bg-[#020B16] rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col ${
        isFullscreen ? 'fixed inset-4 z-50' : 'h-[440px]'
      }`}
    >
      {/* ====================================================
          TOP BAR: Title + Live Status + Layout Controls
          ==================================================== */}
      <div className="px-4 py-3 bg-[#041224]/90 border-b border-slate-800/80 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-2.5">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Network Overview
          </h3>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Analysis
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* 3D Toggle */}
          <button
            type="button"
            onClick={() => setIs3DMode(!is3DMode)}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
              is3DMode
                ? 'bg-sky-600 text-white border-sky-400'
                : 'bg-[#08192D] text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D</span>
          </button>

          {/* Layout Mode Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="px-2.5 py-1 rounded text-xs font-medium bg-[#08192D] text-slate-200 border border-slate-700 flex items-center gap-1 hover:text-white"
            >
              <span>{layoutMode}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded bg-[#08192D] text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ====================================================
          CANVAS AREA
          ==================================================== */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* Legend in top-left */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 p-2.5 rounded-lg bg-[#041120]/80 backdrop-blur-md border border-slate-800/80 text-[11px] font-medium text-slate-300 select-none pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-xs shadow-red-500/50"></span>
            <span>Person</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-xs shadow-sky-500/50"></span>
            <span>Organization</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-xs shadow-green-500/50"></span>
            <span>Location</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] shadow-xs shadow-orange-500/50"></span>
            <span>Vehicle</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-xs shadow-purple-500/50"></span>
            <span>Account</span>
          </div>
        </div>

        {/* Floating Zoom / Recenter controls (on right) */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col bg-[#05172C] rounded-lg border border-slate-700 overflow-hidden shadow-lg select-none">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <div className="h-px bg-slate-700"></div>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <div className="h-px bg-slate-700"></div>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition cursor-pointer"
            title="Recenter View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive SVG Network Graph */}
        <svg
          className="w-full h-full cursor-grab active:cursor-grabbing"
          viewBox="0 0 880 440"
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `scale(${zoomLevel}) ${is3DMode ? 'rotateX(20deg) rotateZ(-4deg)' : ''}`,
            transformOrigin: 'center center',
            transition: 'transform 0.25s ease-out',
          }}
        >
          <defs>
            {/* Background cyber grid */}
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0F243D" strokeWidth="0.75" />
            </pattern>

            {/* Glowing filter for links and key player */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Key player pulse */}
            <radialGradient id="key-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#EF4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid Background */}
          <rect width="880" height="440" fill="url(#grid-pattern)" />

          {/* Connecting Links */}
          <g className="links">
            {links.map((link, idx) => {
              const sourceNode = nodes.find((n) => n.id === link.source);
              const targetNode = nodes.find((n) => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              const isKeyConnection =
                sourceNode.isKeyPlayer || targetNode.isKeyPlayer;

              return (
                <line
                  key={`link-${idx}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isKeyConnection ? '#E11D48' : '#1E3A5F'}
                  strokeWidth={isKeyConnection ? 1.8 : 1.2}
                  strokeOpacity={isKeyConnection ? 0.8 : 0.6}
                  strokeDasharray={link.source === 'veh-1' ? '4 3' : undefined}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {nodes.map((node) => {
              const color = getNodeColor(node.type);
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode?.id === node.id;
              const Icon = getNodeIcon(node.type);

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseDown={(e) => handleMouseDown(node, e)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer"
                >
                  {/* Key Player Glowing Ripple */}
                  {node.isKeyPlayer && (
                    <>
                      <circle
                        r="34"
                        fill="url(#key-pulse)"
                        className="animate-ping opacity-35"
                      />
                      <circle
                        r="26"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        className="animate-spin"
                        style={{ animationDuration: '14s' }}
                      />
                    </>
                  )}

                  {/* Outer ring */}
                  <circle
                    r={node.isKeyPlayer ? 18 : 12}
                    fill={color}
                    fillOpacity={0.25}
                    stroke={color}
                    strokeWidth={node.isKeyPlayer ? 2.5 : 1.5}
                    className="transition-all"
                  />

                  {/* Inner circle */}
                  <circle
                    r={node.isKeyPlayer ? 14 : 9}
                    fill={color}
                    className="drop-shadow-sm"
                  />

                  {/* Icon centered inside node */}
                  <foreignObject
                    x={node.isKeyPlayer ? -7 : -5}
                    y={node.isKeyPlayer ? -7 : -5}
                    width={node.isKeyPlayer ? 14 : 10}
                    height={node.isKeyPlayer ? 14 : 10}
                    className="pointer-events-none"
                  >
                    <Icon className="w-full h-full text-white" />
                  </foreignObject>

                  {/* Key Player Label Badge */}
                  {node.isKeyPlayer && (
                    <g transform="translate(24, 4)">
                      <rect
                        x="-4"
                        y="-12"
                        width="68"
                        height="18"
                        rx="4"
                        fill="#0B1A2C"
                        stroke="#EF4444"
                        strokeWidth="1"
                      />
                      <text
                        x="4"
                        y="1"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        Key Player
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover / Selection Details Tooltip Card */}
        {(hoveredNode || selectedNode) && (
          <div className="absolute top-3 right-3 z-30 p-3 rounded-lg bg-[#07192C]/95 border border-sky-500/40 shadow-xl max-w-xs text-xs select-none backdrop-blur-md animate-in fade-in duration-150">
            {(() => {
              const item = hoveredNode || selectedNode!;
              return (
                <div>
                  <div className="flex items-center gap-2 pb-1.5 border-b border-slate-700">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: getNodeColor(item.type) }}
                    ></span>
                    <span className="font-bold text-white">{item.label}</span>
                  </div>
                  <div className="space-y-1 mt-2 text-[11px] text-slate-300 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span className="uppercase text-sky-400">{item.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Connections:</span>
                      <span className="text-white font-bold">{item.connections} linked</span>
                    </div>
                    {item.syndicate && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tag:</span>
                        <span className="text-amber-400">{item.syndicate}</span>
                      </div>
                    )}
                  </div>
                  {onSelectNode && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700/80">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectNode(item);
                        }}
                        className="w-full py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                      >
                        <User className="w-3 h-3" />
                        <span>Inspect Intelligence Dossier</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

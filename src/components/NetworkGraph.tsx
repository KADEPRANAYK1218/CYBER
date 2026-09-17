import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  radius: number;
  label: string;
  type: 'suspect' | 'phone' | 'financial' | 'location' | 'ai-hub';
  color: string;
  vx: number;
  vy: number;
  pulse: number;
}

interface Edge {
  from: number;
  to: number;
  weight: number;
  color: string;
  particlePos: number;
  speed: number;
}

export const NetworkGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 900);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initial node graph
    const nodes: Node[] = [
      { x: width * 0.25, y: height * 0.22, radius: 8, label: 'PRIME-01 (MUMBAI)', type: 'suspect', color: '#ff7a00', vx: 0.15, vy: -0.1, pulse: 0 },
      { x: width * 0.42, y: height * 0.32, radius: 10, label: 'AI NEXUS HUB', type: 'ai-hub', color: '#00e5ff', vx: -0.08, vy: 0.12, pulse: 0 },
      { x: width * 0.18, y: height * 0.45, radius: 6, label: 'CDR #9810-XXXX', type: 'phone', color: '#38bdf8', vx: 0.1, vy: 0.08, pulse: 0 },
      { x: width * 0.52, y: height * 0.18, radius: 7, label: 'HAWALA ACC #442', type: 'financial', color: '#10b981', vx: -0.12, vy: -0.15, pulse: 0 },
      { x: width * 0.35, y: height * 0.58, radius: 7, label: 'ENCRYPTED IP (VPN)', type: 'suspect', color: '#f59e0b', vx: 0.1, vy: -0.1, pulse: 0 },
      { x: width * 0.58, y: height * 0.48, radius: 6, label: 'CELL TOWER 14-B', type: 'location', color: '#38bdf8', vx: -0.05, vy: 0.08, pulse: 0 },
      { x: width * 0.15, y: height * 0.68, radius: 8, label: 'FIR 2026/899', type: 'location', color: '#ef4444', vx: 0.08, vy: 0.1, pulse: 0 },
      { x: width * 0.48, y: height * 0.72, radius: 9, label: 'SYNDICATE K-9', type: 'suspect', color: '#ff7a00', vx: -0.1, vy: -0.06, pulse: 0 },
      { x: width * 0.28, y: height * 0.82, radius: 6, label: 'CDR #8800-XXXX', type: 'phone', color: '#00e5ff', vx: 0.12, vy: 0.05, pulse: 0 },
      { x: width * 0.62, y: height * 0.78, radius: 7, label: 'MULE ACC 904', type: 'financial', color: '#10b981', vx: -0.06, vy: 0.1, pulse: 0 },
    ];

    const edges: Edge[] = [
      { from: 0, to: 1, weight: 2, color: '#00e5ff', particlePos: 0.1, speed: 0.007 },
      { from: 1, to: 2, weight: 1.5, color: '#38bdf8', particlePos: 0.4, speed: 0.009 },
      { from: 1, to: 3, weight: 2, color: '#10b981', particlePos: 0.7, speed: 0.006 },
      { from: 1, to: 4, weight: 2, color: '#f59e0b', particlePos: 0.2, speed: 0.008 },
      { from: 1, to: 5, weight: 1.2, color: '#38bdf8', particlePos: 0.6, speed: 0.01 },
      { from: 2, to: 6, weight: 1.5, color: '#ef4444', particlePos: 0.3, speed: 0.007 },
      { from: 4, to: 7, weight: 2.2, color: '#ff7a00', particlePos: 0.8, speed: 0.009 },
      { from: 6, to: 8, weight: 1.2, color: '#00e5ff', particlePos: 0.5, speed: 0.006 },
      { from: 7, to: 8, weight: 1.5, color: '#ff7a00', particlePos: 0.15, speed: 0.008 },
      { from: 5, to: 9, weight: 1.8, color: '#10b981', particlePos: 0.35, speed: 0.007 },
      { from: 7, to: 9, weight: 1.4, color: '#38bdf8', particlePos: 0.65, speed: 0.005 },
    ];

    let step = 0;

    const render = () => {
      step += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw radar sweep circles
      const cx = width * 0.38;
      const cy = height * 0.4;
      [120, 240, 360].forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.04 - idx * 0.01})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update node positions with gentle float
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < width * 0.08 || node.x > width * 0.8) node.vx *= -1;
        if (node.y < height * 0.12 || node.y > height * 0.88) node.vy *= -1;
        node.pulse = (Math.sin(step * 2 + node.x) + 1) * 0.5;
      });

      // Draw edges
      edges.forEach((edge) => {
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        if (!fromNode || !toNode) return;

        // Line
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = edge.color;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = edge.weight;
        ctx.stroke();

        // Animated data packet
        edge.particlePos = (edge.particlePos + edge.speed) % 1;
        const px = fromNode.x + (toNode.x - fromNode.x) * edge.particlePos;
        const py = fromNode.y + (toNode.y - fromNode.y) * edge.particlePos;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = edge.color;
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = edge.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((node) => {
        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + node.pulse * 6, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = 0.3 * (1 - node.pulse * 0.5);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.85;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 1;
        ctx.fill();

        // Node label
        ctx.font = '9px "Inter", monospace';
        ctx.fillStyle = '#E2E8F0';
        ctx.globalAlpha = 0.8;
        ctx.fillText(node.label, node.x + node.radius + 6, node.y + 3);
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-65 z-0"
    />
  );
};

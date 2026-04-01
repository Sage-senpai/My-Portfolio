// ============================================================================
// FILE: src/views/AmbassadorView.tsx
// DESCRIPTION: Ecosystem / Protocol — D3 force-directed network graph
// ============================================================================

import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GRAPH_NODES, GRAPH_LINKS, type GraphNode } from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_ambassador.scss';

interface Props {
  onBack: () => void;
}

type FilterType = 'all' | 'chain' | 'project' | 'community';

const LEGEND = [
  { type: 'center', color: '#E6007A', label: 'Center' },
  { type: 'chain', color: '#4DA2FF', label: 'Chain / Protocol' },
  { type: 'project', color: '#9B5DE5', label: 'Project' },
  { type: 'community', color: '#00FF41', label: 'Community' },
];

interface SimNode extends GraphNode {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
  index?: number;
}

interface SimLink {
  source: SimNode | string;
  target: SimNode | string;
}

export default function AmbassadorView({ onBack }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: GraphNode } | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const nodes: SimNode[] = GRAPH_NODES.map((n) => ({ ...n }));
    const links: SimLink[] = GRAPH_LINKS.map((l) => ({ source: l.source, target: l.target }));

    const simulation = d3
      .forceSimulation<SimNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance((d) => {
            const s = d.source as SimNode;
            const t = d.target as SimNode;
            if (s.id === 'divine' || t.id === 'divine') return 120;
            return 65;
          })
      )
      .force('charge', d3.forceManyBody().strength(-280))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide<SimNode>().radius((d) => d.r + 10));

    simulationRef.current = simulation;

    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'rgba(255,255,255,0.1)')
      .attr('stroke-width', 0.7);

    const nodeGroup = svg
      .append('g')
      .selectAll<SVGGElement, SimNode>('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'grab')
      .call(
        d3.drag<SVGGElement, SimNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    nodeGroup
      .append('circle')
      .attr('r', (d) => d.r)
      .attr('fill', (d) => d.color + '22')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', (d) => (d.id === 'divine' ? 2 : 1));

    nodeGroup
      .append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => d.r + 11)
      .attr('fill', '#888')
      .attr('font-size', (d) => (d.id === 'divine' ? '9px' : '8px'))
      .attr('font-family', 'system-ui, sans-serif');

    nodeGroup
      .on('mouseenter', function (event, d) {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setTooltip({
          x: event.clientX - rect.left + 12,
          y: event.clientY - rect.top - 50,
          node: d,
        });
      })
      .on('mousemove', function (event) {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setTooltip((prev) =>
          prev ? { ...prev, x: event.clientX - rect.left + 12, y: event.clientY - rect.top - 50 } : null
        );
      })
      .on('mouseleave', () => setTooltip(null));

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => ((d.source as SimNode).x ?? 0))
        .attr('y1', (d) => ((d.source as SimNode).y ?? 0))
        .attr('x2', (d) => ((d.target as SimNode).x ?? 0))
        .attr('y2', (d) => ((d.target as SimNode).y ?? 0));

      nodeGroup.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      svg.attr('viewBox', `0 0 ${w} ${h}`);
      simulation.force('center', d3.forceCenter(w / 2, h / 2));
      simulation.alpha(0.3).restart();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Filter effect
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll<SVGGElement, SimNode>('g g').attr('opacity', (d) => {
      if (activeFilter === 'all' || d.type === activeFilter || d.type === 'center') return 1;
      return 0.2;
    });
  }, [activeFilter]);

  return (
    <div className="ambassador">
      <div className="ambassador__header">
        <div>
          <div className="ambassador__brand">Ecosystem Footprint Visualizer</div>
          <span className="ambassador__stats">
            {GRAPH_NODES.length} nodes · {GRAPH_LINKS.length} connections
          </span>
        </div>
        <BackButton onBack={onBack} />
      </div>

      <div className="ambassador__controls">
        <div className="ambassador__legend">
          {LEGEND.map((item) => (
            <div key={item.type} className="ambassador__legend-item">
              <span className="ambassador__legend-dot" style={{ background: item.color }} />
              {item.label}
            </div>
          ))}
        </div>
        <span className="ambassador__hint">Drag nodes · Hover for details</span>
      </div>

      <div className="ambassador__filters">
        {(['all', 'chain', 'project', 'community'] as FilterType[]).map((f) => (
          <button
            key={f}
            className={`ambassador__filter-pill ${activeFilter === f ? 'ambassador__filter-pill--active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="ambassador__graph-container" ref={containerRef}>
        <svg ref={svgRef} className="ambassador__svg" />

        {tooltip && (
          <div
            className="ambassador__tooltip"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              borderLeft: `3px solid ${tooltip.node.color}`,
            }}
          >
            <div className="ambassador__tooltip-label">{tooltip.node.label}</div>
            <div className="ambassador__tooltip-desc">{tooltip.node.desc}</div>
          </div>
        )}
      </div>
    </div>
  );
}

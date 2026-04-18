'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface RadarAxis {
  axis: string;
  value: number;
}

interface Props {
  data: RadarAxis[];
}

export default function SkillRadar({ data }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 300;
    const height = 300;
    const margin = 60;
    const radius = Math.min(width, height) / 2 - margin;
    const levels = 4;
    const total = data.length;
    const angleSlice = (Math.PI * 2) / total;

    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    const g = svg
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Grid circles
    for (let level = 1; level <= levels; level++) {
      const r = (radius * level) / levels;
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#27272a')
        .attr('stroke-width', 0.5);
    }

    // Axes
    data.forEach((_, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', rScale(100) * Math.cos(angle))
        .attr('y2', rScale(100) * Math.sin(angle))
        .attr('stroke', '#18181b')
        .attr('stroke-width', 0.5);
    });

    // Labels - Minimalist
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const labelR = radius + 25;
      const x = labelR * Math.cos(angle);
      const y = labelR * Math.sin(angle);
      g.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('dy', '0.35em')
        .attr('text-anchor', Math.abs(x) < 5 ? 'middle' : x > 0 ? 'start' : 'end')
        .attr('font-size', 8)
        .attr('class', 'font-mono fill-zinc-500 uppercase tracking-widest font-semibold')
        .text(d.axis);
    });

    // Radar area
    const radarLine = d3.lineRadial<RadarAxis>()
      .radius((d) => rScale(d.value))
      .angle((_, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    // Blue Gradient fill
    const defs = svg.append('defs');
    const gradient = defs.append('radialGradient').attr('id', 'radar-gradient');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#3b82f6').attr('stop-opacity', 0.4);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#3b82f6').attr('stop-opacity', 0.1);

    const path = g.append('path')
      .datum(data)
      .attr('fill', 'url(#radar-gradient)')
      .attr('stroke', '#38bdf8')
      .attr('stroke-width', 1.5)
      .attr('d', radarLine)
      .style('opacity', 0);

    path.transition().duration(1000).style('opacity', 1);

    // Data points - Simple blue dots
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = rScale(d.value) * Math.cos(angle);
      const y = rScale(d.value) * Math.sin(angle);

      g.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 2)
        .attr('fill', '#38bdf8')
        .style('opacity', 0)
        .transition()
        .delay(500)
        .duration(400)
        .style('opacity', 1);
    });
  }, [data]);

  return <svg ref={svgRef} className="w-full max-w-[280px] mx-auto overflow-visible" />;
}

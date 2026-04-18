'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { GitHubStats } from '@/types';

interface Props {
  data: GitHubStats['contributionsCollection']['contributionCalendar'];
}

export default function ContributionHeatmap({ data }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  // "Kinetic Core" Heatmap Palette: Zinc -> Red -> Orange -> Yellow
  const palette = ['#0a0a0a', '#7f1d1d', '#991b1b', '#ea580c', '#fbbf24'];

  useEffect(() => {
    if (!svgRef.current || !data?.weeks?.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const cellSize = 10;
    const cellGap = 3;
    const step = cellSize + cellGap;
    const weeks = data.weeks;
    const width = weeks.length * step + 40;
    const height = 7 * step + 30;

    svg.attr('width', '100%').attr('height', height).attr('viewBox', `0 0 ${width} ${height}`);

    const days = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
    days.forEach((day, i) => {
      if (!day) return;
      svg.append('text')
        .attr('x', -25)
        .attr('y', 10 + i * step)
        .attr('font-size', 8)
        .attr('class', 'font-mono fill-zinc-700')
        .attr('text-anchor', 'start')
        .text(day.toUpperCase());
    });

    const weeksGroup = svg.append('g').attr('transform', 'translate(35, 10)');

    weeks.forEach((week, wi) => {
      week.contributionDays.forEach((day, di) => {
        const x = wi * step;
        const y = di * step;
        
        let color = palette[0];
        if (day.contributionCount > 0) {
          if (day.contributionCount < 2) color = palette[1];
          else if (day.contributionCount < 5) color = palette[2];
          else if (day.contributionCount < 10) color = palette[3];
          else color = palette[4];
        }

        const rect = weeksGroup.append('rect')
          .attr('x', x)
          .attr('y', y)
          .attr('width', cellSize)
          .attr('height', cellSize)
          .attr('rx', 1.5)
          .attr('fill', color)
          .attr('stroke', '#18181b')
          .attr('stroke-width', 0.5)
          .style('opacity', 0);

        rect.transition()
          .delay((wi * 7 + di) * 2)
          .duration(300)
          .style('opacity', 1);

        rect.append('title').text(
          `${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`
        );

        rect
          .on('mouseover', function () {
            d3.select(this)
              .attr('stroke', 'var(--core-orange)')
              .attr('stroke-width', 1.5)
              .style('filter', 'drop-shadow(0 0 5px rgba(255, 140, 62, 0.6))');
          })
          .on('mouseout', function () {
            d3.select(this)
              .attr('stroke', '#18181b')
              .attr('stroke-width', 0.5)
              .style('filter', null);
          });
      });
    });

    // Month labels
    const monthFormat = d3.timeFormat('%b');
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const firstDay = week.contributionDays[0];
      if (!firstDay) return;
      const date = new Date(firstDay.date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        lastMonth = month;
        weeksGroup.append('text')
          .attr('x', wi * step)
          .attr('y', -8)
          .attr('font-size', 8)
          .attr('class', 'font-mono fill-zinc-700')
          .text(monthFormat(date).toUpperCase());
      }
    });

  }, [data]);

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[600px]">
        <svg ref={svgRef} className="w-full" />
        <div className="flex items-center justify-end gap-3 mt-8 border-t border-zinc-900/50 pt-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-700">Less Kinetic Energy</span>
          <div className="flex gap-1">
            {palette.map((color) => (
              <div key={color} className="w-2.5 h-2.5 rounded-[1.5px] border border-zinc-800" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-700">Highest Pulse</span>
        </div>
      </div>
    </div>
  );
}

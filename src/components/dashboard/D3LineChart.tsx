
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface LineChartProps {
  data: { date: string; value: number }[];
  color: string;
  width: number;
  height: number;
}

const D3LineChart = ({ data, color, width, height }: LineChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const parseDate = d3.timeParse('%Y-%m');
    const processedData = data.map(d => ({
      date: parseDate(d.date) || new Date(),
      value: d.value
    }));

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(processedData, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, d => d.value) || 0])
      .range([innerHeight, 0]);

    const line = d3
      .line<{ date: Date; value: number }>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveCardinal);

    // Add line path
    const path = g
      .append('path')
      .datum(processedData)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 3)
      .attr('d', line);

    // Animate line drawing
    const totalLength = path.node()?.getTotalLength() || 0;
    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1500)
      .attr('stroke-dashoffset', 0);

    // Add dots
    g.selectAll('.dot')
      .data(processedData)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.value))
      .attr('r', 0)
      .attr('fill', color)
      .transition()
      .delay((d, i) => i * 200)
      .duration(300)
      .attr('r', 4);

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%m/%y')))
      .selectAll('text')
      .attr('font-size', '12px')
      .attr('fill', '#6b7280');

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .attr('font-size', '12px')
      .attr('fill', '#6b7280');

  }, [data, color, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="border rounded-lg bg-white"
    />
  );
};

export default D3LineChart;

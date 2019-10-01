import React, { Component } from "react";
import * as d3 from "d3";

const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class Chart extends Component {
  state = {
    bars: []
  };

  xAxis = d3.axisBottom();
  yAxis = d3.axisLeft();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, range } = nextProps;
    if (!data) return {};
    const xScale = d3.scaleTime().range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
    const colorScale = d3.scaleSequential(d3.interpolateSpectral);

    const timeDomain = d3.extent(data, d => d.date);
    const tempMax = d3.max(data, d => d.high);
    const [minAvg, maxAvg] = d3.extent(data, d => d.avg);
    xScale.domain(timeDomain);
    yScale.domain([0, tempMax]);
    colorScale.domain([maxAvg, minAvg]);

    // calculate x and y for each rectangle

    const bars = data.map(d => {
      const isColored = !range || (range[0] < d.date && d.date < range[1]);
      const y1 = yScale(d.high);
      const y2 = yScale(d.low);
      return {
        x: xScale(d.date),
        y: y1,
        height: y2 - y1,
        fill: isColored ? colorScale(d.avg) : "#ccc"
      };
    });
    return { bars, xScale, yScale };
  }
  componentDidMount() {
    this.brush = d3
      .brushX()
      .extent([
        [margin.left, margin.top], //top left
        [width - margin.right, height - margin.top] //bottom right
      ])
      .on("end", () => {
        const [minX, maxX] = d3.event.selection;
        const range = [
          this.state.xScale.invert(minX),
          this.state.xScale.invert(maxX)
        ];
        this.props.updateRange(range);
      });
    d3.select(this.refs.brush).call(this.brush);
  }
  componentDidUpdate() {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.refs.xAxis).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }
  render() {
    return (
      <svg width={width} height={height}>
        {this.state.bars.map(d => (
          <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />
        ))}
        <g ref="xAxis" transform={`translate(0, ${height - margin.bottom})`} />
        <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
        <g ref="brush" />
      </svg>
    );
  }
}

export default Chart;

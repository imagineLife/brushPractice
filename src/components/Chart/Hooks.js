import React, { Component } from "react";
import * as d3 from "d3";

class Chart extends Component {
  state = {
    bars: [],
    width :650,
    height :400,
    margin :{ top: 20, right: 5, bottom: 20, left: 35 },
    xScale: d3.scaleTime(),
    yScale: d3.scaleLinear(),
    colorScale : d3.scaleSequential(d3.interpolateSpectral)
  };

  xAxis = d3.axisBottom();
  yAxis = d3.axisLeft();

  componentDidMount() {
    console.log('%c CDM', 'background-color: black; color: white;')
    // console.log('this.state')
    // console.log(this.state)
    // console.log('this.props')
    // console.log(this.props)
    
    const brushFn = d3
      .brushX()
      .extent([
        [this.state.margin.left, this.state.margin.top], //top left
        [this.state.width - this.state.margin.right, this.state.height - this.state.margin.top] //bottom right
      ])
      .on("end", () => {
        const [minX, maxX] = d3.event.selection;
        const range = [
          this.state.xScale.invert(minX),
          this.state.xScale.invert(maxX)
        ];
        this.props.updateRange(range);
      });

    console.log('this.refs.brush')
    console.log(this.refs.brush)
    
    d3.select(this.refs.brush).call(brushFn);
  }
  componentDidUpdate() {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.refs.xAxis).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }
  render() {

    console.log('%c CHART RENDER', 'background-color: steelblue; color: black;')
    console.log('this.state')
    console.log(this.state)
    console.log('this.props')
    console.log(this.props)
    console.log('this.refs')
    console.log(this.refs)
    
    
    let {data, range } = this.props

    if(!data || !range){
      return <p>loading data...</p>
    }
        //build scale-ranges
    const xScale = this.state.xScale.range([this.state.margin.left, this.state.width - this.state.margin.right]);
    const yScale = this.state.yScale.range([this.state.height - this.state.margin.bottom, this.state.margin.top]);
    const colorScale = d3.scaleSequential(d3.interpolateSpectral);

    //set domain vals
    const timeDomain = d3.extent(data, d => d.date);
    const tempMax = d3.max(data, d => d.high);
    const [minAvg, maxAvg] = d3.extent(data, d => d.avg);
    
    //set scale domains
    xScale.domain(timeDomain);
    yScale.domain([0, tempMax]);
    colorScale.domain([maxAvg, minAvg]);

    // calculate x and y for each rectangle
    const bars = data.map(d => {
      // const isColored = !range || (range[0] < d.date && d.date < range[1]);
      const y1 = yScale(d.high);
      const y2 = yScale(d.low);
      return {
        x: xScale(d.date),
        y: y1,
        height: y2 - y1,
        // fill: isColored ? colorScale(d.avg) : "#ccc"
      };
    });
    
    return (
      <svg width={this.state.width} height={this.state.height}>
        {this.state.bars.map(d => (
          <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />
        ))}
        <g ref="xAxis" transform={`translate(0, ${this.state.height - this.state.margin.bottom})`} />
        <g ref="yAxis" transform={`translate(${this.state.margin.left}, 0)`} />
        <g ref="brush" />
      </svg>
    );
  }
}

export default Chart;

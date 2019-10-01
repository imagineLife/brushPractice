import React, { Component } from "react";
import * as d3 from "d3";

const Chart = (props) => {
  let [state, setState] = React.useState({
    bars: [],
    width :650,
    height :400,
    margin :{ top: 20, right: 5, bottom: 20, left: 35 },
    xScale: d3.scaleTime(),
    yScale: d3.scaleLinear(),
    colorScale : d3.scaleSequential(d3.interpolateSpectral),
    xAxis: d3.axisBottom(),
    yAxis: d3.axisLeft(),
    brushFn: null
  });

  let xAxisRef = React.useRef()
  let yAxisRef = React.useRef()
  let brushRef = React.useRef()

  React.useEffect(() => {
    let brushFn = d3
      .brushX()
      .extent([
        [state.margin.left, state.margin.top], //top left
        [state.width - state.margin.right, state.height - state.margin.top] //bottom right
      ])
      .on("end", () => {
        const [minX, maxX] = d3.event.selection;
        const range = [
          state.xScale.invert(minX),
          state.xScale.invert(maxX)
        ];
        props.updateRange(range);
      });

      setState(prevState => {
        let newObj = {brushFn}
        return {
          ...prevState,
          ...newObj
        }
      })
    
    // d3.select(brushRef).call(state.brushFn);
  }, [])

  React.useEffect(() => {
    console.log('EFFECT!');
    if(brushRef && brushRef.current && xAxisRef && xAxisRef.current && yAxisRef && yAxisRef.current){
      state.xAxis.scale(state.xScale);
      d3.select(xAxisRef.current).call(state.xAxis);
      state.yAxis.scale(state.yScale);
      d3.select(yAxisRef.current).call(state.yAxis);
      d3.select(brushRef.current).call(state.brushFn);
    }
  }, [props])

    
  let {data, range } = props

  if(!data || !range){
    return <p>loading data...</p>
  }
      //build scale-ranges
  const xScale = state.xScale.range([state.margin.left, state.width - state.margin.right]);
  const yScale = state.yScale.range([state.height - state.margin.bottom, state.margin.top]);
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
  
  return (
    <svg width={state.width} height={state.height}>
      {bars.map((d, idx) => (<rect key={`${idx}-${d.x}`} x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />))}
      <g ref={xAxisRef} transform={`translate(0, ${state.height - state.margin.bottom})`} />
      <g ref={yAxisRef} transform={`translate(${state.margin.left}, 0)`} />
      <g ref={brushRef} />
    </svg>
  );
}

export default Chart;

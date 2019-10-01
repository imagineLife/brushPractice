import React, { Component } from "react";
import "./index.css";
import RadialChart from "./components/RadialChart";
import Chart from "./components/Chart";

const App = () => {
  let [state, setState] = React.useState({
    temps: {},
    city: "sf", // city whose temperatures to show
    range: [] // time range set by the brush
  })

  React.useEffect(() => {
    Promise.all([
      fetch(`${process.env.PUBLIC_URL || ""}/sf.json`),
      fetch(`${process.env.PUBLIC_URL || ""}/ny.json`)
    ])
      .then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(([sf, ny]) => {
        sf.forEach(day => (day.date = new Date(day.date)));
        ny.forEach(day => (day.date = new Date(day.date)));

        setState(prevState => {
          let newObj = { temps: { sf, ny } }
          return {...prevState, ...newObj}
        });
      });
  }, [])

  let updateCity = e => {
    let newObj = { city: e.target.value }
    setState(prevState => { 
      return {...prevState, ...newObj}
    });
  };

  let updateRange = range => {
    let newObj = { range }
    setState(prevState => {
      return {...prevState, ...newObj}
    });
  };

  const data = state.temps[state.city];

  console.log('%c - - - App - - -', 'background-color: orange; color: white;')
  console.log('state')
  console.log(state)
  
  return (
    <div className="App">
      <h1>
        2017 Temperatures for
        <select name="city" onChange={updateCity}>
          {[
            { label: "San Francisco", value: "sf" },
            { label: "New York", value: "ny" }
            // {label: 'Amsterdam', value: 'am'},
          ].map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </h1>
      <p>
        *warning: these are <em>not</em> meant to be good examples of data
        visualizations,<br />
        but just to show the possibility of using D3 and React*
      </p>
      <RadialChart data={data} range={state.range} />
      <Chart data={data} 
        range={state.range} 
        updateRange = {updateRange}/> 
      <p>
        (Weather data from{" "}
        <a href="wunderground.com" target="_new">
          wunderground.com
        </a>)
      </p>
    </div>
  );
}

export default App;

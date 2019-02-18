import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { tsvParse } from 'd3-dsv';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

const BarChart = (props) => {
  const { svgWidth, svgHeight, data, svgElementsCB } = props;
  let svgElements = [];
  
  //Note: getting width and height from a variable rather than the elements attribute e.g. svg.attr("width")
  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;
  const label = 'label';
  const value = 'value';

  const x = scaleBand()
      .rangeRound([0, width])
      .padding(0.1),
    y = scaleLinear().rangeRound([height, 0]);

  x.domain(data.map(d => d[label]));
  y.domain([0, max(data, d => d[value])]);
  return (
    <svg height='100%'
      width='100%'  viewBox={`0 0 ${svgWidth}  ${svgHeight}`}>
      <g>
        <g
          className="axis axis--x"
          transform={`translate(0, ${height})`}
          ref={node => select(node).call(axisBottom(x))}
        />
        <g className="axis axis--y">
          <g ref={node => select(node).call(axisLeft(y).ticks(10, '%'))} />
          {/* Note: In the actual example 'Frequency' is a child of the above 'g' and it doesn't render. 
          * Changing it to a sibiling allows it to render and having the axis as an empty 'g' means that it will also play nicer with react:
          * "The easiest way to avoid conflicts is to prevent the React component from updating. You can do this by rendering elements that React has no reason to update, like an empty <div />."
          * https://reactjs.org/docs/integrating-with-other-libraries.html 
          */}
          <text transform="rotate(-90)" y="6" dy="0.71em" textAnchor="end">
            Frequency
          </text>
        </g>
        {data.map((d, i) => (
          <rect
            key={i}
            key={d[label]}
            className="bar"
            /* U need to store refference for every <rect> element and expose it outside 
               to chart.js for mouseover, click etc...
            */
            ref={ (ref) => {
              let currentRef = svgElements[i] = ref;
              svgElementsCB(currentRef,d);
            } }
            x={x(d[label])}
            y={y(d[value])}
            width={x.bandwidth()}
            height={height - y(d[value])}
          />
        ))}
      </g>
    </svg>
  );
};

export default BarChart;

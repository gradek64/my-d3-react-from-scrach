import React from 'react';
import * as d3 from 'd3';

const PieHolder = (props) => {
  const { svgWidth, data, type } = props;

  console.log('pie chart ', type);

  const svgElements = [];
  const colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'];

  const makePie = type => d3
    .pie()(data.map(({ value }) => value))
    .map(d => d3.arc()({
      startAngle: d.startAngle,
      endAngle: d.endAngle,
      innerRadius: type === 'donut' ? 100 : 0,
      outerRadius: svgWidth / 2 - 10,
      padAngle: type === 'donut' ? 0.03 : 0,
    }));
  // define event handlers on the parent holder component
  const onMouseOver = (e) => {
  };
  const onMouseOut = (e) => {

  };

  return (

    <svg
      height="100%"
      width="100%"
      viewBox={`0 0 ${svgWidth}  ${svgWidth}`}
    >
      <g transform={`translate(${svgWidth / 2},${svgWidth / 2})`}>
        {
          makePie(type).map((d, i) => (
            <path
              key={i}
              // changeViewClick is pass function from ChartComponents
              onClick={props.changeViewClick(data[i])}
              d={d}
              id={i}
              /* U need to store refference for every <rect> element and expose it outside
                to chart.js for mouseover, click etc...
                actually U dont need to cause react does better job to assign listener here just fount out;
                */
              ref={(ref) => {
                const currentRef = svgElements[i] = ref;
                // if(currentRef) svgElementsCB(currentRef,data[i]);
              }}
              onMouseOut={onMouseOut}
              onMouseOver={onMouseOver}
              style={{ fill: colors[i], opacity: '0.8' }}
            />))
        }
      </g>
    </svg>
  );
};
export default PieHolder;

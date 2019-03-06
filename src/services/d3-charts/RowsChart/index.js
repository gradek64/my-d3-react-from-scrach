import React from 'react';

// custom
import chartDataFormat from '../../charts-support/ChartFormatData';
import './rowsChart.scss';
import styles from '../charts_colors.scss';


const RowsChart = (props) => {
  const {
    svgWidth, svgHeight, data, changeViewClick,
  } = props;
  /* eslint-disable-next-line no-eval */
  const chartColorsSass = eval(`[${styles.chartColors}]`);
  // calculate total for perecentaga breakdown;
  const total = data.reduce((a, { value }) => a + value, 0);
  // calcuate percetage for column from value;
  const columnWidth = data.reduce((a, { value }, i) => {
    const accumulator = a;
    accumulator[`column${i}`] = (value / total) * 100;
    return accumulator;
  }, []);

  return (
    <div className="rowsChart">
      {data.map(({ percentage }, i) =>
        (
          <button
            style={{
              width: `${columnWidth[`column${i}`]}%`,
              backgroundColor: chartColorsSass[i],
              opacity: 0.7 + (Math.round(columnWidth[`column${i}`]) / 100),
            }}
            onClick={changeViewClick(data[i])}
            key={`rows${i}`}
          >
            { chartDataFormat.formatPercentage(percentage)}
          </button>))
      }
    </div>
  );
};

export default RowsChart;

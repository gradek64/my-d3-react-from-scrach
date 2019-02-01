import React from 'react';
import ChartHeader from './ChartHeader';


const Chart = (props) =>{

  const { tabActive, config} = props;
  const confCurrentTab = config[ tabActive ];
  const groubByButtons = confCurrentTab['groupByButtons'];
  const chartTypes = confCurrentTab['types'];
  console.log('groubByButtons',groubByButtons);

  return (
    <div className='chart'>
      <ChartHeader groubByButtons={groubByButtons} chartTypes={chartTypes}/>
    </div>
  );
};

export default Chart;
import React from 'react';
import ChartHeader from './ChartHeader';


const Chart = (props) =>{

  const { tabActive, config, page, isVariance} = props;
  const confCurrentTab = config[ tabActive ];
  const groubByButtons = { [tabActive]:  confCurrentTab['groupByButtons']};
  const chartTypes = { [tabActive]: confCurrentTab['types'] };

  return (
    <div className='chart'>
      <ChartHeader groubByButtons={groubByButtons} 
        tabActive={tabActive}
        chartTypes={chartTypes} 
        page={page} 
        isVariance={isVariance}/>
    </div>
  );
};

export default Chart;
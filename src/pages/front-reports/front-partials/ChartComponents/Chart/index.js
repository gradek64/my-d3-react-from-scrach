import React from 'react';
import BarChartService from '../../../../../services/d3-charts/BarChart';
import Resizer from '../../../../../services/d3-charts/Resizer';

const Chart = (props) => {

  const { data, params } = props;

  console.log(params);

  const getService = (type) => {
    switch (type) {
    case 'table':
      return tableService(scope);
    case 'pie':
    case 'donut':
      return pieService;
    case 'bar':
      return <BarChartService/>;
    case 'rows':
      return rowsService;
    case 'sunburst':
      return sunburstService;
    case 'sankey':
      return sankeyService;
    case 'chord':
      return chordService;
    case 'waterfall':
      return waterfallService;
    case 'percentage':
      return percentageService;
    case 'treemap':
      return treemapService;
    default:
      return null;
    }
  };

  const prepareData = data => data.reduce((a,e,i)=>{
      
    a[i]= e;
    a[i]['value'] = e['amount'];
    //label and genre;
    a[i]['id'].split(',').forEach((el,index,arr)=>{
      //remove empty spaces and extra charaters
      a[i]['genre']=arr[0]
        .trim()
        .replace(';','');
      a[i]['label']=arr[1]
        .trim()
        .replace(';','');
    });

    return a;
  },[]);

  const service = getService(params.typeSelected.value);
  return (
    <Resizer data={prepareData(data)}>
      {service}
    </Resizer>
  );
};

export default Chart;

import React from 'react';
import BarChartService from '../../../../../services/d3-charts/BarChart';
import PieChartService from '../../../../../services/d3-charts/PieChart';
import ReportsTableDataStructure from '../../../../../components/table-partials/dataStructure/ReportsTableDataStructure';
import Resizer from '../../../../../services/d3-charts/Resizer';

const Chart = (props) => {

  const { data, params } = props;

  console.log(params);

  const getService = (type) => {
    switch (type) {
    case 'pie':
    case 'donut':
      return <PieChartService/>;
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

  /*  this method is one level up in ChartComponent.js

  const onSVGElementClick = (data)=>(e)=>{
    console.log(e);
    console.log('data',data);
  };*/
  
  const svgElementsCB = (svgElement,data) => {
    console.log('svgElement',svgElement,data);
    if(svgElement) svgElement.addEventListener('click',props.changeView(data));

  };

  const service = getService(params.typeSelected.value);
  console.log('service', service);
  const resizerProps = {
    data:prepareData(data),
    type:params.typeSelected.value,
    svgElementsCB
  };
  return (
    <div className='chart-inner'>
      {params.typeSelected.value!=='table'?
        <Resizer {...resizerProps}>{service}</Resizer>:
        <ReportsTableDataStructure data={resizerProps.data} />
      }
    </div>
  );
};

export default Chart;

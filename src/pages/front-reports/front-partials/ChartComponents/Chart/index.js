import React from 'react';
import BarChartService from '../../../../../services/d3-charts/BarChart';
import PieChartService from '../../../../../services/d3-charts/PieChart';
import ReportsTableDataStructure from '../../../../../components/table-partials/dataStructure/ReportsTableDataStructure';
import Resizer from '../../../../../services/d3-charts/Resizer';

class Chart extends React.Component {
  state={
    dataChanged:false,
    dataState:this.props.data,
    listenerAdded:false
  }
  getService = (type) => {
    switch (type) {
    case 'pie':
    case 'donut':
      return <PieChartService/>;
    case 'bar':
      return <BarChartService/>;
    case 'table':
      return <ReportsTableDataStructure/>;
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
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):

    if (this.props.data !== prevProps.data) {

      console.log('this.props', this.props.data);
      console.log('prev', prevProps.data);
      this.setState({
        dataChanged:true,
        dataState:this.props.data,
      });
    }
  }

  componentDidMount(){
    this.setState({listenerAdded:true});
  }

 prepareData = data => data.reduce((a,e,i)=>{
      
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
 },[])

  /*  this method is one level up in ChartComponent.js

  const onSVGElementClick = (data)=>(e)=>{
    console.log(e);
    console.log('data',data);
  };*/
  
  svgElementsCB = (svgElement,data) => {

    if(this.state.listenerAdded){
      console.log('svgElement ONCE',svgElement);
      svgElement.addEventListener('click',this.props.changeView(data));
      this.setState({listenerAdded:false});
    } 
   

  };

  render(){
    const { data, params } = this.props;
    const { dataChanged, dataState } = this.state;

    const service = params?this.getService(params.typeSelected.value):null;
    const resizerProps = {
      data:dataState?this.prepareData(dataState):null,
      type:params?params.typeSelected.value:null,
      svgElementsCB:dataChanged?this.svgElementsCB:()=>{},
    };

    console.log('resizerProps',resizerProps);

    return (
      <div className='chart-inner'>
        {dataState?
          <Resizer {...resizerProps}>{service}</Resizer>:null     }
      </div>
    );
  }
}

export default Chart;
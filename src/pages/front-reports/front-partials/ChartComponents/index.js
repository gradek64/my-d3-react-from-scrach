import React from 'react';
import ChartHeader from './ChartHeader';
import Chart from './Chart';
import reportDataServiceMock from './../../../../services/reports-cost-data-mock';


class ChartComponents extends React.Component {
  state = {
    graphData:null,
    changeView:false,
    drillDownData:null,
    hasData:false
  }
  drill = (data)=>data?data:null;

  getData = async (params) => {
    const data = await reportDataServiceMock.getAll();
    this.setState({
      graphData:data.data,
      hasData:true,
      params
    },()=>{
      console.log('graphData is called');
    });
  }

  onChartInnerClose = (e) => {
    console.log('here');
    this.setState({changeView:false});
    //enlarge currrent chart;
    const currentChart = document.querySelector('.chart-inner');
    currentChart.classList.remove('shrink');
  }

  onSVGElementClick = (data)=>(e)=>{
    //shrink currrent chart;
   
    
    this.setState({
      changeView:true,
      drillDownData:[data],
    },()=>{
      console.log('data......',this.state.drillDownData);
    });

    console.log('data from click',data);

    const currentChart = document.querySelector('.chart-inner');
    currentChart.classList.add('shrink');

  };

  render(){

    const { tabActive, config, page, isVariance} = this.props;
    const confCurrentTab = config[ tabActive ];
    const groubByButtons = { [tabActive]:  confCurrentTab['groupByButtons']};
    const chartTypes = { [tabActive]: confCurrentTab['types'] };

    const { graphData, drillDownData, params, changeView , hasData} = this.state;

    console.log('rendering....');


    const tableDrillDown = Object.assign({},params);
    tableDrillDown.typeSelected = {
      id: 1,
      label: 'Table',
      materialIcon: 'grid_on',
      selected: true,
      value: 'table',
    };

    return (
      <div className='chart'>
        <ChartHeader groubByButtons={groubByButtons} 
          tabActive={tabActive}
          chartTypes={chartTypes} 
          page={page} 
          onChartInnerClose={this.onChartInnerClose}
          changeView={changeView}
          getData={this.getData}
          isVariance={isVariance}/>

        {/* display once data is received*/}
        {
          <Chart data={graphData} params={params} hasData={hasData} changeView={this.onSVGElementClick} />
        }
        {
          changeView?<Chart data={drillDownData} params={tableDrillDown}/>:null
        }
        {/*<DrillDownChart data={this.state.drillDownData} params={tableDrillDown} />*/}
      
      </div>
    );
  }
}

export default ChartComponents;
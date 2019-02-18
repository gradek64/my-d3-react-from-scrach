import React from 'react';
import ChartHeader from './ChartHeader';
import Chart from './Chart';
import reportDataServiceMock from './../../../../services/reports-cost-data-mock';


class ChartComponents extends React.Component {
  state = {
    graphData:null,
    changeView:false
  }
  getData = async (params) => {
    const data = await reportDataServiceMock.getAll();
    this.setState({
      graphData:data.data,
      params
    });
  }

  onChartInnerClose = (e) => {
    this.setState({changeView:false});
    //enlarge currrent chart;
    const currentChart = document.querySelector('.chart-inner');
    currentChart.classList.remove('shrink');
  }

  onSVGElementClick = (data)=>(e)=>{
    this.setState({changeView:true});
    //shrink currrent chart;
    const currentChart = document.querySelector('.chart-inner');
    currentChart.classList.add('shrink');
  };

  render(){

    const { tabActive, config, page, isVariance} = this.props;
    const confCurrentTab = config[ tabActive ];
    const groubByButtons = { [tabActive]:  confCurrentTab['groupByButtons']};
    const chartTypes = { [tabActive]: confCurrentTab['types'] };

    const { graphData, params, changeView } = this.state;

    console.log('params', params);

    const tableDrillDown = Object.assign({},params);
    tableDrillDown.typeSelected = {
      id: 1,
      label: 'Table',
      materialIcon: 'grid_on',
      selected: true,
      value: 'table',
    };

    console.log('tableDrillDown',tableDrillDown);

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
        {graphData?
          <Chart data={graphData} params={params} changeView={this.onSVGElementClick} />
          :null}
        {changeView?
          <Chart data={graphData} params={tableDrillDown}  />
          :null}
      </div>
    );
  }
}

export default ChartComponents;
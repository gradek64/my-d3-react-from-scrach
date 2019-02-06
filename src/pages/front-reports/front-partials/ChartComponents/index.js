import React from 'react';
import ChartHeader from './ChartHeader';
import Chart from './Chart';
import reportDataServiceMock from './../../../../services/reports-cost-data-mock';


class ChartComponents extends React.Component {
  state = {
    graphData:null
  }
  getData = async (params) => {
    const data = await reportDataServiceMock.getAll();
    this.setState({
      graphData:data.data,
      params
    });
  }

  render(){

    const { tabActive, config, page, isVariance} = this.props;
    const confCurrentTab = config[ tabActive ];
    const groubByButtons = { [tabActive]:  confCurrentTab['groupByButtons']};
    const chartTypes = { [tabActive]: confCurrentTab['types'] };

    const { graphData, params } = this.state;

    return (
      <div className='chart'>
        <ChartHeader groubByButtons={groubByButtons} 
          tabActive={tabActive}
          chartTypes={chartTypes} 
          page={page} 
          getData={this.getData}
          isVariance={isVariance}/>

        {/* display once data is received*/}
        {graphData?
          <Chart data={graphData} params={params} />
          :null}
      </div>
    );
  }
}

export default ChartComponents;
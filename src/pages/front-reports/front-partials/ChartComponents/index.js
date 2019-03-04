import React from 'react';
import PropTypes from 'prop-types';

import ChartHeader from './ChartHeader';
import Chart from './Chart';
import reportDataServiceMock from './../../../../services/reports-cost-data-mock';

/** ***************************************************************

  this compoent has to be statefull (class) cause it is waiting for data callback
  as well as changes state for showing and hiding specific d3/table graphs

/**************************************************************** */

class ChartComponents extends React.Component {
  state = {
    graphData: null,
    changeView: false,
    drillDownData: null,
  }

  onChartInnerClose = (e) => {
    this.setState({ changeView: false });
    // enlarge currrent chart;
    const currentChart = document.querySelector('.chart-inner');
    currentChart.classList.remove('shrink');
  }
  /*
    *@method below onSVGElementClick is curried and attached to onClick={changeViewClick}
    *@all way down to d3 services charts;
  */
  onSVGElementClick = data => (e) => {
    console.log('data after click', data);
    // shrink currrent chart;
    this.setState({
      changeView: true,
      drillDownData: [data],
    });
    const currentChart = document.querySelector('.chart-inner');
    currentChart.classList.add('shrink');
  }
  // get data;
  getData = async (params) => {
    const data = await reportDataServiceMock.getAll();
    this.setState({
      graphData: data.data,
      params,
    });
  }

  render() {
    const {
      tabActive, config, page, isVariance,
    } = this.props;
    const confCurrentTab = config[tabActive];
    const groubByButtons = { [tabActive]: confCurrentTab.groupByButtons };
    const chartTypes = { [tabActive]: confCurrentTab.types };

    const {
      graphData, drillDownData, params, changeView,
    } = this.state;

    const tableDrillDown = Object.assign({}, params);
    tableDrillDown.typeSelected = {
      id: 1,
      label: 'Table',
      materialIcon: 'grid_on',
      selected: true,
      value: 'table',
    };

    return (
      <div className="chart">
        <ChartHeader
          groubByButtons={groubByButtons}
          tabActive={tabActive}
          chartTypes={chartTypes}
          page={page}
          onChartInnerClose={this.onChartInnerClose}
          changeView={changeView}
          getData={this.getData}
          isVariance={isVariance}
        />

        {/* display once data is received */}
        {graphData ? <Chart data={graphData} params={params} changeViewClick={this.onSVGElementClick} /> : null}

        {/* drilldown graph */}
        {/* changeView?<Chart data={drillDownData} params={params}  changeViewClick={this.onSVGElementClick}/>:null */}

        {/* for now U want only table */}
        {changeView ? <Chart data={drillDownData} params={tableDrillDown} /> : null}

      </div>
    );
  }
}

ChartComponents.propTypes = {
  tabActive: PropTypes.string.isRequired,
  config: PropTypes.instanceOf(Object).isRequired,
  page: PropTypes.string.isRequired,
  isVariance: PropTypes.bool.isRequired,
};

/* ChartComponents.defaultProps = {
   tabActive: PropTypes.instanceOf(Array),
  config: PropTypes.instanceOf(Function),
  page: PropTypes.instanceOf(Function),
  isVariance: PropTypes.instanceOf(Function),
}; */

export default ChartComponents;

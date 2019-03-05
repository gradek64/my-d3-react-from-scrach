import React from 'react';
import PropTypes from 'prop-types';
import BarChartService from '../../../../../services/d3-charts/BarChart';
import PieChartService from '../../../../../services/d3-charts/PieChart';
import RowsService from '../../../../../services/d3-charts/RowsChart';
// eslint-disable-next-line max-len
import ReportsTableDataStructure from '../../../../../components/table-partials/dataStructure/ReportsTableDataStructure';
import Resizer from '../../../../../services/d3-charts/Resizer';

const Chart = (props) => {
  const getService = (type) => {
    switch (type) {
    case 'pie':
    case 'donut':
      return <PieChartService />;
    case 'bar':
      return <BarChartService />;
    case 'table':
      return <ReportsTableDataStructure />;
    case 'rows':
      return <RowsService />;
      /* case 'sankey':
      return sankeyService;
    case 'chord':
      return chordService;
    case 'waterfall':
      return waterfallService;
    case 'percentage':
      return percentageService;
    case 'treemap':
      return treemapService; */
    default:
      return null;
    }
  };

  const prepareData = data => data.reduce((a, e, i) => {
    const accumulator = a;
    accumulator[i] = e;
    accumulator[i].value = e.amount;
    // label and genre;
    accumulator[i].id.split(',').forEach((el, index, arr) => {
      // remove empty spaces and extra charaters
      accumulator[i].genre = arr[0]
        .trim()
        .replace(';', '');
      accumulator[i].label = arr[1]
        .trim()
        .replace(';', '');
    });

    return accumulator;
  }, []);

  /*
    *@ Initila idea was to add click eventListener to DOM of svg diagram
    *@ but that created and issue with reassigning event multiple time
    *@ MOREOVER and more IMPORTANT is that React already takes care of addig events and canceling them
    *@ with the usage of Synthetic event so add onClick={callback} once diagram is being rendered;
  */
  /* const svgElementsCB = (svgElement,data) => {
      svgElement.addEventListener('click',(data));
      this.setState({listenerAdded:false});
  }; */

  const { data, params } = props;
  const service = params ? getService(params.typeSelected.value) : null;
  const resizerProps = {
    data: prepareData(data),
    type: params.typeSelected.value,
    // below is pass function from ChartComponents
    changeViewClick: props.changeViewClick,
  };
  return (
    <div className="chart-inner">
      {data ?
        <Resizer {...resizerProps}>{service}</Resizer> : null }
    </div>
  );
};


Chart.propTypes = {
  data: PropTypes.instanceOf(Array),
  params: PropTypes.instanceOf(Object),
  changeViewClick: PropTypes.instanceOf(Function),

};

Chart.defaultProps = {
  data: [],
  params: {},
  changeViewClick: () => {},
};

export default Chart;

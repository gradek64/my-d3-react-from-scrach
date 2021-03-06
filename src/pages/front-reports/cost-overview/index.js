import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
// page Configuration;
import { pageConfiguration } from './cost-overview-config';
import ReportsMenuSubLinks from '../front-partials/ReportsMenuSubLinks';
import ChartComponents from '../front-partials/ChartComponents/';
import './page-content.scss';


/* const pageConfigurationArray =Object.keys(pageConfiguration).reduce((a,key,i)=>{
  a[i]=pageConfiguration[key];
  return a;
},[]); */

const CostOverview = (props) => {
  const page = 'cost-overwiew';
  const isVariance = false;
  const { activeTab } = props;
  // const adjustReportLinks = ({ reportsMenuSubLinks }) =>
  // adjust links for a page;
  // reportsMenuSubLinks.map((link) => link.href = '/'.concat(link.href));
  // listen for routes changes; it takes (location, action) if needed

  /*
     adjustReportLinks is used every single time navLink is called
     so this method is not being used as intended with map */
  //   reportsMenuSubLinks;
  return (
    <div>
      <ReportsMenuSubLinks
        /* ReportsMenuSubLinks is re-render everytime you click on NavLink */
        linkActive={activeTab || 'general-ledger'}
        configuration={pageConfiguration}
      />
      {/* chart info */}
      <div className="page-content">
        <Typography variant="h3" gutterBottom>
          {`Breakdown by ${activeTab}`}
        </Typography>
        <Typography variant="h5" gutterBottom color="secondary">
          {/* eslint-disable-next-line max-len */}
          {'Chart showing total IT costs allocated to the departed per selected attribute contained in the General Ledger input data.'}
        </Typography>
        {/* chart components for rednering */}
        <ChartComponents
          config={pageConfiguration}
          className="chart-componet"
          tabActive={activeTab || 'general-ledger'}
          page={page}
          isVariance={isVariance}
        />
      </div>
    </div>
  );
};

CostOverview.propTypes = {
  activeTab: PropTypes.string,
};

CostOverview.defaultProps = {
  activeTab: 'general-ledger',
};

export default CostOverview;

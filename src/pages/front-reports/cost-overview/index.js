import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ReportsMenuSubLinks from '../front-partials/ReportsMenuSubLinks';
import ChartDiscription from '../front-partials/ChartDiscription';
import Chart from '../front-partials/Chart/';


//page Configuration;
import { pageConfiguration } from './cost-overview-config';


/*const pageConfigurationArray =Object.keys(pageConfiguration).reduce((a,key,i)=>{
  a[i]=pageConfiguration[key];
  return a;
},[]);*/

const CostOverview = (props) => {

  const page = 'cost-overwiew';
  const isVariance = false; 
  const { activeTab } = props;
  const adjustReportLinks = ({reportsMenuSubLinks}) => {
    //adjust links for a page;
    //reportsMenuSubLinks.map((link) => link.href = '/'.concat(link.href));
    //listen for routes changes; it takes (location, action) if needed

    //adjustReportLinks is used every single time navLink is called so this method is not being used as intended with map 
    return reportsMenuSubLinks;
  };
  
  return (
    <div>
      <ReportsMenuSubLinks 
        /*ReportsMenuSubLinks is re-render everytime you click on NavLink*/
        linkActive={activeTab?activeTab:'general-ledger'}
        configuration={ pageConfiguration } 
        /* just for science experiment assing already set prop to stop them from reasigning links*/
      />
      <ChartDiscription config={ pageConfiguration } tabActive={activeTab?activeTab:'general-ledger'}/>
      <Chart config={ pageConfiguration } tabActive={activeTab?activeTab:'general-ledger'} page={page} isVariance={isVariance}/>
    </div>
  );
};

export default   CostOverview;

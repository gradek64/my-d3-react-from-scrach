import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ReportsMenuSubLinks from '../front-partials/ReportsMenuSubLinks';
import ChartDiscription from '../front-partials/ChartDiscription';
import DropDownCovered from './dropDownCovered';


//page Configuration;
import { pageConfiguration } from './cost-overview-config';




const CostOverview = (props) => {


  const { activeTab } = props;
  const adjustReportLinks = ({reportsMenuSubLinks}) => {
    console.log('....it will rerun but not mount again........', activeTab);
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
     
      <DropDownCovered />
    </div>
  );
};

export default   CostOverview;

import React from 'react';
import Typography from '@material-ui/core/Typography';
import ReportsMenuSubLinks from '../front-partials/ReportsMenuSubLinks';
import ChartDiscription from '../front-partials/ChartDiscription';
import ChartComponents  from '../front-partials/ChartComponents/';


//page Configuration;
import { pageConfiguration } from './cost-overview-config';
import './page-content.scss';


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
      {/* chart info*/}
      <div className='page-content'>
        <Typography variant="h3" gutterBottom>
          {`Breakdown by ${activeTab}`}
        </Typography>
        <Typography variant="h5" gutterBottom color='secondary'>
          {'Chart showing total IT costs allocated to the departed per selected attribute contained in the General Ledger input data.'}
        </Typography>
        <ChartComponents 
          config={ pageConfiguration } 
          className='chart-componet'
          tabActive={activeTab?activeTab:'general-ledger'} 
          page={page} 
          isVariance={isVariance}/>
      </div>
    </div>
  );
};

export default CostOverview;

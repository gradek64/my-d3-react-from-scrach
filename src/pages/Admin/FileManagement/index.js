import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SimpleTable from '../../../components/SimpleTable';
import { withRouter } from 'react-router-dom';
import costModelService from '../../../services/cost-model-mock';
import events from '../../../utils/events';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ModalCustom from '../../../customized-vendors/modalVendor';
import costpotsMockService from '../../../services/costpots-mock';
import fileTypesMockService from '../../../services/filetypes-mock';
import filesMockService from '../../../services/files-mock';
import AppBar from '@material-ui/core/AppBar';
import DropDownSelect from '../../../components/selectDropdown';
import UploadFileForm from './fileUploadForm/uploadFileForm';
import {emit} from '../../../utils/events';

import './fileManagement.scss';

class CostModel extends React.Component {

breadcrumbsLinks = [];
state = {
  data:null

}

async componentDidMount(){

  const { costModelId, costPotId } = this.props;

  this.breadcrumbsLinks = [
    {
      href: '/admin/cost-models',
      label: 'Cost Models',
    },
    {
      href: '/admin/cost-models/' + costModelId + '/costpots',
      label: 'Model Config',
    },
    {
      href:
              '/admin/cost-models/' +
              costModelId +
              '/costpots/' +
              costPotId +
              '/file-management',
      label: 'File Management',
    },
  ];

  const currentCostPot = await costpotsMockService.getAll(costModelId)
    .then((res)=>res.data)
    .then((costPots)=>costPots.find(
      (current)=>current.id === Number(costPotId)
    ));
  //set costPot Name;
  this.setState({costPotName:currentCostPot.name});

  //get filesTypes for current CostPot
  const fileTypes = await fileTypesMockService.getAll(currentCostPot.resourceTypeId)
    .then((res) => res.data);
    // ? scope.fileTypeItems = scope.fileTypes.map(buildFileTypeItem);

  //get files fro current Costpot
  const files = await filesMockService.getAll(fileTypes).then((res) => res.data);
  this.setState(() => ({data:files}));
}

/*if(this.state.data){
    return (
      <SimpleTable data={this.state.data} />
    );
  }else {
    return '....preloading';
  }*/

render(){
  const {costPotName, data } = this.state;

  return (
    <div className='fileManagement'>
      <AppBar position="static" color="default" className='breadcrumbsLinks'>

        <div >
          <Typography component="h6" variant="subtitle1" gutterBottom>
            {
              /*avoid using <a> tags cause they reload entire page causing lag use NavLink instead*/
              this.breadcrumbsLinks.map(({href, label},id)=>
                (
                  <NavLink to={href} key={`bread${id}`}>
                    {label} 
                    {(id!==this.breadcrumbsLinks.length-1) ?' > ':null}
                  </NavLink>
                )
              )
            }
          </Typography>
        </div>
      </AppBar>
      <div className='pageTop'>
        <Typography component="h4" variant="h4" gutterBottom>
                  File Management for {costPotName?costPotName:'...loading'}
        </Typography>
        <Button variant="contained" color="primary" onClick={()=>{events.emit('OPEN_MODAL');}} >Upload file</Button>
      </div>
      {data?<SimpleTable data={data} pageTableOn={'fileManagement'} />:'....preloading' }
      {/*end of files  table data*/}
      
      {/*upload File Modal*/}
      <div>
        <ModalCustom isOpen={false} >
          <UploadFileForm />
        </ModalCustom>
      </div>
      {/*end of upload File Modal*/}
      
    </div>
  );
}
   
    
}
export default withRouter(CostModel);

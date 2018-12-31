import React from 'react';
import Button from '@material-ui/core/Button';
import SimpleTable from '../../../components/SimpleTable';
import { withRouter } from 'react-router-dom';
import costModelService from '../../../services/cost-model-mock';
import events from '../../../utils/events';
import Typography from '@material-ui/core/Typography';
import ModalCustom from '../../../components/modal';
import costpotsMockService from '../../../services/costpots-mock';
import fileTypesMockService from '../../../services/filetypes-mock';
import filesMockService from '../../../services/files-mock';
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
      
      <div className='breadcrumbsLinks'>
        {
          this.breadcrumbsLinks.map(({href, label},id)=>
            (
              <a href={href} key={`bread${id}`} >{label} 
                {(id!==this.breadcrumbsLinks.length-1) ?'>':null}</a>
            )
          )
        }
      </div>
      <div className='pageTop'>
        <Typography component="h2" variant="h2" gutterBottom>
                  File Management for {costPotName?costPotName:'...loading'}
        </Typography>
        <Button variant="contained" color="primary" onClick={()=>{events.emit('CLICK_ON_CREATE_COST_MODEL');}}>Upload File</Button>
      </div>
  
      {/*files table data*/}
      {data?<SimpleTable data={data} pageTableOn={'fileManagement'} />:'....preloading' }
      {/*end of files  table data*/}
      
      {/*upload File Modal*/}
      <div>
        <ModalCustom isOpen={false} opts={{
          shownOn:'CLICK_ON_CREATE_COST_MODEL',
          hideOn:'CLICK_ON_CANCEL_COST_MODEL' 
        }}>
          <Typography component="h2" variant="h2" gutterBottom>
                  are you sure U want to delete {this.state.costPotToDelete}
          </Typography>
          <Button variant="contained" color="primary" onClick={()=>{events.emit('CLICK_ON_CANCEL_COST_MODEL');}}>Cancel Modal</Button>
          <Button variant="contained" color="primary" onClick={()=>{events.emit('CLICK_ON_CANCEL_COST_MODEL');}}>Cancel Modal</Button>
        </ModalCustom>
      </div>
      {/*end of upload File Modal*/}
    </div>
  );
}
   
    
}
export default withRouter(CostModel);

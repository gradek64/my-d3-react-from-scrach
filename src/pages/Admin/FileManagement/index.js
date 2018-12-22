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
import './fileManagement.scss';

class CostModel extends React.Component {
state = {
  data:null

}
async componentDidMount(){

  const { costModelId, costPotId } = this.props;

  const currentCostPot = await costpotsMockService.getAll(costModelId)
    .then((res)=>res.data)
    .then((costPots)=>costPots.find(
      (current)=>current.id === Number(costPotId)
    ));
  //set costPot Name;
  this.setState({costPotName:currentCostPot.name});

  //get files for current CostPot
  const fileTypes = await fileTypesMockService.getAll(currentCostPot.resourceTypeId)
    .then((res) => res.data);
    // ? scope.fileTypeItems = scope.fileTypes.map(buildFileTypeItem);

  console.log('fileTypes', fileTypes);

  //to do fill the table with below request
  /* if (!scope.fileTypes) {
    return;
  }
  scope.isLoading = true;

  // filesService
  filesMockService
    .getAll(scope.fileTypes, $scope.tableState, $scope.costpot.id)
    .then((result) => {
      scope.items = result.data;
      console.log('files back', result.data);
      if (scope.items.length === 0) {
        scope.errorOrNoData = 'No files have been uploaded';
      }
    })
    .catch((err) => {
      console.log('ERROR: ', err);
      scope.errorOrNoData = 'There is an error. See console log.';
    })
    .finally(() => {
      scope.isLoading = false;
    });*/



  const dataResponsone = await costModelService.getAll();
  const data = dataResponsone.data;
  this.setState(() => ({ data }));
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
    
      <div className='pageTop'>
        <Typography component="h2" variant="h2" gutterBottom>
                  File Management for {costPotName?costPotName:'...loading'}
        </Typography>
        <Button variant="contained" color="primary" onClick={()=>{events.emit('CLICK_ON_CANCEL_COST_MODEL');}}>Upload File</Button>
      </div>
  
      {/*files table data*/}
      {data?<SimpleTable data={data} />:'....preloading'}
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

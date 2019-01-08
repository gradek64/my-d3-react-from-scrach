import React from 'react';
import Button from '@material-ui/core/Button';
import SimpleTable from '../../../components/SimpleTable';
import { withRouter } from 'react-router-dom';
import costModelService from '../../../services/cost-model-mock';
import Typography from '@material-ui/core/Typography';
import ModalCustom from '../../../customized-vendors/modalVendor';
import DataSetFiltersCreateForm  from './createDataSetFilForm/dataSetFiltersCreateForm';
import costpotsMockService from '../../../services/costpots-mock';
import fileTypesMockService from '../../../services/filetypes-mock';
import filesMappingMockService from '../../../services/filesMapping-mock';
import filesMockService from '../../../services/files-mock';
import events from '../../../utils/events';


import './dataSetFilters.scss';

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
      label: 'DataSet Filters',
    },
  ];

  //display filters in the table;
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

  //get file Mapping; 
  const fileMapping = await filesMappingMockService.getAll('common').then((res) => res.data);

  //get ration files
  const getRatioFiles = (costpot) => {
    fileTypesMockService
      .getAll(costpot.resourceTypeId)
      .then(
        (res) => res.data.filter((fileType) => fileType.code === 'RATIO'))
      .then((ratioTypes) =>
        filesMockService.getAll(ratioTypes).then((res) => res.data)
      )
      .then((files) =>
        files.filter((e) => e.active && e.status === 'CONFIGURED')
      )
      .then((files) => {
        $scope.ratioItems = files.map(buildRatiofiles);

        console.log('$scope.ratioItems', $scope.ratioItems);
      });
  };
  const buildRatiofiles = (e) => {
    return {
      label: e.fileName,
      value: {fileId: e.id},
    };
  };
  const fileTypeRatio = fileTypes.filter((fileType) => fileType.code === 'RATIO' );
  const filesRatio = await filesMockService.getAll(fileTypeRatio);
  const filesRatioConfiguredActive = filesRatio.data.filter((e) => e.active && e.status === 'CONFIGURED');
  const ratioItems = filesRatioConfiguredActive.map(buildRatiofiles);



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
    <div className='dataset-filters'>
      
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
                  DataSet Filters for {costPotName?costPotName:'...loading'}
        </Typography>
        <Button variant="contained" color="primary" onClick={()=>{events.emit('OPEN_MODAL');}} >Create New</Button>
      </div>
      {data?<SimpleTable data={data} pageTableOn={'fileManagement'} />:'....preloading' }
      {/*end of files  table data*/}
      
      {/*create dataset filter Modal*/}
      <div>
        <ModalCustom isOpen={false} >
          <DataSetFiltersCreateForm costPot={costPotName}/>
        </ModalCustom>
      </div>
      {/*end of upload File Modal*/}
    </div>
  );
}
   
    
}
export default withRouter(CostModel);

import React from 'react';
import Button from '@material-ui/core/Button';
import SimpleTable from '../../../components/SimpleTable';
import { withRouter } from 'react-router-dom';
import costModelService from '../../../services/cost-model-mock';
import events from '../../../utils/events';
import Typography from '@material-ui/core/Typography';
import ModalCustom from '../../../customized-vendors/modalVendor';
import costpotsMockService from '../../../services/costpots-mock';
import fileTypesMockService from '../../../services/filetypes-mock';
import filesMockService from '../../../services/files-mock';
import DropDownSelect from '../../../components/selectDropdown';
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
        <Button variant="contained" color="primary" onClick={()=>{events.emit('OPEN_MODAL');}} >Upload file</Button>
      </div>
      {data?<SimpleTable data={data} pageTableOn={'fileManagement'} />:'....preloading' }
      {/*end of files  table data*/}
      
      {/*upload File Modal*/}
      <div>
        <ModalCustom isOpen={false} >
          <form name="form1" ng-submit="onSubmit(formObj1,'upload'); $event.preventDefault();">
            <div className="modal-content">
              <Typography component="h2" variant="h2" gutterBottom>
                  Upload File
              </Typography>
              <div data-ng-show="error" className="card-panel red lighten-2 z-depth-0">
                <span className="white-text">error</span>
              </div>
              <div className="f-body">
                <div className="input-field">
                  <DropDownSelect 
                    label={'File type'}
                    options = {[
                      {value:10,optionName:'Greg'},
                      {value:20,optionName:'Libby'},
                      {value:30,optionName:'Katarzyna'},
                    ]}
                  />
                  {/*<dropdown-select text="Please select" label="File Type" name="fileType" ng-model="formObj1.fileType"
                    class-name="{invalid: (form1.$submitted && !formObj1.fileType),
                                                    valid: (form1.$submitted && formObj1.fileType)}"
                    items="fileTypeItems" reset-factory="dropdownResetFactory('resetTemplate')"></dropdown-select>*/}
                </div>
                <div className="file-field input-field" ng-model="formObj1.files">
                  <div className="btn">
                    <span>File</span>
                    <input type="file" id="file-input" name="fileInput6180" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path" type="text" name="fileName" ng-model="formObj1.fileName"
                      ng-class="{invalid: (form1.$submitted && !formObj1.fileName),
                                            valid: (form1.$submitted && formObj1.fileName)}" />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="create btn waves-effect waves-light">Upload</button>
              <a href="#!" ng-click="emit('CLOSE_MODAL'); $event.preventDefault();"
                className="cancel btn-flat waves-effect waves-red">Cancel</a>
            </div>
          </form>
        </ModalCustom>
      </div>
      {/*end of upload File Modal*/}
    </div>
  );
}
   
    
}
export default withRouter(CostModel);

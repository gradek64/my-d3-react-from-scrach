import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ModalCustom from '../../../customized-vendors/modalVendor';
import Typography from '@material-ui/core/Typography';
import SimpleTable from '../../../components/SimpleTable';
import costModelService from '../../../services/cost-model-mock';
import CreateCostModel from './CreateCostModelForm/CreateCostModelForm';
import UpdateCostModel from './UpdateCostModelForm/updateCostModelForm';
import DropDownSelect from '../../../components/selectDropdown';
import events from '../../../utils/events';


import './costModelPage.scss';

class CostModel extends React.Component {
state = {
  data:null,
  costPotToDelete:null,
  costPotToDeleteID:null,
  selectDropdownData:null,
  breadcrumbsLinks:[],
}

buildSelectItem = ({name, type, parentConfigurationId}) => {
  return {
    value:parentConfigurationId,
    optionName:name,
    type,
  };
}
async componentDidMount(){

  //temporary execute populate database with CostModel;
  //costModelService.populate();
  
  const dataResponsone = await costModelService.getAll();
  //const data = dataResponsone.data.filter((el,index)=>index <=6);
  const data = dataResponsone.data;
  const selectDropdownData = data.map(this.buildSelectItem);



  this.setState(() => ({ data, selectDropdownData}));

  this.setState({
    breadcrumbsLinks:[
      {
        href: '/admin/cost-models',
        label: 'Cost Models',
      }
    ]});

}

onSubmit = (form) => {
  console.log(form);
}
deleteInDatabaseCall = async (data) => {
  await costModelService.override(data);
}
onDelete = async (costPotID) => {

  //find array index from costPots array;
  const arrayIndex = this.state.data.findIndex((arrEl)=>arrEl.id === costPotID);
  //update state
  this.setState((prevState) => ({
    data: [...prevState.data.slice(0,arrayIndex), ...prevState.data.slice(arrayIndex+1)]
  }),()=>{
    //update database with override
    this.deleteInDatabaseCall(this.state.data);
  });
  //close modal
  events.emit('CLOSE_MODAL');
  
}

getCostPotName = ({name, costPotId}) => {
  this.setState(() => ({ 
    costPotToDelete:name,
    costPotToDeleteID:costPotId
  })
  );
}

render(){
  const { breadcrumbsLinks, costPotToDelete } = this.state;

  return ( 
    <div className='costModelPage'>
      <AppBar position="static" color="default" className='breadcrumbsLinks'>
        <div >
          <Typography component="h6" variant="subtitle1" gutterBottom>
            {
            /*avoid using <a> tags cause they reload entire page causing lag use NavLink instead*/

              breadcrumbsLinks.map(({href, label},id)=>
                (
                  <a href={href} key={`bread${id}`} >{label} 
                    {(id!==breadcrumbsLinks.length-1) ?'>':null}</a>
                )
              )
            }
          </Typography>
        </div>
      </AppBar>

      {/*pae title and button for creating costmodel*/}
      <div className='pageTop'>
        <Typography component="h4" variant="h4" gutterBottom>
                  Costpots
        </Typography>
        <Button variant="contained" color="primary" onClick={()=>{events.emit('OPEN_MODAL');}} >Create CostModel</Button>
      </div>

      {/*display table here*/}
      {this.state.data?this.state.data.length:null}
      {this.state.data?
        <div>
          <SimpleTable data={this.state.data} pageTableOn={'costModels'} />
          <div>
            <ModalCustom isOpen={false} >
              <CreateCostModel selectDropdownData={this.state.selectDropdownData} onSubmit={this.onSubmit}/>
            </ModalCustom>
            <ModalCustom isOpen={false} eventToTrigger={'OPEN_MODAL_SECOND'}>
              <UpdateCostModel selectDropdownData={this.state.selectDropdownData} onSubmit={this.onSubmit}/>
            </ModalCustom>
            <ModalCustom isOpen={false} eventToTrigger={'OPEN_MODAL_THIRD'} receiveEventPayload={this.getCostPotName}>
              <Typography component="h3" variant="h3" gutterBottom style={{textAlign:'center'}}>
                  are you sure U want to delete { costPotToDelete }?
              </Typography>
              <Button variant="contained" color="primary" className='buttonConfirm' onClick={()=>{ this.onDelete( this.state.costPotToDeleteID);} }>Delete</Button>
              <Button variant="contained" color="primary" className='buttonCancel' onClick={()=>{events.emit('CLOSE_MODAL');}}>Cancel</Button>
            </ModalCustom>

          </div>
        </div>
        :'....preloading'}

    </div>
  );
}
   
    
}
export default CostModel;
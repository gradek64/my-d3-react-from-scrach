import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ModalCustom from '../../../customized-vendors/modalVendor';
import Typography from '@material-ui/core/Typography';
import SimpleTable from '../../../components/SimpleTable';
import costModelService from '../../../services/cost-model-mock';
import CreateCostModel from './CreateCostModelForm/createCostModelForm';
import UpdateCostModel from './UpdateCostModelForm/UpdateCostModelForm';
import DropDownSelect from '../../../components/selectDropdown';
import events from '../../../utils/events';


import './costModelPage.scss';

class CostModel extends React.Component {
state = {
  data:null,
  selectedCostPot:null,
  selectedCostPotID:null,
  selectDropdownData:null,
  breadcrumbsLinks:[],
}

buildSelectItem = ({name, type, configurationNumber}) => {
  return {
    value:configurationNumber,
    optionName:name,
    type,
  };
}
async componentDidMount(){

  //temporary execute populate database with CostModel;
  //costModelService.populate();
  
  const dataResponsone = await costModelService.getAll();
  //const data = dataResponsone.data.filter((el,index)=>index <=4);
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

overrideDataBase = async (data) => {
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
    this.overrideDataBase(this.state.data);
  });
  //close modal
  events.emit('CLOSE_MODAL');
  
}

onCreate = (item) => {
  //update data in state; (recommeded way of update)
  this.setState({ data: [...this.state.data, item] }
  //callback from state
    ,()=>{
      this.overrideDataBase(this.state.data);
    }); 
  //close Modal
  events.emit('CLOSE_MODAL');
}
updateDatabaseOnUpdate = async (id,item) => {
  await costModelService.update(id,item);
}

onUpdate = (costPotID,{name}) => {
  let updateObject;
  const updateModelArr = this.state.data.map((costModel) => {
    if (costModel.id===costPotID) {
      updateObject = {...costModel,name}; 
      return updateObject;
    }
    else { return costModel; } 
  }
  );
  this.setState(()=>{
    return {
      data:[...updateModelArr]
    };
  },()=>{
    const dataArrIndex = this.state.data.findIndex((el)=>el.id===costPotID);
    this.updateDatabaseOnUpdate( dataArrIndex, updateObject); 
    //close modal
    events.emit('CLOSE_MODAL');
  });
  
  
}
getCostPotName = ({name, costPotId}) => {
  console.log(name, costPotId);
  this.setState(() => ({ 
    selectedCostPot:name,
    selectedCostPotID:costPotId
  })
  );
}

render(){
  const { breadcrumbsLinks, selectedCostPot } = this.state;

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
              <CreateCostModel selectDropdownData={this.state.selectDropdownData} onSubmit={this.onCreate}/>
            </ModalCustom>
            <ModalCustom isOpen={false} eventToTrigger={'OPEN_MODAL_SECOND'} receiveEventPayload={this.getCostPotName}>
              <UpdateCostModel selectDropdownDataFixed={selectedCostPot} 
                onSubmit={this.onUpdate.bind(null,this.state.selectedCostPotID)}/>
            </ModalCustom>
            <ModalCustom isOpen={false} eventToTrigger={'OPEN_MODAL_THIRD'} receiveEventPayload={this.getCostPotName}>
              <Typography component="h3" variant="h3" gutterBottom style={{textAlign:'center'}}>
                  are you sure U want to delete { selectedCostPot }?
              </Typography>
              <Button variant="contained" color="primary" className='buttonConfirm' onClick={()=>{ this.onDelete( this.state.selectedCostPotID);} }>Delete</Button>
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
import React from 'react';
import { withRouter } from 'react-router-dom';
import resourceTypeMockService from '../../../services/resource-types-mock';
import levelsMockService from '../../../services/levels-mock';
import costpotsMockService from '../../../services/costpots-mock';
import CostPotBox from './costPotBox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import ModalCustom from '../../../components/modal';
import ModalCustom from '../../../customized-vendors/modalVendor';

import _ from '../../../utils/misc';
import events from '../../../utils/events';

import './scss/costpots.scss';

const buildResourceTypeItem = (e) => {
  return {
    label: e.label,
    value: {type: e.label, id: e.value.id},
  };
};
const buildInfrastructureLevelItem = (e) => {
  return {
    label: e.name,
    value: {
      id: e.id,
      classification: 'INFRASTRUCTURE',
      parentId: null,
    },
  };
};

class CostPots extends React.Component {
/*
  *@state could be empty object
  *@react will understand any changes to its properties as undefined
*/
state = {
/*  allLevels:null,*/
}

async componentDidMount(){

  const { costModelId } = this.props;

  const allResourceTypes = await resourceTypeMockService.getAll();
  const resourceTypeItems = allResourceTypes.data.map(buildResourceTypeItem);
  const levelsRespond = await levelsMockService.getAll();
  const allLevels = levelsRespond.data.sort(
    _.compareFactory('order', false, true)
  );
  const infrastructureLevels = levelsRespond.data
    .filter((e) => e.domainId === 3)
    .map(buildInfrastructureLevelItem);


  //get costposts
  const allCostPosts = await costpotsMockService.getAll(costModelId);
  //update state;
  this.setState(() => ({ 
    allLevels,
    allCostPosts :allCostPosts.data,
  }));

}

deleteCostPot(costPotName){
  this.setState({costPotToDelete:costPotName});
  events.emit('OPEN_MODAL');
}

render(){
  const {allLevels, allCostPosts} = this.state;

  //list of hero icons here temporary before U make some configuration file
  const heroIcons = {
    36:'code',
    37:'backup',
    38:'backup',
    39:'backup',
    40:'backup',
    41:'backup',
    42:'backup',
    43:'backup',
    44:'backup',
    45:'backup',
    46:'build',
    47:'backup',
    48:'card_travel',
   
  };

  if(this.state.allLevels){
    return (
      <div className='costpots'>
        <div className="section graph">
         
          {
            allLevels.map((levelProps,id)=>{
              return (
                <div className="row" key={`level${id}`}>
                  <div className={'levelCostPots'} key={`costpot${id}`}>
                    { 
                      allCostPosts.map((attrs,id)=> {
                        if(levelProps.id === attrs.levelId){
                          const {configurationId:costModelId, id:costPotId} = attrs;
                          console.log(attrs);
                          return (
                            <CostPotBox 
                              key={`costpotBox${id}`}
                              name={attrs.name}
                              heroIcon={heroIcons[36+id]}
                              actionIcons={{
                                delete:{icon:'delete',action:()=>{ this.deleteCostPot(attrs.name);},linkParams:null},
                                android:{icon:'androidIcon',action:null, linkParams:null},
                                assignment_turned_in:{
                                  icon:'assignment_turned_inIcon',
                                  action:null,
                                  linkParams:{costModelId,costPotId}
                                }
                              }}
                              hideDelete = {levelProps.domainId !== 3}
                              hideAndroid = {levelProps.domainId !== 3}
                            />
                          );
                        } else {
                          return null;
                        }
                      
                      }) 
                    }  
                  </div>  
                  <h6 className={`level-name domain-${levelProps.domainId}`} >{levelProps.name}</h6>            
                </div>
              );
            })
          }
         
         
        </div>
        {/*deleteCostPot Modal*/}
        <div>
          <ModalCustom isOpen={false} >
            <Typography component="h3" variant="h3" gutterBottom style={{textAlign:'center'}}>
                  are you sure U want to delete {this.state.costPotToDelete}?
            </Typography>
            <Button variant="contained" color="primary" className='buttonConfirm' onClick={()=>{events.emit('CLOSE_MODAL');}}>Delete</Button>
            <Button variant="contained" color="primary" className='buttonCancel' onClick={()=>{events.emit('CLOSE_MODAL');}}>Cancel</Button>
          </ModalCustom>
        </div>
      </div>
    );
  } else {
    return '....preloading';
  }

}
   
    
}
//add router to this component for getting currenct route params;
//it will be attached to the props as props.location for location;
export default withRouter(CostPots);


import React from 'react';
import { withRouter } from 'react-router-dom';
import resourceTypeMockService from '../../../services/resource-types-mock';
import levelsMockService from '../../../services/levels-mock';
import costpotsMockService from '../../../services/costpots-mock';
import _ from '../../../utils/misc';
import './scss/costpots.scss';
import CostPotBox from './costPotBox';

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
state = {
  allLevels:null
}
async componentDidMount(){
  console.log(this);

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
  const allCostPosts = await costpotsMockService.getAll(this.props.costPotId);

  console.log('allCostPosts',allCostPosts);

  //update state;
  this.setState(() => ({ 
    allLevels,
    allCostPosts :allCostPosts.data
  }));

}

  //res.data.map(buildResourceTypeItem);
/*

<div class="section graph">
  <div class="row" ng-repeat="level in allLevels track by $index">
    <div class="col s12 flex hspace-evenly domain-{{level.domainId}}">
      <h6 class="level-name">{{level.name}}</h6>
      <costpot ng-repeat="item in allCostpots | filter:{levelId: level.id}:true | filter:{parentId: null} | filter:{parentId: undefined} track by $index"
      opts="{
                                  name: item.name,
                                  icon: getSvgIcon(item, level),
                                  hideAdd: level.domainId !== 3,
                                  hideFile: false,
                                  hideFilter: item.name !== 'IT Functional Breakdown',
                                  hideDelete: level.domainId !== 3,
                              }" callback="costpotCallbackFactory(item)"></costpot>
    </div>
  </div>

  */


  /*
    
          /* <costpot ng-repeat="item in allCostpots | filter:{levelId: level.id}:true | filter:{parentId: null} | filter:{parentId: undefined} track by $index"
    opts="{
                                name: item.name,
                                icon: getSvgIcon(item, level),
                                hideAdd: level.domainId !== 3,
                                hideFile: false,
                                hideFilter: item.name !== 'IT Functional Breakdown',
                                hideDelete: level.domainId !== 3,
                            }" callback="costpotCallbackFactory(item)"></costpot>


  */
  /*
    if(levelProps.id === attrs.levelId){
       return (
        <h6 className={`level-name domain-${levelProps.domainId}`} >{levelProps.name}</h6>
        )
     }

  */
render(){
  const {allLevels, allCostPosts} = this.state;
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
                          return (
                            <CostPotBox  
                              name={attrs.name}
                              hideDelete = {levelProps.domainId !== 3}
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


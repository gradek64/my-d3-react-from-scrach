import React from 'react';
import resourceTypeMockService from '../../../services/resource-types-mock';
import levelsMockService from '../../../services/levels-mock';
import _ from '../../../utils/misc';
//import './costpots.scss';

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
  const allResourceTypes = await resourceTypeMockService.getAll();
  const resourceTypeItems = allResourceTypes.data.map(buildResourceTypeItem);
  const levelsRespond = await levelsMockService.getAll();
  const allLevels = levelsRespond.data.sort(
    _.compareFactory('order', false, true)
  );
  console.log(allLevels);
  const infrastructureLevels = levelsRespond.data
    .filter((e) => e.domainId === 3)
    .map(buildInfrastructureLevelItem);

  console.log(infrastructureLevels);

  //update state;
  this.setState(() => ({ allLevels }));

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
render(){
  const {allLevels} = this.state;
  if(this.state.allLevels){
    return (
      <div className='costpots'>
        <div className="section graph">
          <div className="row">
            {
              allLevels.map((level,id)=>{
                return <h6 className={`level-name domain-${level.domainId}`} key={`level${id}`}>{level.name}</h6>;
              })
            }
         
          </div>
        </div>
      </div>
    );
  } else {
    return '....preloading';
  }

}
   
    
}
export default CostPots;
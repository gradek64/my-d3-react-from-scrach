import React from 'react';
import SimpleTable from '../../../components/SimpleTable';
import costModelService from '../../../services/cost-model-mock';


class CostModel extends React.Component {
state = {
  data:null
}
async componentDidMount(){
  const dataResponsone = await costModelService.getAll();
  const data = dataResponsone.data;
  this.setState(() => ({ data }));
}

render(){
  if(this.state.data){
    return (
      <SimpleTable data={this.state.data} pageTableOn={'costModels'}/>
    );
  }else {
    return '....preloading';
  }
}
   
    
}
export default CostModel;
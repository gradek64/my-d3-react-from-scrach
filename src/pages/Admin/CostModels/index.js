import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import SimpleTable from '../../../components/SimpleTable';
import costModelService from '../../../services/cost-model-mock';


class CostModel extends React.Component {
state = {
  data:null,
  breadcrumbsLinks:[],
}
async componentDidMount(){
  
  const dataResponsone = await costModelService.getAll();
  const data = dataResponsone.data;
  this.setState(() => ({ data }));

  this.setState({
    breadcrumbsLinks:[
      {
        href: '/admin/cost-models',
        label: 'Cost Models',
      }
    ]});

}

render(){
  const { breadcrumbsLinks } = this.state;

  return ( <div className='costModels'>
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
    {this.state.data?<SimpleTable data={this.state.data} pageTableOn={'costModels'}/>:'....preloading'}
  </div>
  );
}
   
    
}
export default CostModel;
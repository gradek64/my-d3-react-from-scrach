import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom';
import DropDownListContainer from '../../../components/DropDownListContainer';


//custom
import TablePagControllers from '../TablePagControllers';
import events from '../../../utils/events';



class TableData extends React.Component { 
 
  constructor(props){
    super(props);
    console.log('constructor', this.props);
  }
  onDelete = ({name, costPotId}) => {
    const payload = {name, costPotId};
    events.emit('OPEN_MODAL_THIRD', payload);
  };
  onEdit = ({name, costPotId}) => {
    const payload = {name, costPotId};
    events.emit('OPEN_MODAL_SECOND',payload);
  };
  onView = (costPotId) => {
    this.props.history.push(`/admin/cost-models/${costPotId}/costpots`);
  };
 
 getActions = (params) => {
   const {costPotId,type,name} = params;
   const system =  [
     {el:'edit', icon:'whatshot', handler:this.onEdit.bind(null,{name,costPotId})},
     {el:'view configuration',icon:'mood', iconColor:'secondary',handler:()=>{ this.onView(costPotId); }}  
   ];
   const user =    system.concat([ {el:'delete',icon:'public', handler:this.onDelete.bind(null,{name,costPotId}) }]);
   return type==='USER'? user : system;
 };

 render(){
   const { classes ,pageUpdate, rowsPerPageUpdate } = this.props;
   return (
     <Table className={classes.table}>
       <TableHead>
         <TableRow>
           <TableCell numeric>ID</TableCell>
           <TableCell>Name</TableCell>
           <TableCell >type</TableCell>
           <TableCell >action</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {this.props.data?this.props.data.map(({name,type,createdBy,creationDate,iconColor,id:costPotId},id) => {
           return (
             <TableRow key={`table${id}`}>
               <TableCell numeric>{(id+1)+pageUpdate*rowsPerPageUpdate}</TableCell>
               <TableCell component="th" scope="row">
                 {name}
               </TableCell>
               <TableCell >{type}</TableCell>
               <TableCell>
                 <DropDownListContainer 
                   list={this.getActions({type,costPotId,name})}
                   direction={'left'}
                   placement={'top-end'}>
                   <MoreVertIcon />
                 </DropDownListContainer>
               </TableCell>  
             </TableRow>
           );
         }):null}
       </TableBody>
       {   this.props.rowsPerPage ? (
         <TableFooter>
           <TableRow>
             <TablePagination
               colSpan={this.props.colSpan}
               count={this.props.count}
               rowsPerPage={this.props.rowsPerPageUpdate}
               page={this.props.pageUpdate}
               onChangePage={this.props.handleChangePage}
               onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
               ActionsComponent={TablePagControllers}
             />
           </TableRow>
         </TableFooter>) : null
       }
     </Table>
   );}
}

export default withRouter(TableData);
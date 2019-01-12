import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom';
import DropDownListContainer from '../../../components/DropDownListContainer';

//custom
import TablePagControllers from '../TablePagControllers';



const TableData = (props) => { 
  const { classes ,pageUpdate, rowsPerPageUpdate } = props;

  //console.log('props table',props);


  const onDelete = () => console.log('onDelete');
  const onEdit = () => console.log('onEdit');
  const onView = (costPotId) => {
    props.history.push(`/admin/cost-models/${costPotId}/costpots`);
  };
  const getActions = (params) => {
    const {costPotId,type} = params;
    const system =  [
      {el:'edit', icon:'whatshot', handler:()=>{console.log('Iam Greg');}},
      {el:'view configuration',icon:'mood', iconColor:'secondary',handler:()=>{onView(costPotId);}},
    
    ];
    const user =    system.concat([ {el:'delete',icon:'public', handler:()=>{console.log('Iam Libby');}}]);
    return type==='USER'? user : system;
  };

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
        {props.data.map(({name,type,createdBy,creationDate,iconColor,id:costPotId},id) => {
          return (
            <TableRow key={`table${id}`}>
              <TableCell numeric>{(id+1)+pageUpdate*rowsPerPageUpdate}</TableCell>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell >{type}</TableCell>
              <TableCell>
                <DropDownListContainer 
                  list={getActions({type,costPotId})}
                  direction={'left'}
                  placement={'top-end'}>
                  <MoreVertIcon />
                </DropDownListContainer>
              </TableCell>  
            </TableRow>
          );
        })}
      </TableBody>
      {   props.rowsPerPage ? (
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={props.colSpan}
              count={props.count}
              rowsPerPage={props.rowsPerPageUpdate}
              page={props.pageUpdate}
              onChangePage={props.handleChangePage}
              onChangeRowsPerPage={props.handleChangeRowsPerPage}
              ActionsComponent={TablePagControllers}
            />
          </TableRow>
        </TableFooter>) : null
      }
    </Table>
  );
};

export default withRouter(TableData);
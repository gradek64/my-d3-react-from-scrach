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


//TablePagControllers is resposible for paginatio buttons clicks 
import TablePagControllers from '../TablePagControllers';
import events from '../../../utils/events';


const TableData = (props) => { 
  const { classes ,pageUpdate, rowsPerPageUpdate } = props;

  const onDelete = ({name, costPotId}) => {
    const payload = {name, costPotId};
    events.emit('OPEN_MODAL_THIRD', payload);
  };
  const onEdit = ({name, costPotId}) => {
    const payload = {name, costPotId};
    events.emit('OPEN_MODAL_SECOND',payload);
  };
  const onView = (costPotId) => {
    props.history.push(`/admin/cost-models/${costPotId}/costpots`);
  };
  const getActions = (params) => {
    const {costPotId,type,name} = params;
    const system =  [
      {el:'edit', icon:'whatshot', handler:onEdit.bind(null,{name,costPotId})},
      {el:'view configuration',icon:'mood', iconColor:'secondary',handler:()=>{ onView(costPotId); }}  
    ];
    const user =    system.concat([ {el:'delete',icon:'public', handler:onDelete.bind(null,{name,costPotId}) }]);
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
        {props.data?props.data.map(({name,type,createdBy,creationDate,iconColor,id:costPotId},id) => {
          return (
            <TableRow key={`table${id}`}>
              <TableCell numeric>{(id+1)+pageUpdate*rowsPerPageUpdate}</TableCell>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell >{type}</TableCell>
              <TableCell>
                <DropDownListContainer 
                  list={getActions({type,costPotId,name})}
                  direction={'left'}
                  placement={'top-end'}>
                  <MoreVertIcon />
                </DropDownListContainer>
              </TableCell>  
            </TableRow>
          );
        }):null}
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
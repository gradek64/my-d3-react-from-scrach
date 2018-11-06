import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DropDownListContainer from '../../components/DropDownListContainer'
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './TablePaginationSet'


const handleChangePage = (event, page) => {

  //this.setState({ page });
  console.log(event);
  console.log(page);
};

const handleChangeRowsPerPage = event => {
  console.log(event);
  //this.setState({ rowsPerPage: event.target.value });
};

const TableData = (props) => { 
  const { classes } = props


const onDelete = () => console.log('onDelete');
const onEdit = () => console.log('onEdit');
const onInspect = () => console.log('onInspect');
const getActions = (type) => {
  const system =  [
     {el:'edit', icon:'whatshot', handler:()=>{console.log('Iam Greg');}},
     {el:'inspect',icon:'mood', iconColor:'secondary',handler:()=>{console.log('Iam Mariola');}},
    
  ]
  const user =    system.concat([ {el:'delete',icon:'public', handler:()=>{console.log('Iam Libby');}}]);
  return type==='USER'? user : system;
}

const page = 0;
const rowsPerPage = 5;

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
     {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).
                  map(({name,type,createdBy,creationDate,iconColor},id) => {
                 return (
                   <TableRow key={`table${id}`}>
                      <TableCell numeric>{id+1}</TableCell>
                     <TableCell component="th" scope="row">
                       {name}
                     </TableCell>
                     <TableCell >{type}</TableCell>
                     <TableCell>
                     <DropDownListContainer 
                     list={getActions(type)}
                     direction={'left'}
                     placement={'top-end'}>
                        <MoreVertIcon />
                       </DropDownListContainer>
                     </TableCell>  
                   </TableRow>
                 );
               })}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TablePagination
          colSpan={3}
          count={props.data.length}
          rowsPerPage={5}
          page={0}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  </Table>
  );
}

export default TableData;
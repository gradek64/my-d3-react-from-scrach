import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SimpleMenu from '../../customized-vendors/slideDown'


const TableData = (props) => { 
  const { classes } = props

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
     {props.data.map(({name,type,createdBy,creationDate,iconColor},id) => {
                 return (
                   <TableRow key={`table${id}`}>
                      <TableCell numeric>{id+1}</TableCell>
                     <TableCell component="th" scope="row">
                       {name}
                     </TableCell>
                     <TableCell >{type}</TableCell>
                     <TableCell>
                     <SimpleMenu>
                        <MoreVertIcon />
                       </SimpleMenu>
                     </TableCell>  
                   </TableRow>
                 );
               })}
    </TableBody>
  </Table>
  );
}

export default TableData;
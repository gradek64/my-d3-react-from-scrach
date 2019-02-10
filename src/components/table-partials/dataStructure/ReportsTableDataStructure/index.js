import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
//scss
import './reportsTableDataStructure.scss';



const styles = theme => ({
  root: {
    width: '100%',
    margin: `${theme.spacing.unit * 3}px auto`,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    width:'100%',
  },
  scrollableBody:{
    display:'block',
    overflow:'auto',
    height:'200px',
    textAlign:'center'
  }
});

const TableDataReports = (props) => { 
  const { classes ,pageUpdate, rowsPerPageUpdate, hasHeader=true ,hasFooter=true} = props;
  console.log('///hre ');
  return (
    <Paper>
      <Table className='table-fixed'>
        {hasHeader?<TableHead >
          <TableRow>
            <TableCell >Label</TableCell>
            <TableCell>Percentage</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>:null}
        <TableBody >
          {props.data?props.data.map(({label,percentage,value},id) => {
            return (
              <TableRow key={`table-reports${id}`} >
                <TableCell component="th" scope="row" >
                  {label}
                </TableCell>
                <TableCell component="th" scope="row">
                  {percentage}
                </TableCell>
                <TableCell >
                  {value}
                </TableCell>  
              </TableRow>
            );
          }):null}
        </TableBody>
        {  hasFooter? (
          <TableFooter>
            <TableRow>
              <TableCell ></TableCell>
              <TableCell></TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableFooter>) : null
        }
      </Table>
    </Paper>
  );
};

export default TableDataReports;

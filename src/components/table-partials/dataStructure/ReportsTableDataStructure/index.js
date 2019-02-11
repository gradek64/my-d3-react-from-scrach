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
  const columns = ['label','percentage','value'];
  return (
    <Paper style={{overflowX:'scroll'}}>
      <Table className='table-fixed' style={{ minWidth:'860px'}}>
        {hasHeader?<TableHead >
          <TableRow>
            {hasHeader && columns.map((label,i)=>
              <TableCell component="th" scope="row" key={`labelKey${i}`}>
                {label}
              </TableCell>)}
          </TableRow>
        </TableHead>:null}
        <TableBody >
          {props.data?props.data.map((item,index) => {
            return (
              <TableRow key={`table-reports${index}`} >
                { columns.map((column,i)=>Object.keys(item).includes(column)?
                  <TableCell component="th" scope="row" key={`tableKey${i}`}>
                    {item[column]}
                  </TableCell>:null)
                }
              </TableRow>
            );
          }):null}
        </TableBody>
        {  hasFooter? (
          <TableFooter>
            <TableRow>
              {columns.map((label,i)=>
                <TableCell component="th" scope="row" key={`labelKey${i}`}>
                  {i===0?'total':null}
                  {(i+1)===columns.length?'53534545645':null}
                </TableCell>)}
            </TableRow>
          </TableFooter>) : null
        }
      </Table>
    </Paper>
  );
};

export default TableDataReports;

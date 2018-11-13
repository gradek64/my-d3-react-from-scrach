import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';

//custom 
import TableDataCostModel from './table-partials/TableData';
import DataTableWithPagination from './table-partials/DataTableWithPagination';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
/*
<TableCell numeric>{row.calories}</TableCell>
<TableCell numeric>{row.fat}</TableCell>
<TableCell numeric>{row.carbs}</TableCell>
<TableCell numeric>{row.protein}</TableCell>

*/

const pagination = {
  startPage:0,
  rowsPerPage:5,
  updatePage:function(page){
    let updated = page ?  page : this.startPage;
    return props.data.slice(updated * this.rowsPerPage, 
      updated * this.rowsPerPage + this.rowsPerPage);
  }
};

/*
<DataTableWithPagination 
data={data} 
classes={classes}
colSpan={3}
count={data.length}
rowsPerPage={5}
startPage={0}
/>
*/
// <TableDataCostModel data={data} classes={classes}/>
/*
<DataTableWithPagination 
            initialData={data} 
            classes={classes}
            colSpan={3}
            count={data.length}
            rowsPerPage={5}
            startPage={0}
            />
*/
function SimpleTable(props) {
  const { classes, data } = props;
  return (
    <Paper className={classes.root}>
      {/* table with no pagination needs below
              <TableDataCostModel data={data} classes={classes} />
            */}
      <DataTableWithPagination 
        initialData={data} 
        classes={classes}
        colSpan={3}
        count={data.length}
        rowsPerPage={5}
        startPage={0}
      />
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);

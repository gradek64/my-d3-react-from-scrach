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
//import TableDataCostModel from './table-partials/dataStructure/costModelsTableData';
import DataTableWithPagination from './table-partials/DataTableWithPagination';


const styles = theme => ({
  root: {
    width: '100%',
    margin: `${theme.spacing.unit * 3}px auto`,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes, data , pageTableOn } = props;

  return (
    <Paper className={classes.root}>
      {/* table with no pagination needs below
              <TableDataCostModel data={data} classes={classes} />
            */}
      <DataTableWithPagination 
        pageTableOn = {pageTableOn}
        initialData={data} 
        classes={classes}
        colSpan={3}
        updataSentData={props.updateData}//this method is curried
        count={data.length?data.length:0}
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

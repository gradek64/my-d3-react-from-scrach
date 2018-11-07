import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  state = {
      page:this.props.page
  }

  handleFirstPageButtonClick = event => {
    this.setState({page:0})
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.setState({page:this.state.page -1 })
    this.props.onChangePage(event, this.state.page - 1);

  };

  handleNextButtonClick = event => {
    this.setState({page:this.state.page +1 })
    this.props.onChangePage(event, this.state.page + 1);


  };

  handleLastPageButtonClick = event => {
    /*
      *@state is has delay in updating 
      *@therefore U wont imidiate update after setState(prop:update);
    */

    this.setState({page: Math.max(this.state.page, Math.ceil(this.props.count / this.props.rowsPerPage) - 1) })
    this.props.onChangePage(
      event,
      Math.max(this.state.page, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );

     console.warn(`proof of state delay this.state.page: ${this.state.page} 
            but should be ${Math.max(this.state.page, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)}`);
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;


    console.log('TablePaginationControllers', this.props);

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={this.state.page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={this.state.page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={this.state.page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={this.state.page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(actionsStyles, { withTheme: true })(TablePaginationActions,);
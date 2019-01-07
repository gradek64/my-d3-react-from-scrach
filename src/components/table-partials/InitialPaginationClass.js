import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//custom
import TablePagControllers from './TablePagControllers';



class InitialPaginationClass extends React.Component {
 

 state = {
   page: this.props.startPage,
   rowsPerPage: this.props.rowsPerPage,
 }

handleChangePage = (event, page) => {
  this.setState({ page:this.state.page+1 });

  console.log('page InitialPaginationClass', page);
  console.log('this.state.page',this.state.page);
  this.props.updatePage(this.state.page);
};

 handleChangeRowsPerPage = event => {
   console.log(event);
   this.setState({ rowsPerPage: event.target.value });
 };


 render() {
   const { pages } = this.props;
   return (
     <TableFooter>
       <TableRow>
         <TablePagination
           colSpan={3}
           count={pages}
           rowsPerPage={this.state.rowsPerPage}
           page={this.state.page}
           onChangePage={this.handleChangePage}
           onChangeRowsPerPage={this.handleChangeRowsPerPage}
           ActionsComponent={TablePagControllers}
         />
       </TableRow>
     </TableFooter>
   );
 }
}

export default InitialPaginationClass;
import React from 'react';
//custom
import TableData from './TableData';


const fnExtensionClass = BaseComponent => 
      class DataTableWithPagination extends React.Component {
        state = {
            data:this.props.initialData,
            page:this.props.startPage,
            rowsPerPage:this.props.rowsPerPage,
           }

        handleChangePage = (event, page) => {
          this.setState({page});
          this.updatedData(page,this.state.rowsPerPage);
        };

        handleChangeRowsPerPage = event => {
          let rows = event.target.value;
          this.setState({ rowsPerPage: event.target.value });
          this.updatedData(this.state.page,rows);
        };

        updatedData = (page,rows) => {
            let updatedPage = page ? page : this.props.startPage;
            let updatedRows = rows ? rows : this.props.rowsPerPage;
            console.log('updatedRows', updatedRows);

            this.setState((state) => {
            return {data: this.props.initialData.slice(updatedPage * updatedRows, 
              updatedPage * updatedRows + updatedRows)};
            });
      
        }

        componentDidMount(){
          this.updatedData();
        }

        render() {
          return <BaseComponent {...this.props} 
          data={this.state.data}
          pageUpdate = {this.state.page}
          rowsPerPageUpdate = {this.state.rowsPerPage}
          handleChangePage={this.handleChangePage} 
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        }
}

export default fnExtensionClass(TableData);
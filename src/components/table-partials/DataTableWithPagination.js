import React from 'react';
//custom
import CostModelsTableData from './dataStructure/costModelsTableData';
import FileManagementTableData from './dataStructure/fileManagementTableData';


//const fnExtensionClass = BaseComponent => no need to extend now;
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

          switch (this.props.pageTableOn){
          case 'fileManagement':
            return <FileManagementTableData {...this.props} 
              data={this.state.data}
              pageUpdate = {this.state.page}
              rowsPerPageUpdate = {this.state.rowsPerPage}
              handleChangePage={this.handleChangePage} 
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />;
          case 'costModels':
            return <CostModelsTableData {...this.props} 
              data={this.state.data}
              pageUpdate = {this.state.page}
              rowsPerPageUpdate = {this.state.rowsPerPage}
              handleChangePage={this.handleChangePage} 
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />;
          default:
            return 'this.props.pageTableOn is not defined in props in DataTableWithPagination.js!';

          }

         
        }
}

//export default fnExtensionClass(TableData);
export default DataTableWithPagination;
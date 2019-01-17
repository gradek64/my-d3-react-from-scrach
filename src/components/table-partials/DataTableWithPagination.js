import React from 'react';
//custom
import CostModelsTableData from './dataStructure/costModelsTableData';
import FileManagementTableData from './dataStructure/fileManagementTableData';


//const fnExtensionClass = BaseComponent => no need to extend now;
class DataTableWithPagination extends React.Component {
        state = {
          data:this.props.initialData,
          prevData:this.props.initialData,
          dataChanged:false,
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
          //console.log('updatedRows', updatedRows);

          console.log('....updatedData......');
          this.setState((state) => {
            return {prevData: this.props.initialData};
          });

          this.setState((state) => {
            return {data: this.props.initialData.slice(updatedPage * updatedRows, 
              updatedPage * updatedRows + updatedRows)};
          },()=>{
            //return this.state.data;
          });
      
        }

        componentDidMount(){
          this.updatedData();
        }

        render() {

          const { data, prevData} = this.state;
          const {initialData} = this.props;

          const dataChanged = initialData.length!==prevData.length;
          /*if(dataChanged){
            this.updatedData();
          }*/
          console.log('.............initialData...............', this.state.data);
          console.log('this.props.initialData',this.props.initialData);
          console.log('dataChanged', dataChanged);

          switch (this.props.pageTableOn){
          case 'fileManagement':
            return <FileManagementTableData {...this.props} 
              data={initialData}
              pageUpdate = {this.state.page}
              rowsPerPageUpdate = {this.state.rowsPerPage}
              handleChangePage={this.handleChangePage} 
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />;
          case 'costModels':
            return <CostModelsTableData {...this.props} 
              data={initialData}
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
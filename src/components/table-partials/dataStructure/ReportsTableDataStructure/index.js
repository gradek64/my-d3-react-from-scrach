import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DropDownMenu from './../../../dropDownMenu';
import TableDataFilter from './../../../table-partials/TableDataFilter/TableDataFilter';
import TableExtensions from './../../../table-partials/TableExtensions';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
//scss
import './reportsTableDataStructure.scss';

class TableDataReports extends React.Component { 

  /*
    *@U need to keep track what data has been filter for all 
    *@filter applied by <TableDataFilter> component, all selected initially;
  */
  state = {
    tableRef:null,
    filterDataSetup:{
      filterDataSelected:Array.from(Array(this.props.data.length), () => true),
      checkedSelectAll:true,
      filterBy:null,
      filterByValue:'',
      data:this.props.data,
    },
    standardData:this.props.data
  }

  componentDidMount = () => {
    this.setState({tableRef:document.querySelector('.chart')});
  }

  updateDataSelected = (updateArray, selectAllButton,{filterBy,filterByValue=''}) => {
    const { filterDataSetup } = this.state;
    //update data on new copy;
    const copyFilteredData = filterDataSetup.data
      .map((data,i)=>{
        data.selected = updateArray[i];
        return data;
      });

    this.setState(()=>{
      return {
        filterDataSetup:{
          checkedSelectAll:selectAllButton,
          filterDataSelected:[...updateArray],
          data:[...copyFilteredData],
          filterBy,
          filterByValue
        },
        standardData:copyFilteredData.filter(({selected})=>selected)
      };
    });
  }

  render = () => {

    const {  hasHeader=false ,hasFooter=false } = this.props;
    const { tableRef, standardData } = this.state;
    const { 
      data ,
      filterDataSelected, 
      checkedSelectAll,
      filterBy,
      filterByValue } = this.state.filterDataSetup;
    const columns = ['label','percentage','value','id'];

    return (
      <Paper  className='structure' style={{ overflowY:'auto'}}>
        <div className='overallContainer'>
          {/*apply seperate props for Filter Data */}
          {this.state.tableRef?
            <TableExtensions 
              hasFilterDataSetup = {
                { filterDataSelected,
                  checkedSelectAll,
                  curryUpdateTableData:this.updateDataSelected,
                  data,
                  filterBy,
                  filterByValue,
                  labels:columns,
                }
              }
              values={columns}
              tableRef={tableRef}
            />:null}
          <div className='tableContainer'>
            <Table className='table-fixed'>
          
              {/*hasHeader?<TableHead >
                <TableRow>
                  {hasHeader && columns.map((label,i)=>
                    <TableCell component="th" 
                      scope="row" 
                      key={`labelKey${i}`} 
                      dropdownmenuanchor='yes'>
                      {label}
                      <DropDownMenu 
                        key={i}
                        onMouseEnter={false} 
                        collapsebleAccordion={false}
                        multipleOpen={false}
                        goesAwayOnContentClick={false}
                        animation={true} >
                        <div className='verticalAlignment' >
                          {label}
                        </div>
                        <div>
                          <Paper>
                            <TableDataFilter 
                              data={data} 
                              filterDataSelected={filterDataSelected}
                              checkedSelectAll={checkedSelectAll}
                              updateRecord={this.updateDataSelected}
                              accessor={label} 
                              filterBy={filterBy}
                            />
                          </Paper>            
                        </div>
                      </DropDownMenu>
                    </TableCell>)}
           
                </TableRow>
              </TableHead>:null*/}
              <TableBody >
                {standardData.length!==0?standardData.map((item,index) => {
                  return (
                    <TableRow key={`table-reports${index}`} >
                      { columns.map((column,i)=>Object.keys(item).includes(column)?
                        <TableCell component="th" scope="row" key={`tableKey${i}`}>
                          {item[column]}
                        </TableCell>:null)
                      }
                    </TableRow>
                  );
                }):
                  <TableRow >
                    <TableCell component="th" scope="row">
                      {'no data'}
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
              {/*  hasFooter? (
                <TableFooter>
                  <TableRow>
                    {columns.map((label,i)=>
                      <TableCell component="th" scope="row" key={`labelKey${i}`}>
                        {i===0?'total':null}
                        {(i+1)===columns.length?'53534545645':null}
                      </TableCell>)}
                  </TableRow>
                </TableFooter>) : null
              */}
            </Table>
          </div>
          {this.state.tableRef?<TableExtensions 
            tableRef={tableRef}
            values={['total','','','535353535']}
          />:null}
        </div>
      </Paper>
    );
  }
}
export default TableDataReports;

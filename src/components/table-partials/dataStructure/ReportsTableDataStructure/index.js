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
  columns = ['label','percentage','value','id'];
  state = {
    tableRef:null,
    dataHasChanged:false,
    filterDataSetup:{
      filterDataSelected:Array.from(Array(this.props.data.length), () => true),
      checkedSelectAll:true,
      filterBy:null,
      filterByValue:'',
      filterByValueSet:this.columns.reduce((a,e)=>{
        a[e]='';
        return a;
      },{}),
      data:this.props.data,
    },
    standardData:this.props.data
  }

  componentDidMount = () => {
    this.setState({tableRef:document.querySelector('.chart')});
  }
  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):

    if (this.props.data !== prevProps.data) {
      /*
        *@You need to update all those props for the nested components
        *@to render with new props;
      */
      this.setState({
        standardData:this.props.data,
        filterDataSetup:{
          filterDataSelected:Array.from(Array(this.props.data.length), () => true),
          checkedSelectAll:true,
          filterBy:null,
          filterByValue:'',
          filterByValueSet:this.columns.reduce((a,e)=>{
            a[e]='';
            return a;
          },{}),
          data:this.props.data,
        },
      });
    }
  }

  updateDataSelected = (updateArray, selectAllButton,filterByValueSet) => {
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
          filterByValueSet,
        },
        standardData:copyFilteredData.filter(({selected})=>selected)
      };
    });
  }

  render = () => {

    const {  hasHeader=false ,hasFooter=false } = this.props;
    const { tableRef, standardData  } = this.state;
    const { 
      data ,
      filterDataSelected, 
      checkedSelectAll,
      filterByValueSet } = this.state.filterDataSetup;

    return (
      <Paper  className='structure' style={{ overflowY:'auto'}}>
        <div className='overallContainer'>
          {/*apply seperate props for Filter Data */}
          {tableRef?
            <TableExtensions 
              hasFilterDataSetup = {
                { filterDataSelected,
                  checkedSelectAll,
                  curryUpdateTableData:this.updateDataSelected,
                  data,
                  filterByValueSet,
                  labels:this.columns,
                }
              }
              values={this.columns}
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
                      { this.columns.map((column,i)=>Object.keys(item).includes(column)?
                        <TableCell component="th" scope="row" key={`tableKey${i}`}>
                          {item[column]}
                        </TableCell>:null)
                      }
                    </TableRow>
                  );
                }):null}
              </TableBody>
              {/*<TableRow style={{'paddingLeft':'24px'}}>
                    { this.columns.map((column,i)=>
                      <TableCell component="td"  
                        scope="row"
                        className='pocket' 
                        key={`tableKeyNoData${i}`} 
                        style={{
                          width:`${this.tdWidth[i]}px`,
                          padding:'4px 0 0 0'
                        }}>
                        {'no data'}
                      </TableCell>:null)
                    }
                  </TableRow>*/}  
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

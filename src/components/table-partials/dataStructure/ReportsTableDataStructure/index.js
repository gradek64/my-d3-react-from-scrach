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
import TableDataFilter from './../../../table-partials/TableDataFilter';
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
    data:this.props.data,
    filterDataSelected:Array.from(Array(this.props.data.length), () => true),
    checkedSelectAll:true,
  }

  componentDidMount = () =>{
    console.log('initially this.props.data', this.props.data);
    //add addtional property:selected to this.state.data 
    const dataSelection = this.state.data.map((data,i)=>{
      data.selected = this.state.filterDataSelected[i];
      return data;
    });
    //update state with selected;
    this.setState(()=>{
      return{
        data:[...dataSelection]
      };
    });
  }

  updateDataSelected = (updateArray, selectAllButton) => {
    //update selected in data;
    const dataSelection2 = this.state.data
      .map((data,i)=>{
        data.selected = updateArray[i];
        return data;
      })
      .filter(({selected})=>selected);
    
    this.setState(()=>{
      return {
        checkedSelectAll:selectAllButton,
        filterDataSelected:[...updateArray],
        data:[...dataSelection2]
      };
    },()=>{

      console.log(':::this.state.data ::: ', this.state.data);
      //filter data based on select inputs;
      //this.state.data.filter(({selected})=>selected);
    });
  }

  render(){

    const {  hasHeader=true ,hasFooter=true } = this.props;

    //to do 
    const cloneData = Object.assign({}, this.props.data);

    console.log('this.props.data', this.props.data);
    console.log('cloneData', cloneData);
    const { data, filterDataSelected, checkedSelectAll } = this.state;
    const columns = ['label','percentage','value'];



    {/* <Paper style={{overflowX:'scroll',overflowY:'initial'}}>*/}
    return (
      <Paper>
        <Table className='table-fixed' style={{ minWidth:'860px'}}>
        
          {hasHeader?<TableHead >
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
                          items={data} 
                          filterDataSelected={filterDataSelected}
                          checkedSelectAll={checkedSelectAll}
                          updateRecord={this.updateDataSelected}
                          accessor={label} 
                        />
                      </Paper>            
                    </div>
                  </DropDownMenu>
                </TableCell>)}
           
            </TableRow>
          </TableHead>:null}
          <TableBody >
            {data?data.map((item,index) => {
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
  }
}
export default TableDataReports;

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
/* import TableHead from '@material-ui/core/TableHead';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DropDownMenu from './../../../dropDownMenu';
import TableDataFilter from './../../../table-partials/TableDataFilter/TableDataFilter' */
import TableExtensions from './../../../table-partials/TableExtensions';
import GetColumnsWidthClass from './../../../table-partials/TableExtensions/GetColumnsWidthClass';
import chartDataFormat from '../../../../services/charts-support/ChartFormatData';

// scss
import './reportsTableDataStructure.scss';

class TableDataReports extends React.Component {
  /*
    *@U need to keep track what data has been filter for all
    *@filter applied by <TableDataFilter> component, all selected initially;
  */
  state = {
    tableRef: null,
    filterDataSetup: {
      filterDataSelected: Array.from(Array(this.props.data.length), () => true),
      checkedSelectAll: true,
      filterBy: null,
      filterByValue: '',
      filterByValueSet: this.props.columns.reduce((a, e) => {
        const acumulator = a;
        acumulator[e] = '';
        return a;
      }, {}),
      data: this.props.data,
    },
    standardData: this.props.data,
  }

  componentDidMount = () => {
    this.setState({ tableRef: document.querySelector('.chart') });
  }

  /*
    *@componenWillReceiveProps should be used for props update not
    *@componentDidUpdate
  */
  componentWillReceiveProps(nextProps) {
    /*
      *@for future comparison of object I will use some external libray as lodash
      *@as it is much more acureate and it is part of functional programming;
    */


    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      this.setState(() => ({
        tableRef: document.querySelector('.chart'),
        standardData: nextProps.data,
        filterDataSetup: {
          filterDataSelected: Array.from(Array(nextProps.data.length), () => true),
          checkedSelectAll: true,
          filterBy: null,
          filterByValue: '',
          filterByValueSet: this.props.columns.reduce((a, e) => {
            const acumulator = a;
            acumulator[e] = '';
            return a;
          }, {}),
          data: nextProps.data,
        },
      }));
    }
  }

  updateDataSelected = (updateArray, selectAllButton, filterByValueSet) => {
    const { filterDataSetup } = this.state;
    // update data on new copy;
    const copyFilteredData = filterDataSetup.data
      .map((data, i) => {
        const dataArg = data;
        dataArg.selected = updateArray[i];
        return data;
      });

    this.setState(() => ({
      filterDataSetup: {
        checkedSelectAll: selectAllButton,
        filterDataSelected: [...updateArray],
        data: [...copyFilteredData],
        filterByValueSet,
      },
      standardData: copyFilteredData.filter(({ selected }) => selected),
    }));
  }

  mapDataFormat = {
    label: 'alphabetic',
    percentage: 'percentage',
    value: 'numeric',
  }

  picFormatService = (format, value) => {
    switch (this.mapDataFormat[format]) {
    case 'alphabetic':
      return chartDataFormat.kFormatter(value);
    case 'percentage':
      return chartDataFormat.formatPercentage(value);
    case 'numeric':
      return `£${chartDataFormat.formatCurrency(value)}`;
    default:
    }

    return null;
  }

  render = () => {
    const { tableRef, standardData } = this.state;
    const {
      data,
      filterDataSelected,
      checkedSelectAll,
      filterByValueSet,
    } = this.state.filterDataSetup;

    return (
      <Paper className="structure" style={{ overflowY: 'auto' }}>
        {/* <div>
          {tableRef ? <GetColumnsWidthClass render={(columnsWidth, isLoading) => {
            console.log('\n\ncolumnsWidth.......', columnsWidth);
            return isLoading ? 'Iam here ' : 'not ready yet';
          }}
          /> : null}
        </div> */}

        <div className="overallContainer">
          {/* apply seperate props for Filter Data */}
          {tableRef ?
            <TableExtensions
              hasFilterDataSetup={
                {
                  filterDataSelected,
                  checkedSelectAll,
                  curryUpdateTableData: this.updateDataSelected,
                  data,
                  filterByValueSet,
                  labels: this.props.columns,
                }
              }
              values={this.props.columns}
              tableRef={tableRef}
            /> : null}
          <div className="tableContainer">
            <Table className="table-fixed">

              {/* hasHeader?<TableHead >
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
              </TableHead>:null */}
              <TableBody >
                {standardData.length !== 0 ? standardData.map((item, index) => (
                  <TableRow key={`table-reports${index}`} >
                    { this.props.columns.map((column, i) => (Object.keys(item).includes(column) ?
                      <TableCell component="th" scope="row" key={`tableKey${i}`}>
                        {this.picFormatService(column, item[column]) || item[column]}
                      </TableCell> : null))
                    }
                  </TableRow>
                )) : null}
              </TableBody>
              {/* <TableRow style={{'paddingLeft':'24px'}}>
                    { this.props.columns.map((column,i)=>
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
                  </TableRow> */}
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
          {this.state.tableRef ? <TableExtensions
            tableRef={tableRef}
            values={['total', '', '', '535353535']}
          /> : null}
        </div>
      </Paper>
    );
  }
}

TableDataReports.propTypes = {
  columns: PropTypes.instanceOf(Array),
  data: PropTypes.instanceOf(Array),
};

TableDataReports.defaultProps = {
  columns: ['label', 'percentage', 'value', 'id'],
  data: [],
};
export default TableDataReports;

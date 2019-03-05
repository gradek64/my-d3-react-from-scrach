import React from 'react';
import PropTypes from 'prop-types';
import PopUpAnchorDropDown from './../../PopUpAnchorDropDown';
// custom
import TableDataFilter from '../TableDataFilter/TableDataFilter';
import './tableFilter.scss';

/** **********************************

  *@this functional component is resposible to adding responsive header and footer
  *@to the table and passing data to the FilterData Class Component

************************************ */


const TableExtensions = (props) => {
  const {
    hasFilterDataSetup,
    tableRef,
    values,
  } = props;

  // access <tr> for the table from tableRef DOM element
  const trDOM = Array.from(tableRef.querySelector('table tbody tr').children);
  // childrenWidth  = Array(...Array(trDOM.length)).map((e, n) => trDOM[n].clientWidth)
  const childrenWidth = trDOM.map(e => e.clientWidth);
  /*
    *@U can use experimental method
    *@const childrenWidth  = Array(...Array(trDOM.length)).map((e, n) => trDOM[n].clientWidth);
  */

  // position of dropdown filter;
  const translatePositions = [];
  childrenWidth.reduce((total, num, i) => {
    translatePositions[i] = (total + num) - num;
    return total + num;
  }, 0);

  return (
    <React.Fragment>
      <div className="tableFilterContainer">
        {trDOM.map((el, i) => (
          <div key={`pocket${i}`} className="pocket" style={{ width: `${childrenWidth[i]}px` }}>
            {values[i]}
          </div>))}
      </div>
      {hasFilterDataSetup ?
        <div className="tableFilterContainer">
          {trDOM.map((el, i) => (
            <div key={`pocketFilter${i}`} className="pocket" style={{ width: `${childrenWidth[i]}px` }}>
              <PopUpAnchorDropDown>
                <div>filter {hasFilterDataSetup.labels[i]}
                  {hasFilterDataSetup.filterByValueSet[hasFilterDataSetup.labels[i]]}
                </div>
                <div>
                  <TableDataFilter
                    items={hasFilterDataSetup.data}
                    filterDataSelected={hasFilterDataSetup.filterDataSelected}
                    checkedSelectAll={hasFilterDataSetup.checkedSelectAll}
                    updateRecord={hasFilterDataSetup.curryUpdateTableData}
                    accessor={hasFilterDataSetup.labels[i]}
                    filterByValueSet={hasFilterDataSetup.filterByValueSet}
                  />
                </div>
              </PopUpAnchorDropDown>
            </div>))}
        </div> : null}
    </React.Fragment>
  );
};

TableExtensions.defaultProps = {
  values: [],
  tableRef: {},
  hasFilterDataSetup: null,
};

TableExtensions.propTypes = {
  values: PropTypes.instanceOf(Array),
  tableRef: PropTypes.instanceOf(Object),
  hasFilterDataSetup: PropTypes.instanceOf(Object),

};

export default TableExtensions;

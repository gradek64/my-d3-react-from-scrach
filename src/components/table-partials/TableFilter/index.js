import React from 'react';
//custom
import './tableFilter.scss';
import ReactDOM from 'react-dom';


const TableFilter = (props) => {
  const {tableRef,values,componentClass}= props;
  const trDOM = Array.from(tableRef.querySelector('table tbody tr').children);
  const childrenWidth = trDOM.reduce((a,e,i)=>{
    a[i]=e.clientWidth;
    return a;
  },[]);

  return (
    <div className={`tableFilterContainer ${componentClass}`}>
      {trDOM.map((el,i)=>{
        return (<div key={`pocket${i}`} className='pocket' style={{width:`${childrenWidth[i]}px`}}>{values[i]}</div>);
      })}
    </div>
  );
};

export default TableFilter;
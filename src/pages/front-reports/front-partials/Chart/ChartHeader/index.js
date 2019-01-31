import React from 'react';
import Button from '@material-ui/core/Button';
import DropDownCovered from './dropDownCovered';
import Icon from '@material-ui/core/Icon';
import './ChartHeader.scss';

const ChartHeader = (props) => {

  const { groubByButtons }= props;

  const changeLabel = (label) => {
    setLabel(label);
  };
  const setLabel = (label) => {
    return label;
  };
  const ref = React.createRef();
  return (
    <div data-ng-if="!opts.disableToolbar" className="col s12 chart-toolbar">

      {/*<!-- Left controls -->*/}
      <div className="left">
        {/*<!-- type toggle -->*/}
        <DropDownCovered changeLabel={changeLabel} refee={ref}>
          <Icon color={'primary'} >  
            {'alarm'}
          </Icon>
        </DropDownCovered>
      </div>

      {/*<!-- Middle toolbar -->*/}
      <div>
        {groubByButtons?groubByButtons.map(({ label, value },i)=><Button 
          className='groubByButton'
          key={`button${i}`}
          variant="outlined"
          onClick={()=>console.log({value})}
        >
          {label}
        </Button>):null}
      </div>

      {/*<!-- Right controls -->*/}
      <div className="right chart-controls right-align">
      right chart-controls
      </div>

     

    </div>
  );

};

export default ChartHeader;
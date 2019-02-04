import React from 'react';
import Button from '@material-ui/core/Button';
//third-party library for tracking simple state;
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

const NavReportButtonGroup = (props) => {

  const { groubByButtonsList, actionCb } = props;

  const initialSelected = groubByButtonsList.findIndex(({selected})=>selected);
  const StateWithPropstoRenderProps = toRenderProps( withState('selectedState', 'setActive', initialSelected) );

  return (

    <StateWithPropstoRenderProps>{

      (withStateObject)=>{
        let { setActive, selectedState } = withStateObject;
    
        return (<div className='button-group'>
          { groubByButtonsList.map(({ label, value }, i) => {
            return (<Button 
              className='groubByButton'
              key={`button${i}`}
              variant="outlined"
              color={i===selectedState?'primary':'default'}
              onClick={ ()=>{ setActive( ()=>i ); actionCb({value});} }
            >
              {label}
            </Button>);
          })
          }
        </div>);
      }

    }</StateWithPropstoRenderProps>
  );};

export default NavReportButtonGroup;
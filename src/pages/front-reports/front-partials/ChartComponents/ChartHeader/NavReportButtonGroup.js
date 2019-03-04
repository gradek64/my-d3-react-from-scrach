import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

// third-party library for tracking simple state;
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

const NavReportButtonGroup = (props) => {
  const { groubByButtonsList, selectedGroupByValue, actionCb } = props;

  // pick selected by value kept on the state for update in parent component
  const initialSelected = groubByButtonsList.findIndex(({ value }) => value === selectedGroupByValue);

  /*
    *@using third-party library for simple state change for selecting active button;
    *@If you need access to props you need recompose/toRenderProps first
    *then U need recompose/withState that is wrapped in recompose/toRenderProp and returns a Component
    *this component in template has this layout :

      const MainStartComponet(props) => {

        return (
           <AnyStateComponent>{
             ()=>{
                  return {<base start component structure>}
              }
           }</AnyStateComponent>
        )

      }
  */
  const StateWithPropstoRenderProps = toRenderProps(withState('selectedState', 'setActive', initialSelected));

  return (
    <StateWithPropstoRenderProps>{
      // body of StateWithPropstoRenderProps expects a function;
      (withStateObject) => {
        const { setActive, selectedState } = withStateObject;

        return (
          <div className="button-group">
            { groubByButtonsList.map(({ label, value }, buttonIndex) => (
              <Button
                className="groubByButton"
                key={`button${buttonIndex}`}
                variant="outlined"
                color={buttonIndex === selectedState ? 'primary' : 'default'}
                onClick={() => { setActive(() => buttonIndex); actionCb({ value }); }}
              >
                {label}
              </Button>))
            }
          </div>);
      }

    }
    </StateWithPropstoRenderProps>
  );
};


NavReportButtonGroup.propTypes = {
  groubByButtonsList: PropTypes.instanceOf(Array).isRequired,
  selectedGroupByValue: PropTypes.string.isRequired,
  actionCb: PropTypes.instanceOf(Function),

};

NavReportButtonGroup.defaultProps = {
  actionCb: () => {},
};

export default NavReportButtonGroup;

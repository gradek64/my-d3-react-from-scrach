import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DropDownMenu from '../../../components/dropDownMenu';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DropdownContent from '../../../components/dropDownContent/contentRandom';
//desktop NavList
import DesktopNavList from '../MainNavList';

import './mobileNavList.scss';
//HOC component for utilizing Desktop Nav for mobile;
const MobileNavList = (BaseComponent) => {

  return class SimpleState extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        value: props.side,
        previuosOpen:null,
        previuosOpenState:false,
        currentIsOpen:false, 
      };
      this.updateCrossMinusIcon = this.updateCrossMinusIcon.bind(this);
    }
    updateCrossMinusIcon(event) {
      /*
        *@event.currentTarget is the one you click
        *@event.target is the one click is attached/register to ;)
      */
      if(event.target !== event.currentTarget) return;

      console.log('event.target',event.target);
      console.log('event.currentTarget',event.currentTarget);
      const { multipleOpenPass } = this.props;
      let current = event.target.closest('li');
      let previous = this.state.previousOpen;


      //U dont want below functionility for multiple tabs open
      if(!multipleOpenPass && previous && previous!==current){
        previous.setAttribute('dropped',false);
        current.setAttribute('dropped',true);
        //flip the state 
        this.setState({currentIsOpen:true});
        //constanly feed previous;
        this.setState({previousOpen:current});
        return;
      }

      if(multipleOpenPass && previous && previous!==current){
        //read HTML value for every <li> clicked after previuos is set;
        current.getAttribute('dropped')==='true'?
          this.setState({currentIsOpen:true}):
          this.setState({currentIsOpen:false});
      }
      
      this.setState(
        (state)=>{
          return {
            currentIsOpen:!state.currentIsOpen
          };},//state callback
        ()=>{
          current.setAttribute('dropped',this.state.currentIsOpen);
        });

      //constanly feed previous;
      this.setState({previousOpen:current});

    }

    render() {
      return <BaseComponent 
        asMobile={true} 
        page='kpi'
        callback={this.updateCrossMinusIcon} 
        multipleOpenPass={this.props.multipleOpenPass}
      />;
    }
  };

};
  
export default MobileNavList(DesktopNavList);

//export default withStyles(styles)(MobileNavList);

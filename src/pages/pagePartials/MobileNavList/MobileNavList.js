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

import './mobileNavList.scss';
//desktop NavList
import DesktopNavList from '../MainNavList';


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

/*const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'left',
  },
  icon: {
    margin: theme.spacing.unit - 10,
  },
  robotoLight:{
    fontWeight:theme.typography.fontWeightLight,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});*/



const MobileNavList = (BaseComponent) => {

  return class SimpleState extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        value: props.side,
        previous:{
          element:null,
          open:null,
        }, 
        currentIsOpen:false, 
      };
      this.updateState = this.updateState.bind(this);
    }
    updateState(event) {
      let current = event.target.closest('li');
      let previous = this.state.previousOpen;

      console.log('previousOpen',previous);
    

      this.setState(
        (state)=>{
          return {
            currentIsOpen:!state.currentIsOpen
          };},()=>{
          console.log('.........this.state.currentIsOpen..',this.state.currentIsOpen);
          current.setAttribute('dropped',this.state.currentIsOpen);
        });


      /* current.setAttribute('dropped',true);
      if(this.state.previousOpen===current){
        console.log('same');
        current.setAttribute('dropped',true);
      }*/

      console.log('current', current);


      //current becomes previous;
      if(previous!==current&&previous!==null){
        console.log('//////////set////////////');
       
        if(previous)previous.setAttribute('dropped',false);
        current.setAttribute('dropped',false);
      }


      this.setState({previousOpen:current});

       
      /*this.setState(()=>{
        return{ 
          previousOpen:current
        };
      },()=>{
        console.log(this.state.previousOpen);
      });*/

      /*const flip = this.state.value === "dark" ? "light" : "dark";
      this.setState({ value: flip });*/
    }
    render() {
      console.log('this.props', this.props.children);
      return <BaseComponent asMobile={true} callback={this.updateState}/>;
    }
  };

};
  
export default MobileNavList(DesktopNavList);

//export default withStyles(styles)(MobileNavList);

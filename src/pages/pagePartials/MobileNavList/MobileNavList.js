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
//HOC component for utilizing Deskotop Nav for mobile;
const MobileNavList = (BaseComponent) => {

  return class SimpleState extends React.Component {
    constructor(props) {
      super(props);
      /*this.state = { 
        value: props.side,
        previous:null,
        currentIsOpen:false, 
      };*/
      this.updateState = this.updateState.bind(this);
    }
    updateCrossMinusIcon(event) {
      let current = event.target.closest('li');
      let previous = this.state.previousOpen;

      if(previous && previous!==current){
        previous.setAttribute('dropped',false);
        current.setAttribute('dropped',true);
        //flip the state 
        this.setState({currentIsOpen:true});
        //constatly feed previous;
        this.setState({previousOpen:current});
        return;
      }
    
      this.setState(
        (state)=>{
          return {
            currentIsOpen:!state.currentIsOpen
          };},//state callback
        ()=>{
          current.setAttribute('dropped',this.state.currentIsOpen);
        });

      //constatly feed previous;
      this.setState({previousOpen:current});

    }

    render() {
      return <BaseComponent asMobile={true} callback={this.updateCrossMinusIcon}/>;
    }
  };

};
  
export default MobileNavList(DesktopNavList);

//export default withStyles(styles)(MobileNavList);

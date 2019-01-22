import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';

//test

class DropDownMenu extends React.Component {
  state = {
    anchorEl: null,
    showDropDownMenu: false,
    previousOpen:null
  };
  anchorEl = React.createRef();

  /*
    *@ReactDOM.findDOMNode(this) find DOM element of this so componet <DropDownMenu>
    *@then we need to establish its outer parent for referencing boundaries for 
    *@absolute position children that needs to have container of position:relative somewhere
  */
  componentDidMount(){
    this.DropDownMenuEl = ReactDOM.findDOMNode(this);
    const el = ReactDOM.findDOMNode(this);
    el.closest('[dropdownmenuanchor=yes]') ?
      el.closest('[dropdownmenuanchor=yes]')
        .style.position = 'relative':
      null;
  }

  showDropDown = () => {
    if(this.props.onMouseEnter) this.setState({ showDropDownMenu: true });
  };

  hideDropDown = () => {
    if(this.props.onMouseEnter) this.setState({ showDropDownMenu: false });
  };

  toggleMenuOpen = (showDropDownMenuState) => {
    console.log('is toggling');
    this.setState({ showDropDownMenu: !showDropDownMenuState });
  }

  handleClose = (event) => {
    /*
      *@ClickAwayListener Class is Material UI overlay that listenes for any click on the entire page
      *@once any element is clicked it assigns to event.target === elementClicked
      *@now if our element clicked is our react refference element this.anchorEl.current === event.target
      *@which is the same as 'contaoins' then funcioned is returned in if statament so doenst go any further
      *@by if statement if(this.anchorEl.current.contains(event.target)) checking what element is clicked
    */
    if (this.anchorEl.current.contains(event.target)) {
      return;
    }
    this.setState({ showDropDownMenu:false });
  };

  render() {
    const { 
      children, 
      placement, 
      collapsebleAccordion,
      multipleOpen,
      animation
    } = this.props;
    const { showDropDownMenu } = this.state;
    return (
        
      <div 
        ref={this.anchorEl}
        onMouseEnter={this.showDropDown}
        onMouseLeave={this.hideDropDown}
      >
        {/*show ClickAwayListener only when menu is not multipleOpen so close the last one*/}
        {!multipleOpen?
          <ClickAwayListener onClickAway={ this.handleClose }>
            <div></div>
          </ClickAwayListener>:null
        }
        {/*show ClickAwayListener only when manu is open*/}
        <div>
          {React.Children.map(children, (child, i) => {

            /* first child is alway a trigger for mobile Click
            all clicks needs to be set to this element 
            */
          
            if (i == 0)return <div 
              className='tab-header'
              onClick={()=>{this.toggleMenuOpen(showDropDownMenu);}}>
              {child}
            </div>;
          
            /* second child is DropDownMenu Content 
            render element cause <Collapse /> will look after to show it or not
            */
            if(i==1 /*&& showDropDownMenu*/) {
              return (
                <div style={{
                  position:collapsebleAccordion?'block':'absolute',
                  left:0,
                  color:'black',
                  transform: placement==='left'?'translate(-100%)':'translate(0)'
                }}>
                  {animation?
                    <Collapse in={showDropDownMenu} >
                      {child}
                    </Collapse>:null
                  }
                  {!animation && showDropDownMenu?child:null}
                </div>);
            }
          })}
        </div>
        
      </div>
       
    );
  }
}

DropDownMenu.defaultProps = {
  onMouseEnter: true,
  animation:false,
  collapsebleAccordion: false,
  multipleOpen: false,
  placement:'right'
};

export default DropDownMenu;

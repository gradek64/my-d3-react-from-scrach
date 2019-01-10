import React from 'react';
import VendorDropDown from '../customized-vendors/dropDownVendor';

class DropDownListProps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
    this.props = props;
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //anchor element ref
    this.anchorEl = React.createRef();
  }
  handleToggle(){
    this.setState( state => ({open: !state.open}) 
    );
  }
  handleClose(event){

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
    this.setState({ open: false });
  }

  render() {
    const {list , placement , direction } = this.props;
    const  { open } = this.state;

    return(
      <div>
        <div ref={this.anchorEl} onClick={() => this.handleToggle()}> 
          {this.props.children}
        </div>
        <VendorDropDown 
          list={list} 
          clickAwayHandler={ this.handleClose }
          open={open}
          anchor = {this.anchorEl.current}
          placement={placement}
          direction={direction}
        />
      </div>
    );
  }
}

export default DropDownListProps;
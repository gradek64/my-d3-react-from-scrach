import React from 'react';
import VendorDropDown from '../customized-vendors/dropDown';

class myDropDown extends React.Component {
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
          *@ClickAwayListener Class in VendorDropDown detects
          *@element you click on , so if you click on Logo, any element
          *@on the page it will set it as event.target
          *@therefore if you clik our 'this.anchorEl' it will stop function from running 
          *@by if statement if(this.anchorEl.current.contains(event.target)) checking what element clicked
        */
        if (this.anchorEl.current.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    }

    render() {
        const {list , verticalPlacement } = this.props;
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
                    verticalPlacement={verticalPlacement}
                />
            </div>
        );
    }
}

export default myDropDown;
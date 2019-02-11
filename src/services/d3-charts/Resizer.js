import React from 'react';

class Resizer extends React.Component {
  constructor(props) {
    super(props);
    /*
      *@intial state set to window 
      *@to prevent d3 comlain about not receive any dememntions;
    */
    this.state = {
      containerWidth: window.innerWidth,
      containerHeight: window.innerHeight
    };
    this.resizeWindow = this.resizeWindow.bind(this);

  }
  resizeWindow() {
    this.setState({
      containerWidth: document.querySelector('.chart').clientWidth,
      containerHeight: document.querySelector('.chart').clientHeight
    });
  }

  componentDidMount() {
    this.setState({
      containerWidth: document.querySelector('.chart').clientWidth,
      containerHeight: document.querySelector('.chart').clientHeight
    });

    window.addEventListener('resize', this.resizeWindow,false);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.resizeWindow,false);
  }

  render() {
    const propsTranform = {
      data:this.props.data,
      type:this.props.type,
      svgWidth:this.props.type!=='bar'?this.state.containerWidth/2:this.state.containerWidth,
      svgHeight:this.props.type!=='bar'
        ?this.state.containerHeight/2:
        this.state.containerHeight/2+this.state.containerHeight/5,
      svgElementsCB:this.props.svgElementsCB
    };
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, {...propsTranform})}
      </React.Fragment>
    );
  }
}

export default Resizer;
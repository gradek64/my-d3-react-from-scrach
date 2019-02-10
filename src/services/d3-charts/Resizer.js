import React from 'react';

class Resizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
    this.resizeWindow = this.resizeWindow.bind(this);
    this.myRef = React.createRef();
  }
  resizeWindow() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeWindow,false);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.resizeWindow,false);
  }

  render() {
    const propsTranform = {
      data:this.props.data,
      type:this.props.type,
      svgWidth:this.state.windowWidth,
      svgHeight:this.state.windowHeight/2,
      svgElementsCB:this.props.svgElementsCB
    };
    return (
      <div>
        {React.cloneElement(this.props.children, {...propsTranform})}
      </div>
    );
  }
}

export default Resizer;
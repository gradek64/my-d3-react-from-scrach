import React from 'react';

class Resizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  }
  resizeWindow() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeWindow.bind(this));
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.resizeWindow.bind(this));
  }

  render() {
    const propsTranform = {
      data:this.props.data,
      svgWidth:this.state.windowWidth,
      svgHeight:this.state.windowHeight/2,
    };
    return (
      <div>
        {React.cloneElement(this.props.children, {...propsTranform})}
      </div>
    );
  }
}

export default Resizer;
import React from 'react';
import Chart from './BarChart';

export default class Risizer extends React.Component {
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
    return (
      <React.Fragment>
        <Chart
          svgWidth={this.state.windowWidth}
          svgHeight={this.state.windowHeight}
        />
      </React.Fragment>
    );
  }
}

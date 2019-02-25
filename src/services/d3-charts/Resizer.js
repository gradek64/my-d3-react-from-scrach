import React from 'react';

class Resizer extends React.Component {
  constructor(props) {
    super(props);
    /*
      *@intial state set to window 
      *@to prevent d3 comlain about not receive any dememntions;
    */
    this.state = {
      containerWidth: null,
      containerHeight: null,
      dataChange:this.props.data,
      typeChange:this.props.type,
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

    //window.addEventListener('resize', this.resizeWindow,false);
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):

    if (this.props.data !== prevProps.data) {

      console.log('this.props Resizer', this.props.data);
      console.log('prev Resizer', prevProps.data);

      this.setState({
        dataChange:this.props.data,
        typeChange:this.props.type,
      });
    }
  }

  componentWillUnmount(){
    // window.removeEventListener('resize', this.resizeWindow,false);
  }

  render() {

    const { dataChange, typeChange } = this.state;
    const propsTranform = {
      /* data:this.props.data,
      type:this.props.type,*/
      svgWidth:this.props.type!=='bar'?this.state.containerWidth/2:this.state.containerWidth,
      svgHeight:this.props.type!=='bar'
        ?this.state.containerHeight/2:
        this.state.containerHeight/2+this.state.containerHeight/5,
      svgElementsCB:this.props.svgElementsCB
    };

    console.log('dataChange',dataChange);

    {/*<div className='diagram' style={{
        width:propsTranform.svgWidth,
        height :propsTranform.svgWidth
        }}*/}
    return (<div className='diagram'>
      {
        /*this.state.containerWidth||dataChange ? React.cloneElement(this.props.children, {data:dataChange,type:typeChange,...propsTranform}):null*/
        React.cloneElement(this.props.children, {data:dataChange,type:typeChange,...propsTranform})
      }
    </div>
    );
  }
}

export default Resizer;
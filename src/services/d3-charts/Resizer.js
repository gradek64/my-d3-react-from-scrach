import React from 'react';


/** ********************************************************************


  this class Component is resposible for getting the size of SVG container and
  also for keeping track if data has changed in props in componentDidUpdate method
  so it will update data accordingly

/********************************************************************* */

class Resizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerWidth: null,
      containerHeight: null,
      dataChange: this.props.data,
      typeChange: this.props.type,
    };
    this.resizeWindow = this.resizeWindow.bind(this);
  }
  resizeWindow() {
    this.setState({
      containerWidth: document.querySelector('.chart').clientWidth,
      containerHeight: document.querySelector('.chart').clientHeight,
    });
  }

  /*
    *@Initially this componet has window event attached onResize for svg to resize
    *@but now SVG is using viewbox='0 0 width height' and percentage for scaling so
    *@there is no need to implement that anymore;
  */

  componentDidMount() {
    this.setState({
      containerWidth: document.querySelector('.chart').clientWidth,
      containerHeight: document.querySelector('.chart').clientHeight,
    });
    // window.addEventListener('resize', this.resizeWindow,false);
  }
  /*
    *@data has changed rerender nested components by
    *@sending new props to them;
  */
  componentWillReceiveProps(nextProps) {
    /*
      *@for future comparison of object I will use some external libray as lodash
      *@as it is much more acureate and it is part of functional programming;
    */

    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)
      || JSON.stringify(this.props.type) !== JSON.stringify(nextProps.type)) {
      this.setState(() => ({
        dataChange: nextProps.data,
        typeChange: nextProps.type,
      }));
    }
  }

  /*
    *@remember to cancel DOM events once U dont need it anymore
  */
  componentWillUnmount() {
    // window.removeEventListener('resize', this.resizeWindow,false);
  }

  render() {
    const {
      dataChange, typeChange, containerWidth, containerHeight,
    } = this.state;
    const { type } = this.props;

    const propsTranform = {
      svgWidth: type !== 'bar' ? containerWidth / 2 : containerWidth,
      svgHeight: type !== 'bar'
        ? containerHeight / 2 :
        containerHeight / 2 + containerHeight / 5,
      // below is pass function from ChartComponents
      changeViewClick: this.props.changeViewClick,
    };
    return (
      <div className="diagram">
        {
        /* this.state.containerWidth||dataChange ? React.cloneElement(this.props.children, {data:dataChange,type:typeChange,...propsTranform}):null */
          React.cloneElement(this.props.children, { data: dataChange, type: typeChange, ...propsTranform })
        }
      </div>
    );
  }
}

export default Resizer;

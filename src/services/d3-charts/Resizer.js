import React from 'react';
import PropTypes from 'prop-types';

/** ********************************************************************


  this class Component is resposible for getting the size of SVG container and
  also for keeping track if data has changed in props in componentDidUpdate method
  so it will update data accordingly

/********************************************************************* */

class Resizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerWidth: document.querySelector('.chart').clientWidth,
      containerHeight: document.querySelector('.chart').clientHeight,
      dataChange: props.data,
      typeChange: props.type,
    };
    this.resizeWindow = this.resizeWindow.bind(this);
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

  resizeWindow() {
    this.setState({
      containerWidth: document.querySelector('.chart').clientWidth,
      containerHeight: document.querySelector('.chart').clientHeight,
    });
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
        (containerHeight / 2) + (containerHeight / 5),
      // below is pass function from ChartComponents
      changeViewClick: this.props.changeViewClick,
    };
    return (
      <div className="diagram">
        {
        // eslint-disable-next-line max-len
        /* this.state.containerWidth||dataChange ? React.cloneElement(this.props.children, {data:dataChange,type:typeChange,...propsTranform}):null */
        // eslint-disable-next-line max-len
          React.cloneElement(this.props.children, { data: dataChange, type: typeChange, ...propsTranform })
        }
      </div>
    );
  }
}


Resizer.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  changeViewClick: PropTypes.instanceOf(Function),
};

Resizer.defaultProps = {
  changeViewClick: () => {},
};

export default Resizer;

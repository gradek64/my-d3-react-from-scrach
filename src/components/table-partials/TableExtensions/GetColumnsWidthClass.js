import React from 'react';


class GetColumnsWidthClass extends React.Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    // get table columns widths;
    this.getColumnWidth();
  }
  state = {
    columnWidthArray: null,
    isLoading: true,
    updateDone: false,
  }
  /*
  componentDidUpdate(prevProps, prevState) {
  // One possible fix...
  let height = ReactDOM.findDOMNode(this).offsetHeight;
  if (this.state.height !== height ) {
    this.setState({ internalHeight: height });
  }
} */

  shouldComponentUpdate(prevProps, prevState) {
    console.log(prevProps);
    if (this.state.columnWidthArray && prevState.columnWidthArray) {
      if (prevState.columnWidthArray.toString() === this.state.columnWidthArray.toString()) {
        return true;
      }
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prevState.columnWidthArray', prevState.columnWidthArray);
    console.log('prevState.columnWidthArray', this.state.columnWidthArray);

    if (this.state.columnWidthArray && prevState.columnWidthArray) {
      if (prevState.columnWidthArray.toString() === this.state.columnWidthArray.toString()) {
        const delay = setTimeout(() => {
        // this.setState({ updateDone: true });
          console.log('agagedge');
          clearTimeout(delay);
          const trDOM = Array.from(document.querySelector('table tbody tr').children);
          const columnWidthArray = trDOM.map(e => e.clientWidth);
          this.setState({ columnWidthArray, isLoading: false }, () => {
            console.log('.........this.state.columnWidthArray......', this.state.columnWidthArray);
          });
        }, 10);
      }
    }
  }

  getColumnWidth = (update) => {
    // with delay to make sure is correct reading from REAL Dom;
    // access <tr> for the table from tableRef DOM element
    const delay = setTimeout(() => {
      console.log('update');
      clearTimeout(delay);
      const trDOM = Array.from(document.querySelector('table tbody tr').children);
      const columnWidthArray = trDOM.map(e => e.clientWidth);
      // update state;
      this.setState({ columnWidthArray, isLoading: false });
    }, 1000);
  }


  render() {
    const { columnWidthArray, isLoading } = this.state;
    /*
      *@check the render method in new external example
      *@
    */
    return this.props.render(columnWidthArray, isLoading);
  }
}

export default GetColumnsWidthClass;

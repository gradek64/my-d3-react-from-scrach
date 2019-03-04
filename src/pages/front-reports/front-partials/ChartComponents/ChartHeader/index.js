import React from 'react';
import Button from '@material-ui/core/Button';
import DropDownSelectIconList from '../../../../../components/DropDownSelectIconList';
import Icon from '@material-ui/core/Icon';
import NavReportButtonGroup from './NavReportButtonGroup';
import './chart.scss';

class ChartHeader extends React.Component {
  state = {
    chartTypes: this.props.chartTypes[this.props.tabActive],
    typeSelected: this.props.chartTypes[this.props.tabActive].find(({ selected }) => selected),
    groubByButtons: this.props.groubByButtons[this.props.tabActive],
    changeViewState: false,
    groubByButtonSelected: this.props.groubByButtons[this.props.tabActive] ?
      this.props.groubByButtons[this.props.tabActive].find(({ selected }) => selected).value :
      'none',
    iconDownload: this.props.chartTypes[this.props.tabActive].find(({ selected }) => selected).value === 'table',
  }

  // render first chart once component is ready;
  componentDidMount() {
    this.renderChart();
  }

  /*
    *@there one more react cycle method called ---  componentShouldUpdate(nextProps) { return true/false } ----
    *@it returns true or false , U make condition when should update no good for me
    *@since I always want to change state but once it returns true it wont update nothing,
    *@could be usefull in the future ;)
  */

  /*
    *@componentDidUpdate is neccessary to keep track between prevProps and updated Props
    *@React wont update props once they sent, to change them U need use state for your changes
  */
  componentDidUpdate(prevProps) {
    const {
      chartTypes, groubByButtons, tabActive, changeView,
    } = this.props;
    const {
      chartTypes: prevTypes, groubByButtons: prevButtons, tabActive: previousTab,
      changeView: prevChangeView,
    } = prevProps;

    /*
      *@selected it doenst live on props it gets created from chartTypes array by selected property
      *@thefore you need listen for changes by looking for array change and then selecting;
    */
    const selected = chartTypes[tabActive].find(({ selected }) => selected);
    const prevSelected = prevTypes[previousTab].find(({ selected }) => selected);
    // change view

    if (changeView !== prevChangeView) {
      this.setState({
        changeViewState: changeView,
      });
    }
    // charTypes has changed
    if (chartTypes[tabActive] !== prevTypes[previousTab]) {
      this.setState({
        chartTypes: chartTypes[tabActive],
        iconDownload: selected.value === 'table',
      });
    }
    // selected type changed important for changing tab
    if (selected !== prevSelected) {
      this.setState({
        typeSelected: selected,
      });
    }
    /*
      *@menu for reports has changed thefore select groubBybutton has changed;
      *@therefore tabActive has change so once all complited render chart as callback
    */
    if (groubByButtons[tabActive] !== prevButtons[previousTab]) {
      this.setState({
        groubByButtons: groubByButtons[tabActive],
        groubByButtonSelected: this.props.groubByButtons[tabActive] ?
          this.props.groubByButtons[tabActive].find(({ selected }) => selected).value :
          'none',
      }, this.renderChart);
    }
  }

  renderChart() {
    console.log(
      '\n\n.....ONCE.......\n\n',
      'typeSelected::: ', this.state.typeSelected.value, 'page::: ', this.props.page,
      'tabActive:: ', this.props.tabActive,
      'groubByButtonSelected:: ', this.state.groubByButtonSelected, '\n\n.....ONCE.......\n\n',
    );

    // notify outside componets;
    this.props.getData(this.state);
  // border:!changeViewState?`1px solid ${disableColor} !important`:'null'
  }

  onSelectType = (typeSelected) => {
    const iconDownload = typeSelected.value === 'table';
    this.setState({
      iconDownload,
      typeSelected,
    }, this.renderChart);
  }

  onGroupButtonClick = ({ value }) => {
    // asign groubByButtonSelected;
    this.setState({ groubByButtonSelected: value }, this.renderChart);
  }

  render() {
    const { changeViewState } = this.state;
    return (
      <div data-ng-if="!opts.disableToolbar" className="col s12 chart-toolbar">

        {/* <!-- Left controls --> */}
        <div className="left select-chart">
          {/* <!-- type toggle --> */}
          <DropDownSelectIconList
            tabActive={this.props.tabActive}
            items={this.state.chartTypes}
            selected={this.state.typeSelected}
            disable={changeViewState}
            action={this.onSelectType}
          >
            <Icon color={changeViewState ? 'disabled' : 'primary'} >{this.state.typeSelected.materialIcon}</Icon>
            <Icon color={changeViewState ? 'disabled' : 'primary'} >arrow_drop_down</Icon>
          </DropDownSelectIconList>
          {/* <!-- chart drill down close button--> */}
          {
            <div className="close-button chart-controls">
              {this.state.changeViewState ? <Button variant="outlined" onClick={this.props.onChartInnerClose}><Icon>close</Icon></Button> : null}
            </div>
          }
        </div>

        {/* <!-- Middle toolbar --> */}
        <div>
          {this.state.groubByButtons ?
            <NavReportButtonGroup
              groubByButtonsList={this.state.groubByButtons}
              selectedGroupByValue={this.state.groubByButtonSelected}
              actionCb={this.onGroupButtonClick}
            />
            : null}
        </div>


        {/* <!-- Right controls --> */}
        <div className="right chart-controls right-align">
          {this.state.iconDownload ? <Button variant="outlined" ><Icon>file_download</Icon></Button> : null}
        </div>
      </div>
    );
  }
}

export default ChartHeader;

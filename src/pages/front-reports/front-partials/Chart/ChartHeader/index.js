import React from 'react';
import Button from '@material-ui/core/Button';
import DropDownSelectIconList from '../../../../../components/DropDownSelectIconList';
import Icon from '@material-ui/core/Icon';
import NavReportButtonGroup from './NavReportButtonGroup';
import './ChartHeader.scss';

class ChartHeader extends React.Component {

  constructor(props){
    super(props);

    console.log('...chart ChartHeader props......', props);
    console.log('...chart ChartHeader state......', this.state);
  }

  state = {
    chartTypes:this.props.chartTypes[this.props.tabActive],
    typeSelected:this.props.chartTypes[this.props.tabActive].find(({selected})=>selected),
    groubByButtons:this.props.groubByButtons[this.props.tabActive],
    groubByButtonSelected:this.props.groubByButtons[this.props.tabActive]?
      this.props.groubByButtons[this.props.tabActive].find(({selected})=>selected).value:
      'none',
    iconDownload:false
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):

    const {chartTypes,groubByButtons, tabActive } = this.props;
    const {chartTypes:prevTypes,groubByButtons:prevButtons, tabActive:previousTab } = prevProps;

    const selected = chartTypes[tabActive].find(({selected})=>selected);
    const prevSelected = prevTypes[previousTab].find(({selected})=>selected);
  

    if (chartTypes[tabActive] !== prevTypes[previousTab] ) {
      this.setState({ chartTypes:chartTypes[tabActive] });
    }
    if (selected !== prevSelected && tabActive!==previousTab) {
      this.setState({ 
        typeSelected:selected
      });

    }
    if (groubByButtons[tabActive] !== prevButtons[previousTab]) {
      this.setState({ 
        groubByButtons:groubByButtons[tabActive]
      });
    }
  }

  shouldComponentUpdate(prevProps) {

    const {chartTypes,groubByButtons, tabActive , typeSelected} = this.props;
    const {chartTypes:prevTypes,
      groubByButtons:prevButtons, 
      tabActive:previousTab,
      typeSelected:previousSelected } = prevProps;
    if(!chartTypes[tabActive]) return true;
    const selectedChange = chartTypes[tabActive].find(({selected})=>selected )
                    !== prevTypes[previousTab].find(({selected})=>selected);
    console.log('typeSelected',typeSelected);
    console.log('previousSelected',previousSelected);
    console.log(selectedChange);
    //const differentDone = this.props.done !== nextProps.done;
    return selectedChange;
  }

  onSelectType = (selected) => {
    const iconDownload = selected.value==='table'? true:false;
    this.setState({ iconDownload });
    this.setState((state)=>{
      return { typeSelected: selected };
    });

    console.log(this.state.groubByButtons);


    /* console.log('resposible for render chart from here.......',
      selected,'page:', this.props.page , 
      'tabActive', this.props.tabActive,
      'groubByButtonSelected', this.state.groubByButtonSelected
    );*/
  };

  onGroupButtonClick = ({value}) => {
    console.log('and type selected',this.state.typeSelected);
    console.log('value', value);
    console.log('groubByButtonSelected', this.state.groubByButtonSelected);
 
    //asign groubByButtonSelected;
    /*this.setState({groubByButtonSelected:value},()=>{
      console.log(this.state);  
    });*/
  }

  render(){
    return (
      <div data-ng-if="!opts.disableToolbar" className="col s12 chart-toolbar">

        {/*<!-- Left controls -->*/}
        <div className="left">
          {/*<!-- type toggle -->*/}
          <DropDownSelectIconList 
            tabActive={this.props.tabActive}
            items={this.state.chartTypes} 
            selected={this.state.typeSelected} 
            action={this.onSelectType}>
            <Icon color={'primary'} >{this.state.typeSelected.materialIcon}</Icon>
            <Icon color={'primary'} >arrow_drop_down</Icon>
          </DropDownSelectIconList>
        </div>

        {/*<!-- Middle toolbar -->*/}
        <div>
          {this.state.groubByButtons?
            <NavReportButtonGroup 
              groubByButtonsList={this.state.groubByButtons} 
              actionCb={this.onGroupButtonClick}
            />
            :null}
        </div>

        {/*<!-- Right controls -->*/}
        <div className="right chart-controls right-align">
          {this.state.iconDownload?<Button variant="outlined" ><Icon>{'file_download'}</Icon></Button>:null}
        </div>
      </div>
    );
  }

}

export default ChartHeader;
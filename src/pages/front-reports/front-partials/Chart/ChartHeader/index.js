import React from 'react';
import Button from '@material-ui/core/Button';
import DropDownSelectIconList from '../../../../../components/DropDownSelectIconList';
import Icon from '@material-ui/core/Icon';
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
    iconDownload:false
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):

    const {chartTypes,groubByButtons, tabActive } = this.props;
    const {chartTypes:prevTypes,groubByButtons:prevButtons, tabActive:previousTab } = prevProps;

    const selected = chartTypes[tabActive].find(({selected})=>selected);
    const prevSelected = prevTypes[previousTab].find(({selected})=>selected);
  

    if (chartTypes[tabActive] !== prevTypes[previousTab]) {
      this.setState({ chartTypes:chartTypes[tabActive] });
    }
    if (selected !== prevSelected && tabActive!==previousTab) {
      this.setState({ typeSelected:selected });
    }
    if (groubByButtons[tabActive] !== prevButtons[previousTab]) {
      this.setState({ groubByButtons:groubByButtons[tabActive] });
    }
  }

  onSelectType = (selected) => {
    const iconDownload = selected.value==='table'? true:false;
    this.setState({ iconDownload });
    this.setState(()=>{
      return { typeSelected: selected };
    });


    console.log('resposible for render chart from here.......',
      selected,'page:', this.props.page , 'tabActive', this.props.tabActive
    );
  };

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
          {this.state.groubByButtons?this.state.groubByButtons.map(({ label, value, selected },i)=>{
          
            return (<Button 
              className='groubByButton'
              key={`button${i}`}
              variant="outlined"
              color={selected?'primary':'default'}
              onClick={()=>console.log({value})}
            >
              {label}
            </Button>);}):null}
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
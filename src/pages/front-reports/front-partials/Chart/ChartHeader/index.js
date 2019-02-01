import React from 'react';
import Button from '@material-ui/core/Button';
import DropDownSelectIconList from '../../../../../components/DropDownSelectIconList';
import Icon from '@material-ui/core/Icon';
import './ChartHeader.scss';

class ChartHeader extends React.Component {

  state = {
    chartTypes:this.props.chartTypes,
    typeSelected:this.props.chartTypes.find(({selected})=>selected),
    groubByButtons:this.props.groubByButtons,
    iconDownload:false
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    console.log('prevProps.typeSelected',prevProps.typeSelected);
    console.log('this.props.typeSelected',this.props.typeSelected);

    const selected = this.props.chartTypes.find(({selected})=>selected);
    const prevSelected = prevProps.chartTypes.find(({selected})=>selected);

    const {chartTypes,groubByButtons}= this.props;

    if (chartTypes !== prevProps.chartTypes) {
      this.setState({ chartTypes });
    }
    if (selected !== prevSelected) {
      console.log('selected',selected);
      console.log('prevSelected',prevSelected);
      console.log('this.state.typeSelected', this.state.typeSelected);
      this.setState({ typeSelected:selected });
    }
    if (groubByButtons !== prevProps.groubByButtons) {
      this.setState({ groubByButtons });
    }
  }

  onSelectType = (type) => {
    console.log(type);
    const iconDownload = type==='table'? true:false;
    this.setState({ iconDownload });
  };

  render(){
    return (
      <div data-ng-if="!opts.disableToolbar" className="col s12 chart-toolbar">

        {/*<!-- Left controls -->*/}
        <div className="left">
          {/*<!-- type toggle -->*/}
          <DropDownSelectIconList items={this.state.chartTypes} selected={this.state.typeSelected.value} action={this.onSelectType}>
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
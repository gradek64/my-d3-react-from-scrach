import React from 'React';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class TableDataFilter extends React.Component {

   inputs = Array.from(Array(this.props.items.length), () => true)
   state = {
     checkedSelectAll:this.props.checkedSelectAll,
     checked:this.props.filterDataSelected,
     atLeastOneChecked:true,
   }

   componentDidUpdate(prevProps) {
     if (this.props.filterDataSelected !== prevProps.filterDataSelected) {
       this.setState({
         checked:this.props.filterDataSelected,
         checkedSelectAll:this.props.checkedSelectAll
       });
     }
   }

  handleChange = index => event => {

      
    if(event.currentTarget.id==='selectAll'){

      const { checkedSelectAll } = this.state;
      const allChecked = this.state.checked.fill(true);

      console.log('checkedSelectAll', checkedSelectAll);
      this.setState(()=>{
        return {
          checkedSelectAll:checkedSelectAll===false?true:checkedSelectAll,
          checked:[...allChecked]
        };
      },()=>{
      //update records in ReportsTableDataStructure and selectAll button;
        this.props.updateRecord(this.state.checked, this.state.checkedSelectAll);
      });
 
    }else {
      
      //make sure that U will update if at least one is selected 
      if(this.state.atLeastOneChecked || this.state.checked[index]!==true){
        this.state.checked[index]= !this.state.checked[index];
      }
      this.setState(()=>{
        return {
          checkedSelectAll:false,
          checked:[...this.state.checked]
        };
      },()=>{
        const howManyUnselected = this.state.checked.filter((input)=>input===false);
        //check how many is unselected to make sure at least one is selected
        howManyUnselected.length===this.state.checked.length-1?
          this.setState({atLeastOneChecked:false}):
          this.setState({atLeastOneChecked:true});
        //update records in ReportsTableDataStructure and selectAll button;
        this.props.updateRecord(this.state.checked, this.state.checkedSelectAll);
      });
    }


    /* console.log('Target',event.currentTarget.querySelector('input'));
    console.log('eventCurrentTarget',event.currentTarget);*/

  }

  render(){ 
    const { classes, items, accessor } = this.props;
    return (
      <List dense className={classes.root}>
        <ListItem role={undefined} dense button onClick={this.handleChange(null)} id='selectAll'>
          <Checkbox
            checked={this.state.checkedSelectAll}
            tabIndex={-1}
            value="this.state.checkedSelectAll"
            disableRipple
            classes={{
              root: classes.root,
              checked: classes.checked,
            }}
          />
          <ListItemText primary={'Select All'} />
        </ListItem>
        <Divider />
        {items.map((item,i) => (
          <ListItem key={`value${i}`} role={undefined} dense button onClick={this.handleChange(i)}>
            <Checkbox
              checked={this.state.checked[i]}
              tabIndex={-1}
              value="this.state.checked[i]"
              disableRipple
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
            <ListItemText primary={item[accessor]} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(TableDataFilter);

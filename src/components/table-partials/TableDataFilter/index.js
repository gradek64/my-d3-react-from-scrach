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
     checkedAll:true,
     checked:this.inputs,
     atLeastOneChecked:true,
   };

  handleChange = index => event => {

    if(event.currentTarget.id==='selectAll'){
      const { checkedAll } = this.state;
      const allChecked = Array.from(Array(this.props.items.length), () => true);
      this.setState(()=>{
        return {
          checkedAll:this.state.checkedAll===false?!checkedAll:this.state.checkedAll,
          checked:[...allChecked]
        };
      });
    }else {
      
      if(this.state.atLeastOneChecked || this.state.checked[index]!==true){
        this.state.checked[index]= !this.state.checked[index];
      }
      this.setState(()=>{
        return {
          checkedAll:false,
          checked:[...this.state.checked]
        };
      },()=>{
        const howManyUnselected = this.state.checked.filter((input)=>input===false);
        howManyUnselected.length===this.state.checked.length-1?
          this.setState({atLeastOneChecked:false}):
          this.setState({atLeastOneChecked:true});
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
            checked={this.state.checkedAll}
            tabIndex={-1}
            value="checkedAll"
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

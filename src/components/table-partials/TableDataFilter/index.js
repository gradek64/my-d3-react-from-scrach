import React from 'React';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';


import { withStyles } from '@material-ui/core/styles';

const styles =  theme => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border:'1px solid red',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  customInputSearch:{
    margin:0
  }
});

class TableDataFilter extends React.Component {

   //here U need clone of items since it will affect original once filtering
   cloneData = this.props.items.slice(0);
   state = {
     checkedSelectAll:this.props.checkedSelectAll,
     checked:this.props.filterDataSelected,
     atLeastOneChecked:true,
     data:this.cloneData,
     searchData:this.cloneData
   }

   componentDidUpdate(prevProps) {
     if (this.props.filterDataSelected !== prevProps.filterDataSelected) {
       this.setState({
         checked:this.props.filterDataSelected,
         checkedSelectAll:this.props.checkedSelectAll
       });
     }
   }

  handleSearch = event => {
    const { value } = event.target;
    const searchData = this.state.data.filter((item)=>{
      const convertedItem = item[this.props.accessor];
      return convertedItem
        .toString()
        .toLowerCase()
        .includes( value.toString().toLowerCase() );    
    });
    this.setState({searchData});
  }

  handleChange = index => event => {
      
    if(event.currentTarget.id==='selectAll'){

      const { checkedSelectAll } = this.state;
      const allChecked = this.state.checked.fill(true);

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
    const { classes, accessor } = this.props;
    const { searchData } = this.state;
    return (
      <List dense className={classes.root}>
        <ListItem>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={this.handleSearch}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </ListItem>
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
        {searchData.map((item,i) => (
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

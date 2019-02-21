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
   cloneData = this.props.items.slice();
   state = {
     checkedSelectAll:this.props.checkedSelectAll,
     checked:this.props.filterDataSelected,
     atLeastOneChecked:true,
     data:this.cloneData,
     searchData:this.cloneData,
     lastSearchValue:{...this.props.filterByValueSet}
   }

   componentDidUpdate(prevProps) {

     //reset search once you applied a diffrent filter/search

     /* if (this.props.filterBy !== prevProps.filterBy) {
       console.log('prevProps',prevProps);
       console.log(this.props);
       if(this.props.filterBy!==this.props.accessor){
         this.setState({
           lastSearchValue:{
             [this.props.accessor]:''
           }
         });
       }
       
     }
     //update data;
     if (this.props.items !== prevProps.items) {
       

       this.setState({data:this.props.items}); 
     }*/

     if (this.props.filterDataSelected !== prevProps.filterDataSelected) {
       this.setState({
         checked:this.props.filterDataSelected,
         checkedSelectAll:this.props.checkedSelectAll
       });
     }
   }

  handleSearch = event => {
    const { value } = event.target;

    //set last used search input;
    Object.keys(this.state.lastSearchValue).map((key)=>{
      this.state.lastSearchValue[key] = key===this.props.accessor ? value: '';
    });

    this.setState(()=>{
      return {
        lastSearchValue:{...this.state.lastSearchValue}
      };
    });

    const filterData = this.state.data.filter((item,index)=>{
      //keep index of filtered ones:
      item.lucky=index;
      const convertedItem = item[this.props.accessor];
      return convertedItem
        .toString()
        .toLowerCase()
        .includes( value.toString().toLowerCase() );  
    });
    //search chosen
    const luckyChosen = filterData
      .map(({lucky})=>lucky);

    //hide not filtered;
    const listFiltered = this.state.searchData
      .map((el,i)=>{
        el.hide = luckyChosen.includes(i)?false:true;
        //update checked with picked ones;
        this.state.checked[i] = luckyChosen.includes(i)?true:false;
        return el;
      });

    this.setState(()=>{
      return {
        checkedSelectAll:true,
        checked:[...this.state.checked],
        searchData:listFiltered
      };
    },()=>{
      const searchLabel = this.state.lastSearchValue;

      //dont report back if there is not selected ones;
      if( !this.state.checked.some((e)=>e) ) return;
      //update records in ReportsTableDataStructure and selectAll button;
      this.props.updateRecord(this.state.checked, this.state.checkedSelectAll,searchLabel);
    });

  }

  handleChange = index => event => {

      
    if(event.currentTarget.id==='selectAll'){

      //dont report back if there is not selected ones;
      if( !this.state.checked.some((e)=>e) ) return;

      const { checkedSelectAll } = this.state;
      //update selectAll accordig to selection or lack of it;
      this.state.searchData.map((el,i)=>{
        if(el.hide){
          this.state.checked[i] = el.hide?false:true;
        } else {
          this.state.checked[i]= true;
        }
      });

      this.setState(()=>{
        return {
          checkedSelectAll:checkedSelectAll===false?true:checkedSelectAll,
          checked:[...this.state.checked]
        };
      },()=>{
        const searchLabel = this.state.lastSearchValue;
        //update records in ReportsTableDataStructure and selectAll button;
        this.props.updateRecord(this.state.checked, this.state.checkedSelectAll,searchLabel);
      });
 
    }else {
      const howManyUnselected = this.state.checked.filter((input)=>input===false);
      //check how many is unselected to make sure at least one is selected
      const morethanOne = howManyUnselected.length===this.state.checked.length-1?false:true;
      this.setState({
        atLeastOneChecked:morethanOne,
        checkedSelectAll:false,
        checked:[...this.state.checked]
      },()=>{
        //make sure that U will update if at least one is selected 
        if(this.state.atLeastOneChecked || this.state.checked[index]!==true){
          this.state.checked[index]= !this.state.checked[index];
        }

        const searchLabel = this.state.lastSearchValue;
        //update records in ReportsTableDataStructure and selectAll button;
        this.props.updateRecord(this.state.checked, this.state.checkedSelectAll,searchLabel);
      });
    }
    /* console.log('Target',event.currentTarget.querySelector('input'));
    console.log('eventCurrentTarget',event.currentTarget);*/
  }

  render(){ 
    const { classes, accessor } = this.props;
    const { searchData } = this.state;

    return (
      <React.Fragment>
        <List dense className={classes.root}>
          <ListItem>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                value={this.state.lastSearchValue[this.props.accessor]}
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
          <Divider/>
        </List>
        
        <List dense style={{maxHeight:'200px',overflow:'auto'}}>
          {
            searchData.map((item,i) => {
              //if(searchData[i].hide) {
              const nodata = Boolean(searchData.find(({hide})=>!hide) && searchData.find(({hide})=>!hide).length===6 
                || !searchData.find(({hide})=>!hide));

              console.log('nodata',nodata);
              console.log(searchData.find(({hide})=>!hide));
              if(nodata && i===searchData.length-1) {
              //if(item.hide) {
                return 'no data  ';
              }
              if(!item.hide){
                return (
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
                  </ListItem>);
              } 
                      
            })
          }
        </List>
        <List>
          {searchData?
            <ListItem  role={undefined} dense>
              <ListItemText primary={searchData.length} />
            </ListItem>:null
          }
        </List>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TableDataFilter);

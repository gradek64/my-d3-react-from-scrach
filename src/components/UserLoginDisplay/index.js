import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { history } from '../../routers/AppRouter';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';
import { fakeAuth } from '../../services/fakeAuth';
//custom imports
import DropDownMenu from '../dropDownMenu';
import events from '../../utils/events';




class UserLoginDisplay extends React.Component {

  state = {
    userLogin:''
  }

  setUserName(name) {
    this.setState({
      userLogin:name
    });
  }

  componentDidMount() {

    /*
        *@register events once ModaComponed loaded
        *@
      */
    events.on('SET_USER_LOGIN', this.setUserName);
    console.log(events.events);
  }

  componentWillUnmount() {

    /*
        *@remove events once ModaComponed unloaded
        *@that way those events are only set once <Modal /> is initiated and only there;
        *@OPEN_MODAL and CLOSE_MODAL can be used mutiple times on diffrent pages since we remove them on Unmount event
      */
    events.off('SET_USER_LOGIN', this.setUserName);
  }

  loggOut = () =>{
    fakeAuth.signout(() => {
      localStorage.removeItem('authenticated');
      //U need to redirect anywhere so routes are being checked
      history.go('/anywhere');
    });
  }
   
  render(){
    const { userLogin }= this.state;
    return (
      <div className='loginDisplay'>
        <DropDownMenu onMouseEnter={false}>
          <div className='class'>
            <IconButton color="inherit">
              <Typography variant="subtitle1" color="inherit" noWrap>
                {userLogin?userLogin:'not logged yet'}
              </Typography>
              <AccountCircle style={{marginLeft:'5px'}}/>
            </IconButton>
          </div>
          <div>
            <Paper elevation={1}>
              <Typography variant="overline" gutterBottom color="inherit" noWrap style={{paddingLeft:'15px'}}>
                {'Applications'}
              </Typography>
              <List component="nav">
                <ListItem button >
                  <ListItemText primary="App" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="App Admin"/>
                </ListItem>
                <Divider light />
                <ListItem button onClick={this.loggOut}>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">Log out!</Typography>
                </ListItem>
              </List>
            </Paper>
          </div>
        </DropDownMenu>
      </div>
    );
  }
}

export default UserLoginDisplay;

import React from 'react';
import { connect } from 'react-redux';
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
// custom imports
import DropDownMenu from '../dropDownMenu';
// action for login out in redux store;
import { logOutUser } from '../../reduxFiles/actions/userAuth_actions';


class UserLoginDisplay extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.reduxDispatch = dispatch;
  }

  loggOut = async () => {
    const loggedOut = await fakeAuth.signout(this.props.byProvider);
    console.log('waited');
    console.log(loggedOut);

    // () => {
    // remove cookie or local storage in store;

    this.reduxDispatch(logOutUser());
    // U need to redirect either for index or any authorized path;
    history.push('/');
  }

  render() {
    const { userNameRedux } = this.props;

    return (
      <div className="loginDisplay" dropdownmenuanchor="yes">
        <DropDownMenu onMouseEnter={false} placement="right">
          <div className="class">
            <IconButton color="inherit">
              <Typography variant="subtitle1" color="inherit" noWrap>
                {userNameRedux || 'not logged'}
              </Typography>
              <AccountCircle style={{ marginLeft: '5px' }} />
            </IconButton>
          </div>
          <div>
            <Paper elevation={1}>
              <Typography variant="overline" gutterBottom color="inherit" noWrap style={{ paddingLeft: '15px' }}>
                {'Applications'}
              </Typography>
              <List component="nav">
                <ListItem button >
                  <ListItemText primary="App" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="App Admin" />
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

const mapStateToProps = state => ({
  userNameRedux: state.user.username,
  byProvider: state.user.byProvider,
});
// export default UserLoginDisplay;
export default connect(mapStateToProps)(UserLoginDisplay);

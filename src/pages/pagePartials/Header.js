import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { history } from '../../routers/AppRouter';
//change Menu color
import blueGrey from '@material-ui/core/colors/blueGrey';

//custom imports
import DropDownListContainer from '../../components/DropDownListContainer';
import DropDownMenu from '../../components/dropDownMenu';
import Paper from '@material-ui/core/Paper';
import UserLoginDisplay from '../../components/UserLoginDisplay';
import MobileNavList from './MobileNavList/MobileNavList';



const styles = theme => ({
  bgColor: {
    backgroundColor:blueGrey[900],
  },
  root: {
    width: '100%',
    background: blueGrey,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMenuOpen:false,
      mobileMoreAnchorEl: null,
    };

    //listen for routes changes; it takes (location, action) if needed
    history.listen(() => {
      this.setState({ mobileMenuOpen: false});
    });
  }
  

  handleProfileMenuOpen(event){
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose(){
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  }

  handleMobileMenuOpen(openState){
    this.setState({ mobileMenuOpen: !openState });
  }

  handleMobileMenuClose(){
    this.setState({ mobileMoreAnchorEl: null });
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, mobileMenuOpen } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bgColor}>

          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" 
                onClick={this.handleMobileMenuOpen.bind(this,mobileMenuOpen)}>
                <MenuIcon />
              </IconButton>
            </div>
            {/* dropdownmenuanchor='no' means position absolute start from the edge or the page*/}
            {/* dropDownMenu component should be used for mobile menu casuse have other r
            dropdown inside that messes up Clickaway handler and anchor element */}
            {/*<div className={classes.sectionMobile} dropdownmenuanchor='no'>
              <DropDownMenu 
                onMouseEnter={false} 
                collapsebleAccordion={false}
                multipleOpen={false}
                animation={false} >
                <div className='verticalAlignment'>
                  <IconButton  color="secondary" >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div>
                  <MobileNavList multipleOpenPass={true}/>
                </div>
              </DropDownMenu>
            </div>*/}
              
            
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Material-UI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <UserLoginDisplay />
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <DropDownListContainer 
                list={[
                  {el:'Greg', icon:'whatshot', handler:()=>{console.log('Iam Greg');}},
                  {el:'Mariola',icon:'mood', iconColor:'secondary',handler:()=>{console.log('Iam Mariola');}},
                  {el:'Libby',icon:'public', handler:()=>{console.log('Iam Libby');}},
                ]}
                direction={'right'}
                placement={'bottom-end'}>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </DropDownListContainer>

            </div> 
            <div className={classes.sectionMobile} rel='set' id='div-02' dropdownmenuanchor='yes'>
             
              <DropDownMenu onMouseEnter={false} placement='left'  >
                <div >
                  <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
                <div className='mobile_display'>
                  <Paper elevation={1}>
                    <UserLoginDisplay />
                    <IconButton color="inherit">
                      <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                      <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <DropDownListContainer 
                      list={[
                        {el:'Greg', icon:'whatshot', handler:()=>{console.log('Iam Greg');}},
                        {el:'Mariola',icon:'mood', iconColor:'secondary',handler:()=>{console.log('Iam Mariola');}},
                        {el:'Libby',icon:'public', handler:()=>{console.log('Iam Libby');}},
                      ]}
                      direction={'left'}
                      placement={'bottom-end'}>
                      <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                   
                    </DropDownListContainer>
                  </Paper>
                </div>
              </DropDownMenu>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {/*setting for acording which is dropdownMenu prop set here*/}
        {this.state.mobileMenuOpen?<MobileNavList multipleOpenPass={false} />:null}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);

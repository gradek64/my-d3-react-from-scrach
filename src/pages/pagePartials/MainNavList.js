import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
    },
    inLine: {
        display:'inline-block',
        marginRight:'15px',
    },
    icon: {
        margin: theme.spacing.unit - 10,
    },
    robotoLight:{
        fontWeight:theme.typography.fontWeightLight,
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
});



const MainNavList = (props) => (
    <header>
        <NavLink to="/"  className={props.classes.inLine} activeClassName="is-active" exact={true}>
            <div className={props.classes.root} >
                <HomeIcon  color="secondary" />
                <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
              News
                </Typography>
            </div>
        </NavLink>
        <NavLink to="/costModels" className={props.classes.inLine} activeClassName="is-active">
            <div className={props.classes.root} >
                <HomeIcon  color="secondary" />
                <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
               News
                </Typography>
            </div>
        </NavLink>
        <NavLink to="/help" className={props.classes.inLine} activeClassName="is-active">
            <div className={props.classes.root} >
                <HomeIcon  color="secondary" />
                <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             News
                </Typography>
            </div>
        </NavLink>
    </header>
);

export default withStyles(styles)(MainNavList);

import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

<Icon>star</Icon>;
const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function RenderPropsMenu() {
  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        const handleClose = () => {
          updateAnchorEl(null);
        };

        return (
          <React.Fragment>
            {/*<Button
              aria-owns={open ? 'render-props-menu' : undefined}
              aria-haspopup="true"
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}
            >
              Open Menu
            </Button>*/}

            <a className="btn dropdown-button waves-effect waves-light" onClick={event => {
              updateAnchorEl(event.currentTarget);
            }}>
              <Icon>expand_more</Icon>
              <Icon>expand_more</Icon>

            </a>

            <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>
                <Icon>expand_more</Icon>
                <Typography variant="inherit">A short message</Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        );
      }}
    </WithState>
  );
}

export default RenderPropsMenu;

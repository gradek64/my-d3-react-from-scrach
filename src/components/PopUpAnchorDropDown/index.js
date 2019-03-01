import React from 'react';
import Popover from '@material-ui/core/Popover';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function RenderPropsMenu(props) {
  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        /* const handleClose = () => {
          updateAnchorEl(null);
        }; */

        return (
          <React.Fragment>
            {React.Children.map(props.children, (child, i) => {
              if (i === 0) {
                return (<div
                  style={{ position: 'relative' }}
                  onClick={(event) => {
                    updateAnchorEl(event.currentTarget);
                  }}
                >
                  {child}
                        </div>);
              }
              if (i == 1) {
                return (<Popover
                  id="render-props-popover"
                  open={open}
                  anchorEl={anchorEl}
                  onClose={() => {
                    updateAnchorEl(null);
                  }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  {child}
                        </Popover>);
              }
            })
            }
            {/* <Button
              aria-owns={open ? 'render-props-menu' : undefined}
              aria-haspopup="true"
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}
            >
              Open Menu
            </Button>
            <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu> */}
          </React.Fragment>
        );
      }}
    </WithState>
  );
}

export default RenderPropsMenu;

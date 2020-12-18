import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import styles from './Header.module.scss';
import { Menu, MenuItem } from '@material-ui/core';
import * as KSS from '../../services/KanbanState.service';

const ks = KSS.default._();

const Header: React.FC = () => {
  const [menu, setMenu] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState();
  return (
  <>
    <Menu
      open={menu}
      onClose={() => setMenu(false)}
      anchorEl={menuAnchorEl}
    >
      <MenuItem onClick={() => {setMenu(false); ks.createNewColumn()}}>Add</MenuItem>
    </Menu>
    <AppBar position='static'>
      <Toolbar>
        <IconButton aria-label='display more actions' edge='end' color='inherit' onClick={(ev: any) => {setMenuAnchorEl(ev.target); setMenu(true);}}>
          <MoreVert />
        </IconButton>
      </Toolbar>
    </AppBar>
  </>
)};

export default Header;

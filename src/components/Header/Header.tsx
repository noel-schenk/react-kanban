import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import styles from './Header.module.scss';

const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton aria-label="display more actions" edge="end" color="inherit">
        <MoreVert />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Header;

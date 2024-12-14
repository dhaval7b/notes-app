
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

export default function NavBar() {
    const { user, logout } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (open) => {
      setDrawerOpen(open);
    };

    const drawerContent = (
      
      <Box
          sx={{ width: 250 }}
          role="presentation"
      >
          <List>
              <ListItem disablePadding>
                  <ListItemButton component={Link} to="/">
                      <ListItemText primary="Notes" />
                  </ListItemButton>
              </ListItem>
              {user && (
                  <ListItem disablePadding>
                      <ListItemButton onClick={logout}>
                          <ListItemText primary="Logout" />
                      </ListItemButton>
                  </ListItem>
              )}
              {!user && (
                  <ListItem disablePadding>
                      <ListItemButton component={Link} to="/login">
                          <ListItemText primary="Login" />
                      </ListItemButton>
                  </ListItem>
              )}
          </List>
      </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: {xs:"block", sm:"none"} }}
            onClick={() => {toggleDrawer(true)}}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
          >
            {drawerContent} 
          </Drawer>
          <Link to="/"  style={{ textDecoration: 'none' }}>
                <Typography 
                variant='h6' 
                component="div" 
                color='secondary' 
                sx={{
                    flexGrow: 1,
                    color: 'white',
                    textDecoration: 'none',
                    display: { xs: 'none', sm: 'block' },
                }}>
                    Notes
                </Typography>
          </Link>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            { user && (
              <Button color="secondary" variant='contained' sx={{ marginLeft: 2 }}  onClick={logout}>Logout</Button>
            ) }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
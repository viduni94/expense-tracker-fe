import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreditScore, ListAlt, LocalOffer, Menu, Receipt, Assessment } from '@mui/icons-material';
import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  AppBar,
  IconButton,
  Typography,
} from '@mui/material';
import constants from 'utils/constants';

const drawer = (
  <>
    <Toolbar />
    <Divider />
    <List>
      <ListItem button component={Link} to={constants.pages.spending.path}>
        <ListItemIcon>
          <LocalOffer />
        </ListItemIcon>
        <ListItemText primary="Spending" />
      </ListItem>
      <ListItem button component={Link} to={constants.pages.transactions.path}>
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItem>
      <ListItem button component={Link} to={constants.pages.categories.path}>
        <ListItemIcon>
          <ListAlt />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
      <ListItem button component={Link} to={constants.pages.budget.path}>
        <ListItemIcon>
          <CreditScore />
        </ListItemIcon>
        <ListItemText primary="Budget" />
      </ListItem>
      <ListItem button component={Link} to={constants.pages.reports.path}>
        <ListItemIcon>
          <Assessment />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </List>
  </>
);

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  let pageTitle;
  switch (location.pathname) {
    case constants.pages.spending.path: {
      pageTitle = constants.pages.spending.title;
      break;
    }
    case constants.pages.transactions.path: {
      pageTitle = constants.pages.transactions.title;
      break;
    }
    case constants.pages.categories.path: {
      pageTitle = constants.pages.categories.title;
      break;
    }
    case constants.pages.budget.path: {
      pageTitle = constants.pages.budget.title;
      break;
    }
    case constants.pages.reports.path: {
      pageTitle = constants.pages.reports.title;
      break;
    }
    default: {
      pageTitle = 'Expense Tracker';
      break;
    }
  }

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: constants.navigation.drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: constants.navigation.drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </Box>
      <AppBar
        sx={{
          zIndex: 1400,
        }}>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              display: { xs: 'flex', sm: 'none' },
            }}>
            <Menu sx={{ color: 'white' }} />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              width: { sm: '100%' },
              textAlign: { sm: 'center' },
              marginLeft: { xs: '0.5rem' },
            }}>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;

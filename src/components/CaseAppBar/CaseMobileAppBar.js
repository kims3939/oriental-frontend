import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Avatar } from '@material-ui/core';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListItemAvatar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import logo from './logo.svg';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

const useStyles = makeStyles({
    appBar:{
        zIndex:1400
    },
    left:{
        display:'flex',
        width:'50%',
        justifyContent:'flex-start'
    },
    right:{
        display:'flex',
        width:'50%',
        justifyContent:'flex-end'
    },
    logo:{
        height:50,
        width:50
    },
    drawer:{
        width:250,
        paddingTop:70
    },
    avatar:{
        width:30,
        height:30
    }
});

const CaseMobileAppBar = props => {
    const { history } = props;
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMenuClick = menu => {
        toggleDrawer();
        switch(menu){
            case "home":
                history.push('/');
                break;
            case "search":
                history.push('/search');
                break;
            case "upload":
                history.push('/upload');
                break;
            case "notify":
                history.push('/notify');
                break;
            case "profile":
                history.push('/profile');
                break;
            default:
                history.push('/');
                break;
        };
    };

    const handleLogoClick = () => {
        history.push('/');
    }

    return(
        <>
            <AppBar position='static' color='transparent' elevation={0} className={classes.appBar}>
                <Toolbar>
                    <div className={classes.left}>
                        <img className={classes.logo} src={logo} alt='logo' onClick={handleLogoClick}/>
                    </div>
                    <div className={classes.right}>
                        <IconButton onClick={toggleDrawer}>
                            <MenuOutlinedIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer}>
                    <List className={classes.drawer}>
                        <ListItem button onClick={() => handleMenuClick('home')}>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItem>
                        <ListItem button onClick={() => handleMenuClick('search')}>
                            <ListItemIcon>
                                <SearchOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Search' />
                        </ListItem>
                        <ListItem button onClick={() => handleMenuClick('upload')}>
                            <ListItemIcon>
                                <AddCircleOutlineRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Upload' />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => handleMenuClick('profile')}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>K</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='minwoo' />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary='Preference' />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='Help' />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='Contact Support' />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary='Logout' />
                        </ListItem>
                    </List>
            </Drawer>
        </>
    );
}

export default withRouter(CaseMobileAppBar);
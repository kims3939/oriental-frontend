import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Avatar, Typography } from '@material-ui/core';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListItemAvatar } from '@material-ui/core';

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
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return(
        <>
            <AppBar position='sticky' color='default' elevation={0} className={classes.appBar}>
                <Toolbar>
                    <div className={classes.left}>
                        <img className={classes.logo} src={logo} alt='logo'/>
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
                        <ListItem button>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <SearchOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Search' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <AddCircleOutlineRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Upload' />
                        </ListItem>
                        <Divider />
                        <ListItem button>
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

export default CaseMobileAppBar;
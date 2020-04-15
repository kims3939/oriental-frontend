import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@material-ui/core';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import logo from './logo.svg';

const useStyles = makeStyles({
    left:{
        display:'flex',
        width:'33%',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    center:{
        display:'flex',
        width:'33%',
        justifyContent:'center',
        alignItems:'center'
    },
    right:{
        display:'flex',
        width:'33%',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    menuButton:{
        marginRight:10
    },
    logo:{
        height:55,
        width:55
    }
});

const CaseDesktopAppBar = props => {
    const classes = useStyles();
    return(
        <AppBar position='static' color='transparent' elevation={0}>
            <Toolbar>
                <div className={classes.left}>
                    <IconButton color='inherit'>
                        <HomeOutlinedIcon/>
                    </IconButton>
                    <Typography variant='subtitle1' color='inherit'>
                        Home
                    </Typography>
                    <IconButton color='inherit'>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <Typography variant='subtitle1' color='inherit'>
                        Search
                    </Typography>
                </div>
                <div className={classes.center}>
                    <img className={classes.logo} src={logo} alt='logo'/>
                </div>
                <div className={classes.right}>
                    <IconButton color='inherit' style={{marginRight:15}}>
                        <AddCircleOutlineRoundedIcon />
                    </IconButton>
                    <IconButton color='inherit' style={{marginRight:20}}>
                        <NotificationsNoneRoundedIcon />
                    </IconButton>
                    <Avatar>
                        K
                    </Avatar>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default CaseDesktopAppBar;
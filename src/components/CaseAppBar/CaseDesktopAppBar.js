import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

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
    },
    menuItem:{
        cursor:'pointer'
    }
});

const CaseDesktopAppBar = props => {
    const classes = useStyles();
    const { history } = props;

    const handleMenuClick = menu => {
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
    };

    return(
        <AppBar position='static' color='transparent' elevation={0}>
            <Toolbar>
                <div className={classes.left}>
                    <IconButton color='inherit' onClick={() => handleMenuClick('home')}>
                        <HomeOutlinedIcon/>
                    </IconButton>
                    <Typography className={classes.menuItem} variant='subtitle1' color='inherit' onClick={() => handleMenuClick('home')}>
                        Home
                    </Typography>
                    <IconButton color='inherit' onClick={() => handleMenuClick('search')}>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <Typography className={classes.menuItem} variant='subtitle1' color='inherit' onClick={() => handleMenuClick('search')}>
                        Search
                    </Typography>
                </div>
                <div className={classes.center}>
                    <img className={classes.logo} src={logo} alt='logo' onClick={handleLogoClick}/>
                </div>
                <div className={classes.right}>
                    <IconButton color='inherit' style={{marginRight:15}} onClick={() => handleMenuClick('upload')}>
                        <AddCircleOutlineRoundedIcon />
                    </IconButton>
                    <IconButton color='inherit' style={{marginRight:20}} onClick={() => handleMenuClick('notify')}>
                        <NotificationsNoneRoundedIcon />
                    </IconButton>
                    <Avatar className={classes.menuItem} onClick={() => handleMenuClick('profile')}>
                        K
                    </Avatar>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(CaseDesktopAppBar);
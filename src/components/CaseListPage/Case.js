import React from 'react';
import ReactHashtag from "react-hashtag";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Menu, MenuItem, Dialog } from '@material-ui/core';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { IconButton, Typography, TextField, Collapse, Button } from '@material-ui/core';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

import ImageStepper from './ImageStepper';
import CommentList from './CommentList';
import CaseUploadCtrl from '../CaseUploadPage/CaseUploadCtrl';
import logo from '../../components/CaseAppBar/logo.svg';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%'
    },
    media: {
      width:'100%',
      height:'auto'
    },
    commentArea:{
        padding:20
    },
    hashtag:{
        color:'blue',
        cursor:'pointer'
    },
    logo:{
        height:55,
        width:55
    },
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
    dialog:{
        display:'flex'
    }
}));

const Case = props => {
    const classes = useStyles();
    const { 
        expanded,
        setExpanded,
        reportAnchor,
        setReportAnchor,
        shareAnchor,
        setShareAnchor,
        comment,
        setComment,
        like,
        setLike,
        dialog,
        setDialog,
        caseData,
        user,
        getCaseDataList,
        handleExpandClick,
        handleReportMenuOpen,
        handleReportMenuClose,
        handleShareMenuOpen,
        handleShareMenuClose,
        handleComment,
        handleCommentSubmit,
        handleCommentCancel,
        handleCaseUpdate,	
        handleCaseDelete,
        toggleLike
     } = props;

    const getReportMenu = () => {
        if(caseData.writer.username !== user.username)
            return(
                <MenuItem onClick={handleReportMenuClose} dense={true}>
                    Report Case
                </MenuItem>
            )
        else
            return null;
    };
    
    const getEditMenu = () => {
        if(caseData.writer.username === user.username)
            return(
                <MenuItem onClick={() => handleCaseUpdate(caseData)} dense={true}>
                    Edit
                </MenuItem>
            )
        else
            return null;
    };

    const getDeleteMenu = () => {
        if(caseData.writer.username === user.username)
            return(
                <MenuItem onClick={() => handleCaseDelete(caseData)} dense={true}>
                    Delete
                </MenuItem>
            )
        else
            return null;
    };

    const getCaseImage = () => {
        if(caseData.images !== null && caseData.images.length > 0)
            return (    
                <CardMedia>
                    <ImageStepper images={caseData.images}/>
                </CardMedia>
            )
        else
            return null;
    };

    const getLikeIcon = () => {
        if(caseData.likers.some(liker => liker.username === user.username))
            return <FavoriteOutlinedIcon color="secondary"/>
        else
            return <FavoriteBorderOutlinedIcon />
    }

    return(
        <Grid item className={classes.root}>
            <Card>
                <CardHeader 
                    title={caseData.title}
                    subheader={caseData.categories[0]}
                    action={
                        <IconButton aria-label='report' onClick={handleReportMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                { getCaseImage() }
                <CardContent>
                    <Typography variant='body1'>
                        <ReactHashtag
                            renderHashtag={ (content, index) => (
                                <span className={classes.hashtag}>{content}</span>        
                            )}
                        >
                            {caseData.caseText}
                        </ReactHashtag>
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label='favorite' onClick={toggleLike}>
                        { getLikeIcon()}
                    </IconButton>
                    <IconButton aria-label='share' onClick={handleShareMenuOpen}>
                        <ShareIcon />
                    </IconButton>
                    <IconButton onClick={handleExpandClick}>
                        {
                            expanded ? <ModeCommentIcon /> : <ModeCommentOutlinedIcon />  
                        }
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.commentArea}>
                    <Grid container direction='column'>
                        <Grid item>
                            <TextField className={classes.inputComment} variant='outlined' multiline={true} rows={3} fullWidth placeholder='댓글입력' onChange={handleComment} value={comment}/>
                        </Grid>
                        <Grid item>        
                            <Button onClick={handleCommentCancel}>Cancel</Button>
                            <Button onClick={handleCommentSubmit}>Submit</Button>
                        </Grid>
                        <Grid item>
                            <CommentList commentListData={caseData.comments}/>
                        </Grid>    
                    </Grid>
                </Collapse>
            </Card>
            <Menu
                anchorEl={reportAnchor}
                keepMounted
                open={Boolean(reportAnchor)}
                onClose={handleReportMenuClose}
                getContentAnchorEl={null}
                anchorOrigin={{vertical:'bottom', horizontal:'left'}}
            >
                { getReportMenu() }
                { getEditMenu() }
                { getDeleteMenu() }
            </Menu>
            <Menu
                anchorEl={shareAnchor}
                keepMounted
                open={Boolean(shareAnchor)}
                onClose={handleShareMenuClose}
                getContentAnchorEl={null}
                anchorOrigin={{vertical:'top', horizontal:'center'}}
                transformOrigin={{vertical:'bottom', horizontal:'center'}}
            >
                <MenuItem onClick={() => handleShareMenuClose('facebook')} dense={true}>
                    Facebook
                </MenuItem>
                <MenuItem onClick={() => handleShareMenuClose('twitter')} dense={true}>
                    Twitter
                </MenuItem>
                <MenuItem onClick={() => handleShareMenuClose('email')} dense={true}>
                    Email
                </MenuItem>
                <MenuItem onClick={() => handleShareMenuClose('copylink')} dense={true}>
                    Copy link
                </MenuItem>
            </Menu>
            <Dialog open={dialog} onClose={() => {setDialog(false)}}>
                <div className={classes.dialog}>
                    <div className={classes.left}></div>
                    <div className={classes.center}>
                        <img className={classes.logo} src={logo} alt="logo"/>
                    </div>
                    <div className={classes.right}>
                        <IconButton onClick={() => {setDialog(false)}}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
                <CaseUploadCtrl caseData={caseData} action="update"/>
            </Dialog>
        </Grid>
    )
}

export default Case;
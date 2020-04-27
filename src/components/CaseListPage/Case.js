import React, { useState } from 'react';
import ReactHashtag from "react-hashtag";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Menu, MenuItem } from '@material-ui/core';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { IconButton, Typography, TextField, Collapse, Button } from '@material-ui/core';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

import ImageStepper from './ImageStepper';
import CommentList from './CommentList';

import axios from 'axios';

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
    }
}));

const Case = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [reportAnchor, setReportAnchor] = useState(null);
    const [shareAnchor, setShareAnchor] = useState(null);
    const [comment, setComment] = useState('');

    const { caseData, user } = props;
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleReportMenuOpen = event => {
        setReportAnchor(event.currentTarget);
    };

    const handleReportMenuClose = () => {
        setReportAnchor(null);
    };

    const handleShareMenuOpen = event => {
        setShareAnchor(event.currentTarget);
    };

    const handleShareMenuClose = () => {
        setShareAnchor(null);
    };

    const handleComment = event => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        const postData = {
            case_id:caseData._id,
            writer:user,
            comment
        };

        axios.post('http://localhost:4000/api/cases/comment',postData)
        .then( res => {
            setComment('');
        })
        .catch( error => {
            console.log(error);
        });
    };

    const handleCommentCancel = () => {
        setComment('');
    };

    const handleCaseUpdate = () => {
        console.log('handle case update');
    }
    
    const getCaseUpdateMenu = () => {
        if(caseData.writer.username === user.username)
            return(
                <MenuItem onClick={handleCaseUpdate} dense={true}>
                    Case Edit
                </MenuItem>
            )
        else
            return null;
    }

    const getCaseImage = () => {
        if(caseData.images !== null && caseData.images.length > 0)
            return (    
                <CardMedia>
                    <ImageStepper images={caseData.images}/>
                </CardMedia>
            )
        else
            return null;
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
                {
                    getCaseImage()    
                }
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
                    <IconButton aria-label='favorite'>
                        <FavoriteBorderOutlinedIcon />
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
                <MenuItem onClick={handleReportMenuClose} dense={true}>
                    Report Case
                </MenuItem>
                {
                    getCaseUpdateMenu()
                }
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
        </Grid>
    )
}

export default Case;
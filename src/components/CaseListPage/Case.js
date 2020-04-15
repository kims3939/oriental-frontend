import React, { useState } from 'react';
import ReactHashtag from "react-hashtag";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Menu, MenuItem } from '@material-ui/core';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { IconButton, Typography, TextField, Collapse, Button } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

import ImageStepper from './ImageStepper';
import CommentList from './CommentList';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    commentArea:{
        padding:20
    },
    hashtag:{
        color:'blue'
    }
}));

const Case = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [reportAnchor, setReportAnchor] = useState(null);
    const [shareAnchor, setShareAnchor] = useState(null);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleReportMenuOpen = event => {
        setReportAnchor(event.currentTarget);
    }

    const handleReportMenuClose = () => {
        setReportAnchor(null);
    }

    const handleShareMenuOpen = event => {
        setShareAnchor(event.currentTarget);
    }

    const handleShareMenuClose = () => {
        setShareAnchor(null);
    }

    const { caseData } = props;
    return(
        <Grid item>
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
                <CardMedia>
                    <ImageStepper />
                </CardMedia>
                <CardContent>
                    <Typography variant='body1'>
                        <ReactHashtag
                            renderHashtag={ content => (
                                <span className={classes.hashtag}>{content}</span>        
                            )}
                        >
                            {caseData.content}
                        </ReactHashtag>
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label='favorite'>
                        <FavoriteIcon />
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
                            <TextField className={classes.inputComment} variant='outlined' multiline={true} rows={3} fullWidth placeholder='댓글입력'/>
                        </Grid>
                        <Grid item>        
                            <Button>Cancel</Button>
                            <Button>Submit</Button>
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
                <MenuItem onClick={handleShareMenuClose} dense={true}>
                    Facebook
                </MenuItem>
                <MenuItem onClick={handleShareMenuClose} dense={true}>
                    Twitter
                </MenuItem>
                <MenuItem onClick={handleShareMenuClose} dense={true}>
                    Email
                </MenuItem>
                <MenuItem onClick={handleShareMenuClose} dense={true}>
                    Copy link
                </MenuItem>
            </Menu>
        </Grid>
    )
}

export default Case;
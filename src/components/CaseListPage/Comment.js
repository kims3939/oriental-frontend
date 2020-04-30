import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardContent, Menu, MenuItem, Dialog  } from '@material-ui/core';
import { IconButton, Avatar, Divider, TextField, Button } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import axios from 'axios';
import apiUrl from '../../utils/apiurl';

const useStyles = makeStyles({
    content:{
        paddingTop:0,
        paddingLeft:25
    },
    commentArea:{
        width:500,
        padding:10
    },
    btnGroup:{
        paddingTop:5
    },
    submitBtn:{
        marginLeft:5
    }
});

const Comment = props => {
    const classes = useStyles();
    const [comment, setComment] = useState('');
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [dialog, setDialog] = useState(false);
    const { user, commentData, case_id, getCaseDataList } = props;

    const handleCommentMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleCommentMenuOpen = event => {
        setMenuAnchor(event.currentTarget);
    };

    const handleCommentDelete = async () => {
        setMenuAnchor(null);
        await axios.delete(apiUrl.commentUrl({case_id:case_id, comment_id:commentData._id}))
        .then( res => {
            getCaseDataList();
        })
        .catch( err => {
            console.log(err);
        });
    };

    const handleCommentEdit = () => {
        setMenuAnchor(null);
        setDialog(true);
    };

    const handleComment = event => {
        setComment(event.target.value);
    };

    const handleCommentCancel = () => {
        setDialog(false);
    };

    const handleCommentSubmit = async () => {
        setDialog(false);
        const patchData = {
            case_id,
            comment_id:commentData._id,
            comment
        };

        await axios.patch(apiUrl.commentUrl(), patchData)
        .then( res => {
            getCaseDataList();
        })
        .catch( err => {
            console.log(err);
        });
    };

    const getMenuIcon = () => {
        if(commentData.writer.username === user.username){
            return(
                <IconButton aria-label='comment' onClick={handleCommentMenuOpen}>
                    <MoreVertIcon />
                </IconButton>
            );
        }
    };

    return (
        <Card>
            <CardHeader 
                avatar={<Avatar>K</Avatar>}
                title={commentData.writer.username}
                subheader={commentData.writer.speciality}
                action={ getMenuIcon() }
            />
            <CardContent className={classes.content}>{commentData.comment}</CardContent>
            <Divider />
            <Menu
                anchorEl={menuAnchor}
                keepMounted
                open={Boolean(menuAnchor)}
                onClose={handleCommentMenuClose}
                getContentAnchorEl={null}
                anchorOrigin={{vertical:'bottom', horizontal:'left'}}
            >
                <MenuItem onClick={handleCommentEdit} >Edit</MenuItem>
                <MenuItem onClick={handleCommentDelete}>Delete</MenuItem>
            </Menu>
            <Dialog className={classes.dialog} open={dialog} onClose={() => {setDialog(false)}}>
                <Grid container direction='column' className={classes.commentArea}>
                    <Grid item>
                        <TextField className={classes.inputComment} variant='outlined' multiline={true} rows={3} fullWidth placeholder='댓글입력' onChange={handleComment} value={comment}/>
                    </Grid>
                    <Grid item className={classes.btnGroup}>        
                        <Button variant="outlined" color="primary" onClick={handleCommentCancel}>Cancel</Button>
                        <Button className={classes.submitBtn} variant="outlined" color="primary" onClick={handleCommentSubmit}>Submit</Button>
                    </Grid>    
                </Grid>
            </Dialog>
        </Card>
    );
}

export default Comment;
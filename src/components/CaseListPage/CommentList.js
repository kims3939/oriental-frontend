import React from 'react';
import Comment from './Comment';
import { Grid } from '@material-ui/core';

const CommentList = props => {
    const { commentListData, user } = props;
    const commentList = commentListData.map( (commentData, index) => {
        return(
            <Comment key={index} commentData={commentData} user={user}/>
        )
    });

    return(
        <Grid container direction='column'>
            { commentList }
        </Grid>        
    );
}

export default CommentList;
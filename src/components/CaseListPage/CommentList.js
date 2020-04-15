import React from 'react';
import Comment from './Comment';
import { Grid } from '@material-ui/core';

const CommentList = props => {
    const { commentListData } = props;
    const commentList = commentListData.map( (commentData, index) => {
        return(
            <Comment key={index} commentData={commentData} />
        )
    })
    return(
        <Grid container direction='column'>
            { commentList }
        </Grid>        
    );
}

export default CommentList;
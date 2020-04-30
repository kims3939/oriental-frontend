import React from 'react';
import Comment from './Comment';
import { Grid } from '@material-ui/core';

const CommentList = props => {
    const { case_id, commentListData, user, getCaseDataList } = props;
    const commentList = commentListData.map( (commentData, index) => {
        return(
            <Comment key={index} case_id={case_id} commentData={commentData} user={user} getCaseDataList={getCaseDataList}/>
        )
    });

    return(
        <Grid container direction='column'>
            { commentList }
        </Grid>        
    );
}

export default CommentList;
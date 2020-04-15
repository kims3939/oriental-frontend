import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({

});

const Comment = props => {
    const classes = useStyles();
    const { commentData } = props;
    return (
        <div>
            <Avatar />
            { commentData.writer.username }
            { commentData.writer.speciality }
            { commentData.comment }
        </div>
    );
}

export default Comment;
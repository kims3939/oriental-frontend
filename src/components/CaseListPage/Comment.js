import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Avatar, Divider } from '@material-ui/core';

const useStyles = makeStyles({
    content:{
        paddingTop:0,
        paddingLeft:25
    }
});

const Comment = props => {
    const classes = useStyles();
    const { commentData } = props;
    return (
        <Card>
            <CardHeader 
                avatar={<Avatar>K</Avatar>}
                title={commentData.writer.username}
                subheader={commentData.writer.speciality}
            />
            <CardContent className={classes.content}>{commentData.comment}</CardContent>
            <Divider />
        </Card>
    );
}

export default Comment;
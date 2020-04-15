import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions, Avatar, Button, Divider } from '@material-ui/core';

const useStyles = makeStyles({

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
            <CardContent>{commentData.comment}</CardContent>
            <CardActions disableSpacing>
                <Button>Like</Button>
                <Button>Reply</Button>
            </CardActions>
            <Divider />
        </Card>
    );
}

export default Comment;
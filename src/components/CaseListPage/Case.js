import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { IconButton, Typography, TextField, Collapse } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ImageStepper from './ImageStepper';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    }
}));

const Case = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { caseData } = props;
    return(
        <Grid item>
            <Card>
                <CardHeader 
                    title={caseData.title}
                    action={
                        <IconButton aria-label='report'>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardMedia>
                    <ImageStepper />
                </CardMedia>
                <CardContent>
                    <Typography variant='body2'>{caseData.content}</Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label='favorite'>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label='share'>
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="comment open"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <TextField variant='outlined' />
                    
                </Collapse>
            </Card>
        </Grid>
    )
}

export default Case;
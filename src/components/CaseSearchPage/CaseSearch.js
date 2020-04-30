import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, Card, CardActionArea, CardContent, CardMedia, CardAction, Avatar } from '@material-ui/core';
import { Input, InputAdornment, IconButton, Typography, CardHeader } from '@material-ui/core';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import axios from 'axios';
import apiUrl from '../../utils/apiurl';

const useStyles = makeStyles({
    root:{
        padding:10
    }
});

const CaseSearch = () => {
    const classes = useStyles();
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const handleSearchInput = event => {
        setKeyword(event.target.value);
    };

    const handleEnterKey = event => {
        if(event.key == 'Enter'){
            getSearchResult();
            setKeyword('');
        }
    };

    const getSearchResult = async () => {
        let keyword_ = keyword.split(' ');
        
        await axios.get(apiUrl.searchUrl({keyword:keyword_}))
        .then( res => {
            setSearchResult(res.data.payload);
        })
        .catch( err => {
            console.log(err);
        });
    };

    const resultList = searchResult.map( result => (
        <Grid item key={result._id}>
            <Card>
                <CardActionArea>
                    {
                        (result.images && result.images.length > 0)
                        ? (
                            <CardMedia 
                                component='img'
                                alt='media'
                                height='140'
                                image={apiUrl.hostUrl+'/'+result.images[0]}
                            />
                        )
                        : null
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {result.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {result.caseText}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardHeader 
                    avatar={
                        <Avatar>K</Avatar>
                    }
                    title={result.writer.username}
                    subheader={result.writer.speciality}
                />
            </Card>
        </Grid>
    ));

    return(
        <Grid container direction="column" className={classes.root}>
            <Grid item>
                <FormControl fullWidth >
                    <Input
                        value={keyword}
                        onChange={handleSearchInput}
                        onKeyDown={handleEnterKey}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton>
                                    <SearchOutlinedIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <Grid container>
                    {resultList}
                </Grid>
            </Grid>
        </Grid>
    )
};

export default CaseSearch;
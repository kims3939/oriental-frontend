import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, Card, CardActionArea, CardContent, CardMedia, Avatar, Dialog } from '@material-ui/core';
import { Input, InputAdornment, IconButton, Typography, CardHeader } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../CaseAppBar/logo.svg';

import axios from 'axios';
import apiUrl from '../../utils/apiurl';

import CaseCtrl from '../CaseListPage/CaseCtrl';

const useStyles = makeStyles({
    root:{
        padding:10
    },
    logo:{
        height:55,
        width:55
    },
    left:{
        display:'flex',
        width:'33%',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    center:{
        display:'flex',
        width:'33%',
        justifyContent:'center',
        alignItems:'center'
    },
    right:{
        display:'flex',
        width:'33%',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    dialog:{
        display:'flex'
    }
});

const CaseSearch = props => {
    const classes = useStyles();
    const { user, location } = props;
    const [keyword, setKeyword] = useState(location.keyword || '');
    const [searchResult, setSearchResult] = useState([]);
    const [dialog, setDialog] = useState(false);
    const [caseData, setCaseData] = useState(null);

    
    const handleSearchInput = event => {
        setKeyword(event.target.value);
    };

    const handleEnterKey = event => {
        if(event.key === 'Enter'){
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

    const handleCaseClick = case_id => {
        const clickedCase = searchResult.filter( result => result._id === case_id);
        if(clickedCase.length > 0){
            setCaseData(clickedCase[0]);
            setDialog(true);
        }
    };

    const resultList = searchResult.map( result => (
        <Grid item key={result._id} onClick={()=> handleCaseClick(result._id)}>
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
        <>
            <Grid container direction="column" className={classes.root} spacing={5}>
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
                    <Grid container spacing={5}>
                        {resultList}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={dialog} onClose={() => {setDialog(false)}}>
                <div className={classes.dialog}>
                    <div className={classes.left}></div>
                    <div className={classes.center}>
                        <img className={classes.logo} src={logo} alt="logo"/>
                    </div>
                    <div className={classes.right}>
                        <IconButton onClick={() => {setDialog(false)}}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
                <CaseCtrl caseData={caseData} setDialog={setDialog} user={user}/>
            </Dialog>
        </>
    )
};

export default withRouter(CaseSearch);
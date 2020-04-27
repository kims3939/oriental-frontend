import React, { useState, useRef } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, FormGroup } from '@material-ui/core';
import { TextField, Chip, Button, Input, InputAdornment, IconButton, Backdrop } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root:{
        padding:20
    },
    autocomplete:{
        marginTop:10,
        width:'100%'
    },
    category:{
        display:'flex',
        listStyle:'none',
        flexWrap: 'wrap',
        marginTop:10
    },
    chip:{
        marginRight:5,
        marginBottom:5
    },
    uploader:{
        marginTop:10,
        minHeight:100,
        borderWidth:'thick',
        borderColor:'#b0b0b0',
        borderStyle:'dotted'
    },
    btn:{
        marginTop:10
    },
    uploaded:{
        margin:10
    },
    backdrop:{
        zIndex:2400
    }
});

const CaseUpload = props => {
    const classes = useStyles();
    const { user } = props;
    const [title, setTitle] = useState("");
    const [caseText, setCaseText] = useState("");
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [backdrop, setBackdrop] = useState(false);
    const uploaderEl = useRef(null);

    const handleTitle = event => {
        setTitle(event.target.value);
    };

    const handleCaseText = event => {
        setCaseText(event.target.value);
    };

    const handleCategory = event => {
        const value = event.target.textContent;
        if(!value || value === "") return;
        let categoriesSet = new Set(categories);
        categoriesSet.add(value);
        setCategories(Array.from(categoriesSet));
    };

    const handleDelete = (category) => () => {
        setCategories(
            categories.filter( element => category !== element)
        );
    };

    const handleFile = event => {
        const fileArr = Array.from(event.target.files);
        setImages(images.concat(fileArr));
    ;}

    const handleDeleteFile = (imageName) => () => {
        setImages(images.filter(image => image.name !== imageName));
    };

    const uploadImage = () => {
        let formData = new FormData();
        images.map( image => formData.append('images',image));
        axios.post('http://localhost:4000/api/cases/images',formData)
        .then( res => {
            uploadCase(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    };
    
    const uploadCase = imageList => {
        const formData = {
            title,
            writer:user,
            categories,
            images:imageList,
            caseText
        };
        setBackdrop(true);
        axios.post('http://localhost:4000/api/cases',formData)
        .then( res => {
            setBackdrop(false);
            setTitle("");
            setCaseText("");
            setCategories([]);
            setImages([]);
        })
        .catch( err => {
            console.log(err);
        })
    };

    //category test code
    let optionList = [];
    for(let i=0; i<20; i++){
        optionList.push(`category ${i}`);
    };
    
    return(
        <Grid container>
            <Grid item xl={4} md={3} sm={3}></Grid>
            <Grid item xl={4} md={6} sm={6}>
                <Paper className={classes.root} variant='outlined'>
                    <FormGroup row>
                        <TextField 
                            name='title'
                            variant='outlined'
                            margin='normal' 
                            label='Title' 
                            placeholder='placeholder' 
                            InputLabelProps={{shrink:true}} 
                            fullWidth
                            value={title}
                            onChange={handleTitle}/>
                        <TextField 
                            name='caseText'
                            variant='filled'
                            margin='normal'
                            fullWidth
                            multiline={true}
                            rows={20}
                            value={caseText}
                            onChange={handleCaseText}
                        />
                        <Autocomplete 
                            className={classes.autocomplete}
                            options={optionList}
                            getOptionLabel={option => option}
                            onChange={handleCategory}
                            renderInput={
                                param => <TextField {...param} label='Category' variant='outlined'/>
                            }
                        />
                        <Paper elevation={0} className={classes.category}>
                            {
                                categories.map((category, index) => (
                                    <li key={index}>
                                        <Chip className={classes.chip} label={category} onDelete={handleDelete(category)} />
                                    </li>
                                ))
                            }
                        </Paper>
                        <Button className={classes.btn} variant="outlined" color="primary" fullWidth onClick={() => {uploaderEl.current.click()}}>Image Upload</Button>
                        <input ref={uploaderEl} type="file" style={{display:'none'}} multiple onChange={ event => handleFile(event)}/>
                        <Grid container className={classes.uploader} spacing={1} justify='center'>
                            {
                                images.map((image, index) => {
                                   return (<Input 
                                    className={classes.uploaded}
                                    key={index}
                                    disabled
                                    fullWidth
                                    variant='outlined'
                                    value={image.name}
                                    endAdornment={
                                        <InputAdornment>
                                            <IconButton
                                                onClick={handleDeleteFile(image.name)}
                                            >
                                                <CancelOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                   />)  
                                })
                            }                                                       
                        </Grid>
                        <Button className={classes.btn} variant="outlined" color="primary" fullWidth onClick={uploadImage}>Case Upload</Button>
                    </FormGroup>
                </Paper>
            </Grid>
            <Grid item xl={4} md={3} sm={3}></Grid>
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="primary" />
            </Backdrop>
        </Grid>
    )
};

export default CaseUpload;
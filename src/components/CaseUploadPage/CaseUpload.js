import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, FormGroup } from '@material-ui/core';
import { TextField, Chip, Button, IconButton } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
        borderWidth:'thick',
        borderColor:'#b0b0b0',
        borderStyle:'dotted'
    },
    btn:{
        marginTop:10
    },
    preview:{
        margin:10,
        width:"100%"
    }
});

const CaseUpload = props => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const uploaderEl = useRef(null);

    const handleCategory = event => {
        const value = event.target.textContent;
        if(!value || value === "") return;
        let categoriesSet = new Set(categories);
        categoriesSet.add(value);
        setCategories(Array.from(categoriesSet));
    }

    const handleDelete = (category) => () => {
        setCategories(
            categories.filter( element => category !== element)
        );
    }

    const handleFile = event => {
        const fileArr = Array.from(event.target.files);
        setImages(images.concat(fileArr));
        let tmpList = [];
        fileArr.forEach( file => {
            tmpList.push(URL.createObjectURL(file));
        });
        setPreviews(previews.concat(tmpList));
    }
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
                            fullWidth/>
                        <TextField 
                            name='caseText'
                            variant='filled'
                            margin='normal'
                            fullWidth
                            multiline={true}
                            rows={20}
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
                        <Grid container elevation={0} className={classes.uploader} spacing={1} justify='center'>
                            {
                                previews.map((preview, index) => (
                                    <Grid key={index} item xs={3}>
                                        <img src={preview} className={classes.preview} />
                                    </Grid> 
                                ))
                            }                                                       
                        </Grid>
                        <Button className={classes.btn} variant="outlined" color="primary" fullWidth>Case Upload</Button>
                    </FormGroup>
                </Paper>
            </Grid>
            <Grid item xl={4} md={3} sm={3}></Grid>
        </Grid>
    )
};

export default CaseUpload;
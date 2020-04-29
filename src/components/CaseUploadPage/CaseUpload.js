import React from 'react';
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
    const {
        title,
        caseText,
        categories,
        images,
        backdrop,
        uploaderEl,
        handleTitle,
        handleCaseText,
        handleCategory,
        handleDelete,
        handleFile,
        handleDeleteFile,
        uploadImage
    } = props;
    
    //category test code
    let optionList = [];
    for(let i=0; i<20; i++){
        optionList.push(`category ${i}`);
    };
    
    return(
        <Grid container>
            <Grid>
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
                                    value={image.name || image}
                                    endAdornment={
                                        <InputAdornment>
                                            <IconButton
                                                onClick={handleDeleteFile(image.name || image)}
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
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="primary" />
            </Backdrop>
        </Grid>
    )
};

export default CaseUpload;
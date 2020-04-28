import React, { useState, useRef, useEffect } from 'react';
import CaseUpload from './CaseUpload';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import apiurl from '../../utils/apiurl';

const CaseUploadCtrl = props => {
    const { user, history, caseData, setDialog } = props;
    const [title, setTitle] = useState("");
    const [caseText, setCaseText] = useState("");
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [backdrop, setBackdrop] = useState(false);
    const uploaderEl = useRef(null);

    useEffect(()=>{
        if(caseData){
            setTitle(caseData.title);
            setCaseText(caseData.caseText);
            setCategories(caseData.categories);
            setImages(caseData.images);
        }
    },[]);

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
        axios.post(apiurl.imageUrl(),formData)
        .then( res => {
            uploadCase(res.data);
        })
        .catch( err => {
            console.log(err);
        });
    };
    
    const uploadCase = imageList => {
        if(!imageList || imageList.length < 1)
            imageList = [];
        const formData = {
            title,
            writer:user,
            categories,
            images:imageList,
            caseText
        };
        setBackdrop(true);
        axios.post(apiurl.caseUrl(),formData)
        .then( res => {
            setBackdrop(false);
            setTitle("");
            setCaseText("");
            setCategories([]);
            setImages([]);
            
            history.push('/');
            
        })
        .catch( err => {
            console.log(err);
        })
    };

    const removeImage = () => {
        
    };

    const patchCase = imageList => {
        if(!imageList || imageList.length < 1)
            imageList = [];
        const formData = {
            title,
            writer:user,
            categories,
            images:imageList,
            caseText
        };
        setBackdrop(true);
        axios.post(apiurl.caseUrl(),formData)
        .then( res => {
            setBackdrop(false);
            setTitle("");
            setCaseText("");
            setCategories([]);
            setImages([]);
            
            setDialog(false);
        })
        .catch( err => {
            console.log(err);
        });
    };

    return <CaseUpload
                title={title}
                setTitle={setTitle}
                caseText={caseText}
                categories={categories}
                setCategories={setCategories}
                images={images}
                setImages={setImages}
                backdrop={backdrop}
                setBackdrop={setBackdrop}
                uploaderEl={uploaderEl}
                handleTitle={handleTitle}
                handleCaseText={handleCaseText}
                handleCategory={handleCategory}
                handleDelete={handleDelete}
                handleFile={handleFile}
                handleDeleteFile={handleDeleteFile}
                uploadImage={uploadImage}
            />
};

export default withRouter(CaseUploadCtrl);
import React, { useState, useRef, useEffect } from 'react';
import CaseUpload from './CaseUpload';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import apiurl from '../../utils/apiurl';

const CaseUploadCtrl = props => {
    const { user, caseData, setDialog, action, getCaseDataList } = props;
    const [title, setTitle] = useState("");
    const [caseText, setCaseText] = useState("");
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [backdrop, setBackdrop] = useState(false);
    const uploaderEl = useRef(null);
    const categoryList = [
        '근골격',
        '소화기',
        '순환기',
        '호흡기',
        '비뇨기',
        '부인과',
        '정신과',
        '피부과',
        '소아과',
        '부작용'
    ];
    
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
        setImages(images.filter(image => (image.name || image) !== imageName));
    };

    const uploadImage = () => {
        let formData = new FormData();
        images.map( image => {
            if(typeof image !== 'string')
                formData.append('images',image)
            else
                formData.append('uploadedImages',image);
        });
        
        let restMethod = null;
        if(action === 'upload') restMethod = axios.post;
        else restMethod = axios.patch;

        restMethod(apiurl.imageUrl(),formData)
        .then( res => {
            uploadCase(res.data.payload);
        })
        .catch( err => {
            console.log(err);
        });
        
    };
    
    const uploadCase = imageList => {
        if(!imageList || imageList.length < 1)
            imageList = [];
        
        const case_id = caseData ? caseData._id : null;
        const formData = {
            case_id,
            title,
            writer:user,
            categories,
            images:imageList,
            caseText
        };
        setBackdrop(true);
        
        let restMethod = null;
        if(action === 'upload') restMethod = axios.post;
        else restMethod = axios.patch;

        restMethod(apiurl.caseUrl(),formData)
        .then( res => {
            setBackdrop(false);
            setTitle("");
            setCaseText("");
            setCategories([]);
            setImages([]);
            if(setDialog) setDialog(false);
            getCaseDataList();
            
        })
        .catch( err => {
            console.log(err);
        })
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
                categoryList={categoryList}
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
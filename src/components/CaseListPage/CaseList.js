import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Case from './Case';
import axios from 'axios';

const CaseList = props => {
    const [caseDataList, setCaseDataList] = useState([]);
    const { user } = props;

    useEffect(() => {
        axios.get('http://localhost:4000/api/cases')
        .then( res => {
            const { status, payload } = res.data;
            if(status === 'success')
                setCaseDataList(payload);
        })
        .catch( err => {
            console.log(err);
        });

    },[]);

    const caseList = caseDataList.map( caseData => {
       return <Case key={caseData._id} caseData={caseData} user={user}/>
    });
    return(
        <Grid container direction='column' justify='space-evenly' alignItems='center' spacing={4}>
            {caseList}
        </Grid>
    );
}

export default CaseList;
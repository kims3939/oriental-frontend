import React from 'react';
import Case from './Case';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    
});

const caseDataList = [{
    id:1,
    writer:{
      username:'kims3939',
      speciality:'Oriental Doctor'  
    },
    title:"After the storm",
    content:"Today I met a patient who is a COVID survivor. He was in the ICU for a month, requiring mechanical ventilation almost four weeks. That’s much longer than a typical patient with bacterial pneumonia. This patient required a lengthy infusion of neuromuscular blockade which, along with shock, contributed to profound weakness. This complication, also called critical illness polyneuropathy, is one that I suspect we’re going to see a lot of this summer, as the patients who are sick in April are discharged from an ICU in May and June. I’d love to hear others’ reflections on this and if you have any tips for preparation",
    categories:['Critical Case','Infectious Disease'],
    follow:20,
    view:1000,
    comments:[
        {
            id:1,
            writer:{
                username:'DrGau',
                speciality:'Family Medicine Resident',
            },
            comment:'Would periodic electrical muscle stimulation be beneficial?',
            like:0,
        },
        {
            writer:{
                username:'skmarzolf',
                speciality:'Physical Medicine and Rehabilitation Resident ',
            },
            comment:'Those of us in PM&R are expecting to see this as well.',
            like:0,
        }
    ]
}];

const CaseList = props => {
    const classes = useStyles();
    const caseList = caseDataList.map( caseData => {
       return <Case key={caseData.id} caseData={caseData} />
    });
    return(
        <Grid container direction='column' justify='space-evenly' alignItems='center'>
            {caseList}
        </Grid>
    );
}

export default CaseList;
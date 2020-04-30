import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiurl from '../../utils/apiurl';
import { withRouter } from 'react-router-dom';
import Case from './Case';

const CaseCtrl = props => {
    const { caseData, user, getCaseDataList } = props;
    const [expanded, setExpanded] = useState(false);
    const [reportAnchor, setReportAnchor] = useState(null);
    const [shareAnchor, setShareAnchor] = useState(null);
    const [comment, setComment] = useState('');
    const [like, setLike] = useState(false);
    const [dialog, setDialog] = useState(false);
    
    useEffect(() => {
        const like_ = caseData.likers.some(liker => liker.username === user.username);
        setLike(like_);
    }, [caseData]);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleReportMenuOpen = event => {
        setReportAnchor(event.currentTarget);
    };

    const handleReportMenuClose = () => {
        setReportAnchor(null);
    };

    const handleShareMenuOpen = event => {
        setShareAnchor(event.currentTarget);
    };

    const handleShareMenuClose = () => {
        setShareAnchor(null);
    };

    const handleComment = event => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        const postData = {
            case_id:caseData._id,
            writer:user,
            comment
        };

        await axios.post(apiurl.commentUrl(),postData)
        .then( res => {
            setComment('');
            getCaseDataList();
        })
        .catch( error => {
            console.log(error);
        });
    };

    const handleCommentCancel = () => {
        setComment('');
    };

    const handleCaseUpdate = caseData => {
        setReportAnchor(null);
        setDialog(true);
    };
    
    const handleCaseDelete = caseData => {
        setReportAnchor(null);
        axios.delete(apiurl.caseUrl({'case_id':caseData._id}))
        .then( res => {
            getCaseDataList();
        }) 
        .catch( err => {
            console.log(err);
        });
    };
    
    const toggleLike = () => {
        const patchData = {
            case_id:caseData._id,
            liker:user,
            toggle:!like
        };
        axios.patch(apiurl.likeUrl(), patchData)
        .then( res => {
            getCaseDataList();
        })
        .catch( err => {
            console.log(err);
        });
    };

    return(
        <Case 
            expanded={expanded}
            setExpanded={setExpanded}
            reportAnchor={reportAnchor}
            setReportAnchor={setReportAnchor}
            shareAnchor={shareAnchor}
            setShareAnchor={setShareAnchor}
            comment={comment}
            setComment={setComment}
            like={like}
            setLike={setLike}
            dialog={dialog}
            setDialog={setDialog}
            caseData={caseData}
            user={user}
            getCaseDataList={getCaseDataList}
            handleExpandClick={handleExpandClick}
            handleReportMenuOpen={handleReportMenuOpen}
            handleReportMenuClose={handleReportMenuClose}
            handleShareMenuOpen={handleShareMenuOpen}
            handleShareMenuClose={handleShareMenuClose}
            handleComment={handleComment}
            handleCommentSubmit={handleCommentSubmit}
            handleCommentCancel={handleCommentCancel}
            handleCaseUpdate={handleCaseUpdate}	
            handleCaseDelete={handleCaseDelete}
            toggleLike={toggleLike}
        />
    )
}

export default withRouter(CaseCtrl);
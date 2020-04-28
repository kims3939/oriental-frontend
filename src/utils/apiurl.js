import qs from 'querystring';
const baseUrl = 'http://localhost:4000/api';

const caseUrl = params => {
    if(params)
        return baseUrl+"/cases/?"+qs.stringify(params);
    else
        return baseUrl+'/cases';
};

const commentUrl = params => {
    if(params)
        return baseUrl+"/cases/comment/?"+qs.stringify(params);
    else
        return baseUrl+'/cases.comment';
};

const imageUrl = params => {
    if(params)
        return baseUrl+"/cases/images/?"+qs.stringify(params);
    else
        return baseUrl+'/cases/images';
};

const likeUrl = params => {
    if(params)
        return baseUrl+"/cases/like/?"+qs.stringify(params);
    else
        return baseUrl+'/cases/like';
};

export default {
    caseUrl,
    commentUrl,
    imageUrl,
    likeUrl
}

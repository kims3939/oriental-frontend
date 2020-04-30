import qs from 'querystring';
const hostUrl = 'http://localhost:4000';
const baseUrl = hostUrl+'/api';

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
        return baseUrl+'/cases/comment';
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

const searchUrl = params => {
    if(params)
        return baseUrl+"/search/?"+qs.stringify(params);
    else
        return baseUrl+'/search';
};

export default {
    hostUrl,
    caseUrl,
    commentUrl,
    imageUrl,
    likeUrl,
    searchUrl
}

import axios from 'axios';

const queryService = url => {
    const urlEncoded = encodeURIComponent(url);
    
    return new Promise((resolve, reject) => {
        axios
            .get(`https://query-service.herokuapp.com/rating?url=${urlEncoded}`)
            .then((res) => {
                resolve(res.data);
            });
    });
};

const getHtmlFromLink = url => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => {
                resolve(res.data);
            });
    });
};

export { queryService, getHtmlFromLink };
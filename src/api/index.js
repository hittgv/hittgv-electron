import axios from 'axios';

const queryService = url => {
    const urlEncoded = encodeURIComponent(url);
    
    return new Promise((resolve, reject) => {
        axios
            .get(`http://ec2-35-157-232-74.eu-central-1.compute.amazonaws.com/rating?url=${urlEncoded}`)
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
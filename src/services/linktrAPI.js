import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


function createHeaders() {
    const auth = JSON.parse(localStorage.getItem(""))
    const config = {
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    };

    return config;
}

function getPost() {
    const promise = axios.get(`${BASE_URL}/posts`)
    return promise
}

function getHashtagPost(hashtag) {
    const promise = axios.get(`${BASE_URL}/posts/{hashtag}`)
    return promise
}

function getHashtags() {
    const promise = axios.get(`${BASE_URL}/hashtags`)
    return promise
}


export {
    getPost,
    getHashtagPost,
    getHashtags
}
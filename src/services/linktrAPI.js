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
    return promise;
}

function getLikes() {
    const promise = axios.get(`${BASE_URL}/likes`)
    return promise;
}

function addLike(postId, userId) {
    const promise = axios.post(`${BASE_URL}/likes`, { postId, userId })
}

function removeLike(postId, userId) {
    const promise = axios.delete(`${BASE_URL}/likes`, { postId, userId })
}

export {
    getPost,
    getLikes,
    addLike,
    removeLike
}
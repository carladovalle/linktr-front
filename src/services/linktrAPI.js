import axios from 'axios';
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = 'http://localhost:4000';

function createHeaders() {
	const config = {
		headers: {
			Authorization: `Bearer 6c933abc-5f18-4c39-a7fe-b5c2e5075ac6`,
		},
	};
	// const auth = JSON.parse(localStorage.getItem(''));
	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${auth.token}`,
	// 	},
	// };
	return config;
}

function getPost() {
    const promise = axios.get(`${BASE_URL}posts`)
    return promise;
}

function publishPost(body) {
	const config = createHeaders();
	const promise = axios.post(`${BASE_URL}/posts/publish`, body, config);
	return promise;
}

function searchUsers(params) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/users/search/${params}`, config);
	return promise;
}

function getLikes(config) {
    const promise = axios.get(`${BASE_URL}likes`, config)
    return promise;
}

function addLike(postId, config) {
    const promise = axios.post(`${BASE_URL}likes`, postId, config)
    return promise
}

function removeLike(postId, config) {
    const promise = axios.delete(`${BASE_URL}likes/${postId.postId}`, config)
    return promise
}

export {
    getPost,
    publishPost,
	searchUsers,
    getLikes,
    addLike,
    removeLike
}
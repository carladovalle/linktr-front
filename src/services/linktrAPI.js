import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function createHeaders() {
	const auth = JSON.parse(localStorage.getItem('token'));
	const config = {
		headers: {
			Authorization: `Bearer ${auth.token}`,
		},
	};

	return config;
}

function getPost() {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/posts`, config);
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

function getLikes() {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/likes`, config);
	return promise;
}

function getLikesQtd (postId) {
	const config = createHeaders();
    const promise = axios.get(`${BASE_URL}/likesQtd/${postId}`, config)
    return promise;
}

function addLike(postId) {
	const config = createHeaders();
	const promise = axios.post(`${BASE_URL}/likes`, postId, config);
	return promise;
}

function removeLike(postId) {
	const config = createHeaders();
	const promise = axios.delete(`${BASE_URL}/likes/${postId.postId}`, config);
	return promise;
}

function getHashtagPost(hashtag) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/hashtags/${hashtag}`, config);
	return promise;
}

function getHashtags() {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/hashtags`, config);
	return promise;
}

function getUserPosts(id) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/user/${id}`, config);
	return promise;
}

function deletePost(postId) {
	const config = createHeaders();
	const promise = axios.delete(`${BASE_URL}/posts/delete/${postId.postId}`, config);
    return promise;
}

function editThePost(postId, content) {
	const config = createHeaders();
	console.log(content)
	const promise = axios.put(`${BASE_URL}/posts/edit/${postId.postId}`, content ,config);
    return promise;
}

export {
	getPost,
	publishPost,
	getHashtagPost,
	getHashtags,
	searchUsers,
    getLikes,
    getLikesQtd,
    addLike,
    removeLike,
	deletePost, 
	editThePost,
	getUserPosts,
};

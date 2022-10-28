import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
//const BASE_URL = "http://localhost:4000";

function createHeaders() {
	const auth = JSON.parse(localStorage.getItem('token'));
	const config = {
		headers: {
			Authorization: `Bearer ${auth.token}`,
		},
	};

	return config;
}

function getPost(offset) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/posts/?offset=${offset}&limit=10`, config);
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

function isFollowed(followedId) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/follows/${followedId}`, config);
	return promise;
}

function changeFollow(followedId, followed) {
	const config = createHeaders();
	const body = { followedId, followed }
	const promise = axios.post(`${BASE_URL}/follows`, body, config);
	return promise;
}

function getHashtagPost(hashtag, offset) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/hashtags/${hashtag}/?offset=${offset}&limit=10`, config);
	return promise;
}

function getHashtags() {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/hashtags`, config);
	return promise;
}

function getUserPosts(id, offset) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/user/${id}/?offset=${offset}&limit=10`, config);
	return promise;
}

function deletePost(postId) {
	const config = createHeaders();
	const promise = axios.delete(`${BASE_URL}/posts/delete/${postId.postId}`, config);
    return promise;
}

function editThePost(postId, content) {
	const config = createHeaders();
	const promise = axios.put(`${BASE_URL}/posts/edit/${postId.postId}`, content, config);
    return promise;
}

function addCommentPost(postId, text) {
	const config = createHeaders();
	const promise = axios.post(`${BASE_URL}/comments/${postId.postId}`, text, config);
    return promise;
}

function getCommentPost(postId) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/comments/${postId.postId}`, config);
    return promise;
}

function getCommentsQtd(postId) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/commentsQtd/${postId}`, config);
    return promise;
}

function getLastPostId(){
	const promise = axios.get(`${BASE_URL}/haveNewPost`)
	return promise
}

function repost(postId) {
	const config = createHeaders();
	const promise = axios.post(`${BASE_URL}/repost`, postId, config);
	return promise;
}
function getRepostQtd(postId) {
    const promise = axios.get(`${BASE_URL}/repostNumber/${postId}`)
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
	isFollowed,
	changeFollow,
	deletePost, 
	editThePost,
	getUserPosts,
	addCommentPost,
	getCommentPost,
	getLastPostId,
	getCommentsQtd,
	repost,
	getRepostQtd
};

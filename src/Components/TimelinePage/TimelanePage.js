import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import SubmitBox from './SubmitBox';
import HashtagList from './HashtagsList';
import NewPostNotification from './NewPostsNotification';
import InfiniteScroll from 'react-infinite-scroller';

export default function TimelinePage({fIds,
	posts,
	message,
	setMessage,
	rerender,
	setRerender,
	setPosts}) 
	{
	const [more, setMore] = useState(false);
	const itemsPerPage = 10;
  	const [records, setrecords] = useState(itemsPerPage);
	let test = []

	useEffect(() =>{
		setMore(true)

	}, [posts])

	const loadData = () => {
		if (records > posts.length && posts[-1] == test[-1]) {
		setMore(false);

		} else {
		setTimeout(() => {
			setrecords(records + itemsPerPage);
			//(posts.length-records)>10? setrecords(records + 10):setrecords(records+15);
		}, 1000);
		}
    
	};

	const showItems = item => {
		let items = [];
		for (let i = 0; i < records; i++) {
			if(item[i]){
				items.push(<PostCard
					key={i}
					id={item[i].id}
					userImg={item[i].image}
					name={item[i].name}
					text={item[i].content}
					urlInfos={item[i].urlInfos}
					liked={item[i].liked}
					rerender={rerender}
					setRerender={setRerender}
					posts={posts}
					setMessage={setMessage}
					userId={item[i].userId}
					isrepost={item[i].isrepost}
					reposterid={item[i].reposterid}
					reposterName={item[i].reposterName}
				/>)
			}
		  ;
		test.push(item[i])
		}
		return items;
	  };

	return (
		<>
			<Container>
				<div className="content">
					<h1>timeline</h1>
					<SubmitBox
						setPosts={setPosts}
						setMessage={setMessage}
						posts={posts}
						rerender={rerender}
						setRerender={setRerender}
					/>

					<NewPostNotification lastPostRendered={posts[0]} followsIds={fIds}/>

					<InfiniteScroll loadMore={loadData} hasMore={more}>
						{posts.length === 0 ? (
							<h6>{message}</h6>
						) : <>
						{showItems(posts)}
						</>}
					</InfiniteScroll>

				</div>
				<HashtagList />
			</Container>
		</>
	);
}

const Container = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	margin-top: 125px;

	.content {
		width: 611px;
	}

	h1 {
		font-family: 'Oswald', sans-serif;
		font-style: normal;
		font-weight: 700;
		font-size: 43px;
		line-height: 64px;
		color: #ffffff;
		margin-bottom: 43px;
	}

	h6 {
		margin-bottom: 30px;
		font-style: normal;
		font-weight: 400;
		font-size: 19px;
		line-height: 23px;
		color: #ffffff;
		word-break: break-word;
	}

	@media (max-width: 675px) {
		margin-top: 146px;

		.content {
			width: 100%;
		}
		h1 {
			margin-left: 17px;
		}
		h6 {
			margin-left: 17px;
		}
	}
`;

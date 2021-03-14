import React, { useState, useCallback } from 'react';
import { Card, Button, Popover, Avatar, List, Comment } from 'antd';
import {
	RetweetOutlined,
	HeartTwoTone,
	MessageOutlined,
	EllipsisOutlined,
	HeartOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const id = useSelector((state) => state.user.me?.id);
	const liked = post.Likers.find((v) => v.id === id);
	const { removePostLoading } = useSelector((state) => state.post);

	const [commentFormOpened, setCommentFormOpened] = useState(false);

	const onLike = useCallback(() => {
		dispatch({
			type: LIKE_POST_REQUEST,
			data: post.id,
		});
	}, []);

	const onUnLike = useCallback(() => {
		dispatch({
			type: UNLIKE_POST_REQUEST,
			data: post.id,
		});
	}, []);

	const onToggleComment = useCallback(() => {
		setCommentFormOpened((prev) => !prev);
	}, []);

	const onRemovePost = useCallback(() => {
		dispatch({
			type: REMOVE_POST_REQUEST,
			data: post.id,
		});
	}, []);

	return (
		<div style={{ marginBottom: 20 }}>
			<Card
				cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined key={post.id} />,
					liked
						? <HeartTwoTone twoToneColor="#eb2f96" key={post.id} onClick={onUnLike} />
						: <HeartOutlined key={post.id} onClick={onLike} />,
					<MessageOutlined key={post.id} onClick={onToggleComment} />,
					<Popover key={post.id} content={(
						<Button.Group>
							{id && post.User.id === id ? (
								<>
									<Button>수정</Button>
									<Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
								</>
							) : <Button>신고</Button>
							}
						</Button.Group>
					)}>
						<EllipsisOutlined />
					</Popover>
				]}
				extra={id && <FollowButton post={post} />}
			>
				<Card.Meta
					avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
					title={post.User.nickname}
					description={<PostCardContent postData={post.content} />}
				/>
			</Card>
			{commentFormOpened && (
				<div>
					<CommentForm post={post} />
					<List
						key={post.id}
						header={`${post.Comments.length}개의 댓글`}
						itemLayout="horizontal"
						dataSource={post.Comments}
						renderItem={(item) => (
							<li>
								<Comment
									key={item.id}
									author={item.User.nickname}
									avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
									content={item.content}
								/>
							</li>
						)}
					/>
				</div>
			)}
		</div>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.string,
		Comments: PropTypes.arrayOf(PropTypes.object),
		Images: PropTypes.arrayOf(PropTypes.object),
		Likers: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
};

export default PostCard;
const express = require('express');

const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
	const content = req.body.content;
	try {
		const post = await Post.create({
			content,
			UserId: req.user.id,
		});
		const fullPost = await Post.findOne({
			where: { id: post.id },
			include: [{
				model: Image,
			}, {
				model: Comment,
				include: [{
					model: User,
					attributes: ['id', 'nickname'],
				}]
			}, {
				model: User,
				attributes: ['id', 'nickname'],
			}, {
				model: User,
				as: 'Likers',
				attributes: ['id'],
			}],
		});
		return res.status(200).json(fullPost);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
	const postId = req.params.postId;
	const content = req.body.content;
	try {
		const post = await Post.findOne({ where: { id: postId } });
		if (!post) {
			return res.status(403).send('존재하지 않는 게시글입니다.')
		}
		const comment = await Comment.create({
			content,
			PostId: parseInt(postId),
			UserId: req.user.id,
		});
		const fullComment = await Comment.findOne({
			where: { id: comment.id },
			include: [{
				model: User,
				attributes: ['id', 'nickname'],
			}]
		});
		res.status(200).json(fullComment);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
	const postId = req.params.postId;
	try {
		const post = await Post.findOne({ where: { id: postId } });
		if (!post) {
			return res.status(403).send('게시글이 존재하지 않습니다.');
		}
		await post.addLikers(req.user.id);
		res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
	const postId = req.params.postId;
	try {
		const post = await Post.findOne({ where: { id: postId } });
		if (!post) {
			return res.status(403).send('게시글이 존재하지 않습니다.');
		}
		await post.removeLikers(req.user.id);
		res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
	const postId = req.params.postId;
	try {
		await Post.destroy({
			where: {
				id: postId,
				UserId: req.user.id,
			},
		});
		res.status(200).json({ PostId: parseInt(postId) });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
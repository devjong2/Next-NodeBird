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
			}, {
				model: User,
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
	try {
		const post = await Post.findOne({ where: { id: postId } });
		if (!post) {
			return res.status(403).send('존재하지 않는 게시글입니다.')
		}
		const comment = await Comment.create({
			content,
			PostId: postId,
			UserId: req.user.id,
		});
		res.status(200).json(comment);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/', (req, res) => {
	res.json('hello express');
});

module.exports = router;
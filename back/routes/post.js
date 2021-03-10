const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
	res.json('hello express');
});

router.delete('/', (req, res) => {
	res.json('hello express');
});

module.exports = router;
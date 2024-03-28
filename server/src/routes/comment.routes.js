const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

// Comment
router.get('/:id', commentController.commentInfo);
router.get('/message/:id', commentController.getAllMessagesComments);

router.put('/', commentController.postComment);
router.patch('/:id', commentController.modifieComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;

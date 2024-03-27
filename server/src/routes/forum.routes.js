const router = require('express').Router();
const forumController = require('../controllers/forum.controller');

// Forum
router.get('/', forumController.getAllForums);
router.get('/:id', forumController.forumInfos);

router.put('/', forumController.createForum);
router.patch('/acces/:id', forumController.changeAcces);
router.patch('/name/:id', forumController.changeName);
router.delete('/:id', forumController.deleteForum);

module.exports = router;

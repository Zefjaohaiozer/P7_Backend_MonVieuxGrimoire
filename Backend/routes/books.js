const express = require('express');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const bookCtrl = require('../controllers/book');
const router = express.Router();

router.get('/', bookCtrl.findBooks);
router.get('/:id', bookCtrl.findBook);
router.post('/', auth, multer, bookCtrl.addNewBook);
router.put('/:id', auth, multer, bookCtrl.updateBook);
module.exports = router;

const express = require('express');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const bookCtrl = require('../controllers/book');
const router = express.Router();

router.get('/bestrating', bookCtrl.bookBestRating);
router.get('/:id', bookCtrl.findBook);
router.get('/', bookCtrl.findBooks);
router.post('/', auth, multer, bookCtrl.addNewBook);
router.put('/:id', auth, multer, bookCtrl.updateBook);
router.delete('/:id', auth, multer, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);
module.exports = router;

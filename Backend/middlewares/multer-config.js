const multer = require('multer');

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
};
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'files');
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(' ').join('_');
		const realname = name.split(`'`).join('_');
		const realrealname = realname.split('.')[0];
		const extension = MIME_TYPES[file.mimetype];
		callback(null, realrealname + Date.now() + '.' + extension);
	},
});

module.exports = multer({ storage }).single('image');

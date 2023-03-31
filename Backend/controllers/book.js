const { all } = require('../app');
const Book = require('../models/Book');

exports.addNewBook = (req, res, next) => {
	const bookObject = JSON.parse(req.body.book);
	const userId = req.auth.userId;
	delete bookObject.userId;
	const book = new Book({
		...bookObject,
		userId: userId,
		imageUrl: `${req.protocol}://${req.get('host')}/files/${
			req.file.filename
		}`,
	});

	book.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.findBooks = (req, res, next) => {
	Book.find()
		.then((books) => res.status(200).json(books))
		.catch((error) => res.status(400).json({ error }));
};
exports.findBook = (req, res, next) => {
	Book.findOne()
		.then((books) => res.status(200).json(books))
		.catch((error) => res.status(400).json({ error }));
};

exports.updateBook = (req, res, next) => {
	const bookObject = JSON.parse(req.body.book);
	const userId = req.auth.userId;
	delete bookObject.userId;
	Book.findOneAndUpdate({
		...bookObject,
		userId: userId,
		imageUrl: `${req.protocol}://${req.get('host')}/files/${
			req.file.filename
		}`,
	});
};

// const averageRating = () => {
// 	if (ratingSchema.length === 0) {
// 		return null;
// 	}

// 	const sum = ratingSchema.grade.reduce((total, rating) => {
// 		return total + rating;
// 	}, 0);
// 	console.log(sum / ratingSchema.length);
// 	return sum / ratingSchema.length;
// };

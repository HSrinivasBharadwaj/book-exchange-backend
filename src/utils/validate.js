const validateAddBook = (req, res, next) => {
  const { title, author, genre, condition, description } = req.body;
  console.log("title",title.length)
  if (!title || !author || !genre || !condition || !description) {
    return res
      .status(400)
      .json({ message: "All the fields are  required to add the book" });
  }
  if (title.length < 2 || title.length > 100) {
    return res
      .status(400)
      .json({ message: "Title must be between 2 and 100 characters" });
  }
  const ALLOWED_GENRES = [
    "Fiction",
    "Non-Fiction",
    "Sci-Fi",
    "Fantasy",
    "Biography",
  ];
  if (!ALLOWED_GENRES.includes(genre)) {
    return res.status(400).json({ message: "Invalid genre selected" });
  }
  const ALLOWED_BOOK_CONDITIONS = ["New", "Like New", "Used", "Old"];
  if (!ALLOWED_BOOK_CONDITIONS.includes(condition)) {
    return res.status(400).json({ message: "Invalid Condition selected" });
  }
  next()
};

module.exports = validateAddBook

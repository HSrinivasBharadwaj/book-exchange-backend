const express = require('express');
const validateAuth = require('../middlewares/authValidation');
const Book = require('../models/book');
const validateAddBook = require('../utils/validate');
const bookRouter = express.Router();

bookRouter.post("/addbook",validateAuth,validateAddBook,async(req,res) => {
    const {title,author,genre,condition,description} = req.body
    try {
        const book = new Book({
            title,
            author,
            genre,
            condition,
            description
        })
        await book.save();
        return res.status(200).json({message: "Book Added Successfully",data:book})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
})

bookRouter.get("/getBooks",validateAuth,async(req,res) => {
    try {
        const getAllBooks = await Book.find();
        if (getAllBooks.length === 0) {
            return res.status(404).json({message: "Books Not found"})
        }
        return res.status(200).json({message: "Fetched all the books",data:getAllBooks})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
})

bookRouter.get("/getBook/:id",validateAuth,async(req,res) => {
    const {id} = req.params
    try {
        const getBookById = await Book.findById(id);
        if (!getBookById) {
            return res.status(404).json({message: "Not able to find the book by Id"})
        }
        return res.status(200).json({message: "Fetched the particular book successfully",data:getBookById})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
})


module.exports = bookRouter
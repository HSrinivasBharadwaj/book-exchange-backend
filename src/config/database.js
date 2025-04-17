const mongoose = require('mongoose');


const connectToDB = async() => {
    await mongoose.connect("mongodb+srv://Bharadwaj:Hullur9606@cluster0.w06lp2k.mongodb.net/bookExchange")
}

module.exports = connectToDB
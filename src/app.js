const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth');
const connectDb = require('./config/database');
const port = 2222;

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/",authRouter)


connectDb().then(() => {
    try {
        app.listen(port,() => {
            console.log("Successfully connected to Db");
            console.log("Port",port)
        })
    } catch (error) {
        console.log(error)
    }
})


const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const bookRouter = require('./routes/book');
const connectDb = require('./config/database');
const port = 2222;

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))
app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",bookRouter)


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


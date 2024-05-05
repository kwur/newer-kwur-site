require("dotenv").config()
const express = require('express')
const app = express()

const mongoose = require("mongoose")
const session = require("express-session")

const port = process.env.PORT || 3000
const userRoutes = require("./routes/userRoutes")
const cors = require('cors')

// connect to database
mongoose.connect(process.env.URI)


// open up backend on the given port
app.listen(port, () => {
  console.log(`KWUR backend listening on port ${port}`)
})

// const DEBUGGING = process.env.DEBUGGING
// const url = DEBUGGING === "true" ? process.env.DEBUGGING_FRONTEND_URL : process.env.FRONTEND_URL // where the request is coming from (frontend)
// app.use(cors({ credentials: true, origin: url }));
app.use(function (req, res, next) { // https://enable-cors.org/server_expressjs.html
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express.json());


// setup middleware 
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: "strict"
    }
}))

app.use("/users", userRoutes)
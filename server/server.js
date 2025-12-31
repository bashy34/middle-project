require("dotenv").config()

const express = require("express")
const cors = require("cors")

const corsOptions = require("./config/corsOptions")
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4500
const app = express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/tasks",require('./routes/taskRoute'))
app.use("/api/articles",require('./routes/articleRoute'))
app.use("/api/users",require('./routes/userRoute'))
app.use("/api/potos",require('./routes/potoRoute'))

app.get("/", (req,res) => {
    res.send("home page")
})

mongoose.connection.once('open',()=> {
    console.log('connect to mongoDB')
    app.listen(PORT,()=>{
    console.log(`Server runnig on port ${PORT}`)
    }) 
})

mongoose.connection.on('error', err => {
    console.log(err)
})

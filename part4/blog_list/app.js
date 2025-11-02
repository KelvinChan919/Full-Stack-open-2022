const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())

mongoose.connect(config.mongoUrl)

app.use('/api/blogs', blogsRouter)
module.exports = app





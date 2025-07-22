const mongoose = require("mongoose");
const express = require('express');
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)

const PostScheme = new mongoose.model("Post",{
    title: {
        text: String
    },
    content: {
        text: String,
    },
    slug: String,
})


module.exports = PostScheme

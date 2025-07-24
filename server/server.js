const express = require("express");
const app = express();
const Dataposts = require('./DataPosts')
const mongoose = require('mongoose')
const slugify = require("slugify")
let cors = require('cors')

app.use(cors());

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
app.route("/home")
        .get(async (req, res) => {
            try {
                const myPosts = await Dataposts.find()

                if(!myPosts) throw new Error("Not found")
                res.status(200).json(myPosts)
            } catch(err) {
                res.status(401).json(err)
            }
        })

        .post((req, res) => {
            let title = req.body.title;
            let content = req.body.content;
            let slug = slugify(title.text)

            const posts = new Dataposts({
                title,
                content,
                slug
            })

            if (title == '' | title == undefined | title == " ") {
                console.log("Por gentileza, arrumar essa merda")
            }

            posts.save().then(() => {
                res.json({slug, title, content})
            }).catch(() => {
                res.status(500).send("try again")
            })
        })

app.route("/home/:postId")
        .delete((req, res) => {

            let postId = req.params.postId

            Dataposts.deleteOne({"_id": postId})
            .then(() => {
                res.status(200).json(`was removed`)
            })
            .catch((err) => {
                res.status(401).json(err)
            })
        })

        .patch((req, res) => {
            
            let postId = req.params.postId

            Dataposts.findByIdAndUpdate({"_id": postId}, req.body)
            .then(() => {
                res.status(200).json("Was update!")
            })
            .catch(err => {
                res.status(401).json("deu erro")
                console.error(err)
            })
        })


app.listen(3000, () => {
    console.log("Server is running at port 3000")
})
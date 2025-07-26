<template>
    <div class="main">
        
        <div class="type-post">
            <h1>Posts</h1>
            <input type="text" v-model="title.text" placeholder="type a name">
            <br/>
            <input type="text" v-model="content.text" placeholder="type a content">
            <button @click="addPost">Add Post</button>
        </div>
        
        <div class="ctn-all">
        <div v-for="(post, i) in posts" :key="post._id">
            <div class="ctn-post">

                <div class="title">
                    <h2>{{ post.title.text }}</h2>
                </div>
                
                <div class="ctn-menu">
                    <div class="content">
                    
                        <h3>Content</h3>

                    <div class="">
                        <p> {{ post.content.text }}</p>
                    </div>
                </div>
                
                <hr>
                <input type="text" placeholder="Add a comment">
                <button class="delete" @click="removePost(post, i)">Delete</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  <router-view/>
</template>

<script>
import axios from "axios";
export default {
    name: "App",
    data() {
        return {
            posts: [],
            title: {
                text: ""
            },
            content: {
                text: ""
            },
        };
    },
    async mounted() {
        const response = await axios.get("http://localhost:3000/home");
        this.posts = response.data
    },


    methods: {
        async addPost(e) {
            e.preventDefault();
            const response = await axios.post("http://localhost:3000/home", {
                title: {text: this.title.text},
                content: {text: this.content.text}
            })
            .catch((err) => console.error(err))
            this.posts.push(response.data)
            this.title.text = '';
            this.content.text = ''
        },

        async removePost(item, i) {
            await axios.delete(`http://localhost:3000/home/${item._id}`, {

            })
            .catch(err => console.error(err))
            this.posts.splice(i, 1);
        }
    
    }
}

</script>

<style>
*
{
    margin: 0%;
    padding: 0%;
    display: flexbox;
}
hr
{
    margin: 0px 10%;
    width: 80%;
}
h1
{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

div.type-post
{
    margin-left: 20%;
}

div.type-post button
{
    background-color: rgb(70, 203, 247)
}

button
{
    width: 6pc;
    height: 2.1pc;
    border: 0px;
    border-radius: 5px;
}

.ctn-post
{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    height: 20pc;
    width: 15pc;
    border-radius: 2px;
    margin-inline: 10px 5px;
    background: linear-gradient(20deg, rgba(255, 166, 0, 0.051), white);
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.197);
}

div.type-post input
{
    width: 15pc;
    height: 2pc;
    border: 1px solid gray;
    border-radius: 3px;
    box-shadow: 7px 5px 8px rgb(172, 172, 172);
    margin: 10px 20px;
}

div.ctn-menu button.delete
{
    background-color: rgb(251, 91, 91);
    color: rgb(255, 222, 222);
    margin: 5px 52%;
}

.ctn-post .title
{
    height: 4.5pc;
    background-color: rgba(255, 68, 0, 0.641);
    border-top-left-radius: 1px;
    border-top-right-radius: 1px;
    color: rgb(253, 233, 226);
    text-align: center;
}

.ctn-menu
{
    margin: 1.3pc 10px;
    width: 90%;
}

.ctn-menu input
{
    margin: 2pc 10px 0px;
    width: 90%;

}

.ctn-post .content
{
    margin: 10px 0px;
    width: 95%;
}

.ctn-post .content h3
{
    margin-left: 10px;
    color: rgba(32, 25, 10, 0.81);
}

.ctn-post .content div
{
    display: block;
    padding: 8px;
    margin: 10px 8px;
    width: 90%;
    background-color: rgba(251, 160, 57, 0.149);
    border-left: 3px solid rgba(255, 157, 0, 0.474);
    font-family: system-ui;
    border-radius: 0px 4px 4px 0px;
    color: rgba(214, 141, 45, 0.91);
}

.ctn-all
{
    margin: 7pc 10pc;
    width: 100%;
    height: 20pc;
    display: flex;
}
</style>
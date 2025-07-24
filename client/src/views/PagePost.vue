<template>
    <div class="main">
    <h1>Posts</h1>
    
    <div class="">
      <input type="text" v-model="title.text" placeholder="type a name">
      <br/>
      <input type="text" v-model="content.text" placeholder="type a content">
      <button @click="addPost">Add Post</button>
    </div>

    <div class="container-all">
        <div v-for="(post, i) in posts" :key="post._id">
            <div class="container-post">

                <div class="title">
                    <h2>{{ post.title.text }}</h2>
                </div>

                <div class="content">
                    <h4>{{ post.content.text }}</h4>
                </div>

                <button class="delete" @click="removePost(post, i)">Delete</button>
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

input
{
    width: 15pc;
    height: 2pc;
    border: 1px solid gray;
    border-radius: 10px;
    box-shadow: 7px 5px 8px rgb(172, 172, 172);
    margin: 10px 20px;
}

.container-post
{
    height: 20pc;
    width: 15pc;
    border: 1px solid black;
    border-radius: 10px;
    margin-inline: 10px 5px; 
}

.container-post .title
{
    height: 3pc;
    background-color: aqua;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.container-all
{
    margin: 7pc 10pc;
    width: 100%;
    height: 20pc;
    border: 1px solid brown;
    display: flex;
}
</style>
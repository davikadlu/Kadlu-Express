<template>
    <div class="main">
    <h1>Posts</h1>
    
    <div class="">
      <input type="text" v-model="title.text" placeholder="type a name">
      <input type="text" v-model="content.text" placeholder="type a content">
      <button @click="submit">Add Post</button>
    </div>

    <div>
        <div v-for="(post) in posts" :key="post._id">
            <div>
                <span>{{ post.title.text }}</span>
                <span>{{ post.content.text }}</span>
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
    mounted() {
        const response = axios.get("http://localhost:3000/home");
        this.posts = response.data
    },


    methods: {
        submit() {
            const response = axios.post("http://localhost:3000/home", {
            title: {text: this.title.text},
            content: {text: this.content.text}
            }).then(x => {
            if(x.status == 200) {
                console.log("Post was posted!")
            }
            }).catch(err => {
            console.log(err)
            });
            this.posts.push(response.data)
            this.title.text = '';
            this.content.text = ''
        },
        
        }
    }

</script>

<style>
</style>
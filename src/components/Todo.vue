<template>
  <div>
    <h2>Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
    <button @click="fetchPosts">Load Posts</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const posts = computed(() => store.state.posts.posts);

    const fetchPosts = () => {
      store.dispatch("posts/fetchPosts");
    };

    return { posts, fetchPosts };
  },
});
</script>

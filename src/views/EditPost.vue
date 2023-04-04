<script setup lang="ts">
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import { Post, TimelinePost } from '../posts';
import { useRoute, useRouter } from 'vue-router';
import { usePosts } from '../stores/posts';

const route = useRoute();
const postsStore = usePosts();
const router = useRouter();

const id = route.params.id as string;
const post = postsStore.all.get(id);

if (!post) {
  throw Error(`Post with id ${id} was not found.`);
}

async function handleSubmit(newPost: Post) {
  console.log('alan updatePost');
  await postsStore.updatePost(newPost);
  router.push('/');
}
</script>

<template>
  Edit Post <PostWriter :post="post" @submit="handleSubmit" />
</template>

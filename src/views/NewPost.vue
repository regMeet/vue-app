<script setup lang="ts">
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import { Post, TimelinePost } from '../posts';
import { useUsers } from '../stores/users';
import { useRouter } from 'vue-router';
import { usePosts } from '../stores/posts';

const usersStore = useUsers();
const postsStore = usePosts();
const router = useRouter();

if (!usersStore.currentUserId) {
  throw Error('User was not found');
}

const post: TimelinePost = {
  id: '-1',
  title: 'Title',
  authorId: usersStore.currentUserId,
  created: DateTime.now(),
  markdown: '## Title',
  html: '<h2>Title</h2>',
};

async function handleSubmit(newPost: Post) {
  await postsStore.createPost(newPost);
  router.push('/');
}
</script>

<template>New Post <PostWriter :post="post" @submit="handleSubmit" /></template>

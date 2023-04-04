<script setup lang="ts">
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import { TimelinePost } from '../posts';
import { useRoute } from 'vue-router';
import { usePosts } from '../stores/posts';

const route = useRoute();
const postsStore = usePosts();
const id = route.params.id as string;

const post = postsStore.all.get(id);

if (!post) {
  throw Error(`Post with id ${id} was not found.`);
}
</script>

<template>Edit Post <PostWriter :post="post" /></template>

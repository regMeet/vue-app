<script setup lang="ts">
import { DateTime } from "luxon";
import { ref, computed } from "vue";
import { TimelinePost, today, thisWeek, thisMonth } from "../posts";
import TimelineItem from "./TimelineItem.vue";
import { usePosts } from "../stores/posts";
import { periods, Period } from "../constants";

const postsStore = usePosts();

const posts = computed<TimelinePost[]>(() => {
  return postsStore.ids
    .map((id) => {
      const post = postsStore.all.get(id)!;
      return {
        ...post,
        created: DateTime.fromISO(post.created),
      };
    })
    .filter((post) => {
      if (postsStore.selectedPeriod === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }

      if (postsStore.selectedPeriod === "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }

      return post;
    });
});
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': postsStore.selectedPeriod === period }"
        @click="postsStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem v-for="post of posts" :key="post.id" :post="post" />
  </nav>
</template>

<script setup>
import { navitia } from "~/composables/navitia";
const { error, feed_publishers, context, links, notes, exceptions } =
  await navitia();

const getErrorMsg = error ? error.message : "";
</script>

<template>
  <div v-if="getErrorMsg" class="alert alert-danger">
    {{ getErrorMsg }}
  </div>
</template>

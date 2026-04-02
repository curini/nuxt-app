<script setup>
import { navitia } from "~/composables/navitia";
const journey = await navitia();
console.log(journey);
</script>

<template>detail</template>

<script setup>
const start = [2.3749036, 48.8467927];
const end = [2.2922926, 48.8583736];
const response = navitia(start.join(";"), end.join(";"));
console.log(response);
</script>

<template>detail</template>

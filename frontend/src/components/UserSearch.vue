<template>
    <section class="filters-container">
      <input
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        @keyup="$emit('search')"
        type="text"
        placeholder="Pesquisar por nome"
      />
    </section>
  </template>
  
  <script setup>
  defineProps({
    search: {
      type: String,
      required: true,
    },
  })
  
  defineEmits(['update:search', 'search'])
  </script>
  
  <style scoped>
  .filters-container {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .filters-container input {
    width: 96%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  </style>
<template>
    <div class="pagination" v-if="totalPages > 0">
      <button
        type="button"
        @click="$emit('prev')"
        :disabled="page === 1"
      >
        Anterior
      </button>
  
      <span>Página {{ page }} de {{ totalPages }}</span>
  
      <button
        type="button"
        @click="$emit('next')"
        :disabled="page === totalPages"
      >
        Próxima
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    page: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  })
  
  defineEmits(['prev', 'next'])
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }
  
  .pagination button {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
  }
  </style>
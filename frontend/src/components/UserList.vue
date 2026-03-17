<template>
    <section class="users-container">
      <p v-if="loading">Carregando usuários...</p>
  
      <p v-else-if="users.length === 0">Nenhum usuário encontrado.</p>
  
      <ul v-else class="users-list">
        <li v-for="user in users" :key="user.id" class="user-item">
          <div class="user-info">
            <strong>{{ user.name }}</strong>
            <span>{{ user.email }}</span>
          </div>
  
          <div class="actions">
            <button type="button" @click="$emit('edit', user)">Editar</button>
            <button type="button" @click="$emit('delete', user.id)">Deletar</button>
          </div>
        </li>
      </ul>
    </section>
  </template>
  
  <script setup>
  defineProps({
    users: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  })
  
  defineEmits(['edit', 'delete'])
  </script>
  
  <style scoped>
  .users-container {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .users-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .user-item:last-child {
    border-bottom: none;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .actions button {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
  }
  </style>
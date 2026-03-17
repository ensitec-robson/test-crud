<template>
    <section class="form-container">
      <h2>{{ form.id ? 'Editar usuário' : 'Cadastrar usuário' }}</h2>
  
      <form @submit.prevent="$emit('submit')" class="user-form">
        <input
          :value="form.name"
          @input="$emit('update:name', $event.target.value)"
          type="text"
          placeholder="Digite o nome"
        />
  
        <input
          :value="form.email"
          @input="$emit('update:email', $event.target.value)"
          type="email"
          placeholder="Digite o email"
        />
  
        <button type="submit">
          {{ form.id ? 'Atualizar' : 'Cadastrar' }}
        </button>
  
        <button
          v-if="form.id"
          type="button"
          @click="$emit('cancel')"
        >
          Cancelar edição
        </button>
      </form>
    </section>
  </template>
  
  <script setup>
  defineProps({
    form: {
      type: Object,
      required: true,
    },
  })
  
  defineEmits(['submit', 'cancel', 'update:name', 'update:email'])
  </script>
  
  <style scoped>
  .form-container {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .user-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .user-form input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  
  .user-form button {
    padding: 0.75rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  </style>
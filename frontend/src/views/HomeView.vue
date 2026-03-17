<template>
    <main class="home">
      <h1>CRUD de Usuários</h1>
      <p>Lista de usuários</p>
  
      <UserForm
        :form="form"
        @submit="saveUser"
        @cancel="resetForm"
        @update:name="form.name = $event"
        @update:email="form.email = $event"
      />
  
      <UserSearch
        :search="search"
        @update:search="search = $event"
        @search="handleSearch"
      />
  
      <UserList
        :users="users"
        :loading="loading"
        @edit="startEdit"
        @delete="deleteUser"
      />
  
      <UserPagination
        :page="page"
        :total-pages="totalPages"
        @prev="prevPage"
        @next="nextPage"
      />
    </main>
  </template>
  
  <script setup>
  import UserForm from '../components/UserForm.vue'
  import UserSearch from '../components/UserSearch.vue'
  import UserList from '../components/UserList.vue'
  import UserPagination from '../components/UserPagination.vue'
  import { useUsers } from '../composables/useUsers'
  
  const {
    users,
    loading,
    search,
    page,
    totalPages,
    form,
    handleSearch,
    resetForm,
    saveUser,
    startEdit,
    deleteUser,
    nextPage,
    prevPage,
  } = useUsers()
  </script>
  
  <style scoped>
  .home {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1 {
    margin-bottom: 0.5rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  </style>
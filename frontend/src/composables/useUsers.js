import { onMounted, reactive, ref } from 'vue'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUserById,
} from '../services/useService'

export function useUsers() {
  const users = ref([])
  const loading = ref(false)

  const search = ref('')
  const page = ref(1)
  const totalPages = ref(1)
  const limit = 5

  const form = reactive({
    id: null,
    name: '',
    email: '',
  })

  const fetchUsers = async () => {
    try {
      loading.value = true

      const data = await getUsers({
        search: search.value,
        page: page.value,
        limit,
      })

      users.value = data.data || []
      totalPages.value = data.totalPages || 1
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    } finally {
      loading.value = false
    }
  }

  const resetForm = () => {
    form.id = null
    form.name = ''
    form.email = ''
  }

  const handleSearch = async () => {
    page.value = 1
    await fetchUsers()
  }

  const saveUser = async () => {
    try {
      let response

      const payload = {
        name: form.name,
        email: form.email,
      }

      if (form.id) {
        response = await updateUser(form.id, payload)
      } else {
        response = await createUser(payload)
      }

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || data.error || 'Erro ao salvar usuário')
        return
      }

      resetForm()
      await fetchUsers()
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      alert('Erro ao salvar usuário')
    }
  }

  const startEdit = (user) => {
    form.id = user.id
    form.name = user.name
    form.email = user.email
  }

  const deleteUser = async (id) => {
    try {
      const response = await deleteUserById(id)
      const data = await response.json()

      if (!response.ok) {
        alert(data.message || data.error || 'Erro ao deletar usuário')
        return
      }

      if (form.id === id) {
        resetForm()
      }

      await fetchUsers()

      if (users.value.length === 0 && page.value > 1) {
        page.value--
        await fetchUsers()
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
      alert('Erro ao deletar usuário')
    }
  }

  const nextPage = async () => {
    if (page.value < totalPages.value) {
      page.value++
      await fetchUsers()
    }
  }

  const prevPage = async () => {
    if (page.value > 1) {
      page.value--
      await fetchUsers()
    }
  }

  onMounted(() => {
    fetchUsers()
  })

  return {
    users,
    loading,
    search,
    page,
    totalPages,
    form,
    fetchUsers,
    handleSearch,
    resetForm,
    saveUser,
    startEdit,
    deleteUser,
    nextPage,
    prevPage,
  }
}
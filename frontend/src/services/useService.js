const API_URL = 'http://localhost:3000/api/users'

export const getUsers = async ({ search, page, limit }) => {
  const response = await fetch(
    `${API_URL}?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
  )

  return response.json()
}

export const createUser = async (payload) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return response
}

export const updateUser = async (id, payload) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return response
}

export const deleteUserById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  return response
}
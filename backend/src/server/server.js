require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('../db/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do CRUD está rodando!');
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Conexão com o banco funcionando!',
      now: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro ao conectar no banco',
      error: error.message,
    });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const search = req.query.search || ''
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const offset = (page - 1) * limit

    const usersResult = await pool.query(
      `
      SELECT * FROM users
      WHERE name ILIKE $1
      ORDER BY id ASC
      LIMIT $2 OFFSET $3
      `,
      [`%${search}%`, limit, offset]
    )

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM users WHERE name ILIKE $1`,
      [`%${search}%`]
    )

    const total = Number(countResult.rows[0].count)
    const totalPages = Math.ceil(total / limit)

    res.json({
      data: usersResult.rows,
      page,
      totalPages,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Erro ao buscar usuários',
      error: error.message,
    })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro ao criar usuário',
      error: error.message,
    });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Usuário não encontrado',
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro ao atualizar usuário',
      error: error.message,
    });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Usuário não encontrado',
      });
    }

    res.json({
      message: 'Usuário deletado com sucesso',
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro ao deletar usuário',
      error: error.message,
    });
  }
});
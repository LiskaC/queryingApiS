const express = require('express')
const cors = require('cors')
const restMethods = require('./data/restMethods.json')
const fetchVsAxios = require('./data/fetchVsAxios.json')
const users = require('./data/users.json')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'Backend is running!' })
})

app.get('/api/rest-methods', (req, res) => {
  res.json(restMethods)
})

app.get('/api/fetch-vs-axios', (_req, res) => {
  res.json(fetchVsAxios)
})

app.get('/api/users', (_req, res) => {
  res.json(users)
})

app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id))
  if (!user) {
    return res.status(404).json({ error: 'User not found', id: parseInt(req.params.id) })
  }
  res.json(user)
})

app.post('/api/users', (req, res) => {
  const { name, role } = req.body
  const newUser = { id: users.length + 1, name, role }
  users.push(newUser)
  res.status(201).json(newUser)
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const contactRoutes = require('./routes/contacts')

const app = express()

mongoose.connect('mongodb://localhost:27017/contactsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))

app.use('/auth', authRoutes)
app.use('/contacts', contactRoutes)

app.listen(3000, () => console.log('Server listening on port 3000'))

// contacts.js

const express = require('express')
const multer = require('multer')
const csvParser = require('csv-parser')
const Contact = require('../models/contact.model')
const verifyJWT = require('../middleware/verify-jwt')

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post(
  '/upload',
  verifyJWT,
  upload.single('contacts'),
  async (req, res) => {
    try {
      const contacts = []
      const file = req.file.buffer.toString()
      csvParser(file, {
        headers: ['name', 'phone', 'email', 'linkedinProfileUrl'],
      })
        .on('data', (data) => contacts.push(data))
        .on('end', async () => {
          await Contact.create(contacts)
          res.send('Contacts added successfully')
        })
    } catch (error) {
      res.status(500).send(error)
    }
  },
)

module.exports = router

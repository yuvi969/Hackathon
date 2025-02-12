const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./usermongoscheme')
const router = express.Router()
require('dotenv').config()

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    user = new User({ name, email, password: hashedPassword, role })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')


usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    console.log('user', user)
    console.log("savedUser", savedUser);

    response.status(201).json(savedUser)
  })
  
  usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users) 
  })
  
  module.exports = usersRouter
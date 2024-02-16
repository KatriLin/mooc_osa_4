const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', {username:1, name:1, id: 1
      })
      response.json(blogs.map(note => note.toJSON()))
      })
  
      blogsRouter.get('/:id', (request, response, next) => {
        Blog.findById(request.params.id)
          .then(blog => {
            if (blog) {
              response.json(blog)
            } else {
              response.status(404).end()
            }
          })
          .catch(error => next(error))
      })
  
  blogsRouter.post('/', async (request, response) => {
    const {title, author, url, likes} = request.body
    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes:likes === undefined ? 0 : likes,
      user: user._id,
    })

  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

  })



module.exports = blogsRouter
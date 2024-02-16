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
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes:body.likes
    })

  
    blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})



module.exports = blogsRouter
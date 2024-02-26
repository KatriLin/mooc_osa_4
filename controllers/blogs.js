const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', {username:1, name:1, id: 1
      })
      response.json(blogs)
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
      blogsRouter.post('/',middleware.tokenExtractor,middleware.userExtractor,async (request, response) => {
        const {title, author, url, likes} = request.body
        console.log(request)
        const user = request.user
        //const user = await User.findById(body.userId)
    
        if (!title || !url) {
          return response.status(400).json({ error: 'title or url is missing or invalid' })
        }
        const blog = new Blog({
          title: title,
          author: author,
          url: url,
          likes:likes === undefined ? 0 : likes,
          user: user._id
        })
    
      
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
      
        response.status(201).json(savedBlog)
    })
     

    blogsRouter.delete('/:id', middleware.tokenExtractor, async (request, response) => {
      const blog = await Blog.findById(request.params.id)
      console.log("blog",blog)
      const user = await User.findById(decodedToken.id)
      if (!blog) {
        return response.status(401).json({ error: 'missing blog' })
      } 
      if (user.id !== blog.user.toString()) {
        return response.status(401).json({ error: 'not authorized to delete blog' })
      }
    
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    })
  

   

module.exports = blogsRouter
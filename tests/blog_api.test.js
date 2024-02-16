const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helpers')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are retured in json form', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    
  })

  test('Blogs length is correct', async() => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

test('id is defined in correct way not _id',async() => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

test('new blogs are added in the correct way', async() => {
  const newBlog =  {
    title: "Test title for new blog",
    author: "Test author",
    url: "www.testnewblogs.com",
    likes: 5
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  console.log("hellloooo!",blogsAtEnd)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})
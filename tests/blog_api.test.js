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
  expect(blogs[0]._id).not.toBeDefined()
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
  .set('Authorization', 'Bearer ' + token)
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  //const title = blogsAtEnd.map(n => n.title)
 // expect(title).toContain('Test title for new blog')

 // const author = blogsAtEnd.map(n => n.author)
  //expect(author).toContain('Test author')
})



test('if likes do not have value, initial value is set to 0', async () => {
  const newBlog = {
    title: "Test title for new blog",
    author: "Test author",
    url: "www.testnewblogs.com",
  }


  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const likes = blogsAtEnd.map(n => n.likes)
  expect(likes).toContain(0)
})
test('if title not defined, response code 400 Bad request', async () => {
  const newBlog = {
    author: "Test author",
    url: "www.testnewblogs.com",
    likes:5
  }


  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('if url not defined, response code 400 Bad request', async () => {
  const newBlog = {
    title: "Test title for new blog",
    author: "Test author",
    likes:5
  }


  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('username too short returns error code 400', async () => {
  const usersAtStart = await helper.usersInDb()
  const newUser = {
    username: 'L',
    name: 'Luigi L',
    password: 'secreto'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('passwprd too short returns error code 400', async () => {
  const usersAtStart = await helper.usersInDb()
  const newUser = {
    username: 'Luigi',
    name: 'Luigi L',
    password: 's'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
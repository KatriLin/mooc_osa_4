const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum,blog) => sum + blog.likes,0);
  };

  const favoriteBlog = (blogs) => {
    const maxObject = blogs.reduce((max, obj) => (obj.likes > max.likes ? obj : max), blogs[0]);
     
    const result = {
  title: maxObject.title,
  author: maxObject.author,
  likes: maxObject.likes,
};
   
  return result;
  }

  const mostBlogs = (blogs) => {
    const groupeofAuthor = _.groupBy(blogs, 'author');
    const authorWithMostBlogs = _.maxBy(Object.keys(groupeofAuthor), (author) => groupeofAuthor[author].length);
    return {
      author: authorWithMostBlogs,
      blogs: groupeofAuthor[authorWithMostBlogs].length,
    };

  }

  const mostLikes = (blogs) => {
    const gruoupAuthor = _.groupBy(blogs, 'author');
    const authorWithMostlikes = _.maxBy(Object.keys(gruoupAuthor), (author) => {
      return _.sumBy(gruoupAuthor[author],'likes');
    })
    const sumOfLikes = _.sumBy(gruoupAuthor[authorWithMostlikes],'likes')
    const result = {
      author: authorWithMostlikes,
      likes: sumOfLikes
    }
    return result;
  }
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
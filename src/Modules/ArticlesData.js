import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1/'

const getArticles = async () => {
  try {
    let response = await axios.get(apiUrl + 'articles')
    return response.data
  } catch(error) {
    return {
      errorMessage: error.message,
      status: 400
    }
  }
}

const submitArticle = async (title, content, image) => {
  try {
    let response = await axios.post(apiUrl + 'articles',
    {
      title: title,
      content: content,
      image: image
    })
    return response
    
  } catch(error) {
    return error.response.data.errors
  }
}

const getSpecificArticle = async (articleId) => {
  try {
    let response = await axios.get(apiUrl + `articles/${articleId}`)
    return response
  } catch(error) {
    return error.response.data.errors
  }
}

export { getArticles, submitArticle, getSpecificArticle }
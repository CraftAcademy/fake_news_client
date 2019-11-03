import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1/'

const getArticles = async () => {
  try {
    let response = await axios.get(apiUrl + 'articles')
    return response.data
  } catch(error) {
    return {
      errorMessage: error.response.data.error_message,
      status: 200
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
    return error.response.data.error_message
  }
}

const getSpecificArticle = async (articleId) => {
  try {
    let response = await axios.get(apiUrl + `articles/${articleId}`)
    return response
  } catch(error) {
    return error.response.data.error_message
  }
}

export { getArticles, submitArticle, getSpecificArticle }
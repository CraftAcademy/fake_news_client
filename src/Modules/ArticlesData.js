import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1/';

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


};  

export { getArticles }
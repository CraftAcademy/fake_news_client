import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1/auth/'

const submitLoginData = async(email, password) => {
  try {
    let response = await axios.post(
      apiUrl + 'sign_in',
    {
      email: email,
      password: password
    }
    )
    return response
  } catch(error) {
    return error.message
  }
}

export { submitLoginData }
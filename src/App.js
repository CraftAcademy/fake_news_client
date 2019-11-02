import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import CreateArticle from './Components/CreateArticle'

class App extends Component {

  render() {
    return (
      <>
        <Login />
        <SignUp />
        <ListArticles />
        <CreateArticle />
      </>
    )
  }
}

export default App
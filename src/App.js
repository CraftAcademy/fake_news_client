import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import CreateArticle from './Components/CreateArticle'
import { Switch, Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <>
        <Login />
        <ListArticles />
        <CreateArticle />
      </>
    )
  }
}

export default App
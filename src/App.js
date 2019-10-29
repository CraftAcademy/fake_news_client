import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import CreateArticle from './Components/CreateArticle'

class App extends Component {

  render() {
    return (
      <>
        <ListArticles />
        <CreateArticle />
      </>
    )
  }
}

export default App

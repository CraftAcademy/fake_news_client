import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import CreateArticle from './Components/CreateArticle';

class App extends Component {

  render() {
    return (
      <>
        <CreateArticle />
        <ListArticles />
      </>
    )
  }
}

export default App

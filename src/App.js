import React, { Component, Suspense } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import CreateArticle from './Components/CreateArticle'

class App extends Component {

  render() {
    return (
      <>
        <Suspense fallback={(<div>Loading</div>)}>
          <Login />
          <ListArticles />
          <CreateArticle />
        </Suspense>
      </>
    )
  }
}

export default App
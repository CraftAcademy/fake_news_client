import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'

class App extends Component {

  render() {
    return (
      <>
       < Login
       />
      <ListArticles 
      />
      </>
    )
  }
}

export default App
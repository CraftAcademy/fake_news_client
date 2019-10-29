import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
// import { signInUser } from './state/actions/reduxTokenAuthConfig'
// import { connect } from 'react-redux'

class App extends Component {
  state = {
    email: '',
    password: ''
  }

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

// const mapStateToProps = state => {
//   return {
//     currentUser: state.reduxTokenAuth.currentUser
//   }
// }

// const mapDispatchToProps = {
//   signInUser
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)
export default App
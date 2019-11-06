import React, { Component, Suspense } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import CreateArticle from './Components/CreateArticle'
import Navbar from './Components/Navbar'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import "./i18n";
import './Components/CSS/App.css'
import PaymentForm from './Components/PaymentForm'
import { withTranslation } from 'react-i18next'

class App extends Component {

  render() {
    const TranslatedPaymentForm = withTranslation()(PaymentForm)
    return (
      <>
        <Suspense fallback={(<div>Loading</div>)}>
          <Navbar />
          <Route exact path='/' component={ListArticles}></Route>
          {this.props.currentUser.attributes.role === 'journalist' ? (
            <Route exact path='/create' component={CreateArticle} />
          ) : ( <Redirect to='/' /> )}
          <Route exact path='/login' component={Login}>
            {this.props.currentUser.isSignedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path='/signup' component={SignUp}>
            {this.props.currentUser.isSignedIn ? <Redirect to="/" /> : <SignUp />}
          </Route>
          <Route exact path='/payment' component={PaymentForm}>
            {this.props.currentUser.isSignedIn ? <TranslatedPaymentForm /> : <Redirect to="/" />}
          </Route>
        </Suspense>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(App)
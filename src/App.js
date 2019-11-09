import React, { Component, Suspense } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Logout from './Components/Logout'
import CreateArticle from './Components/CreateArticle'
import Navbar from './Components/Navbar'
import SingleArticle from './Components/SingleArticle'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import "./i18n";
import './Components/CSS/App.css'
import PaymentForm from './Components/PaymentForm'
import { withTranslation } from 'react-i18next'
import { generateRequireSignInWrapper } from 'redux-token-auth'
import Politics from './Components/Categories/Politics'
import Economics from './Components/Categories/Economics'
import Sports from './Components/Categories/Sports'
import Tech from './Components/Categories/Tech'
import Leisure from './Components/Categories/Leisure'
import Lifestyle from './Components/Categories/Lifestyle'


const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/login',
})

class App extends Component {

  render() {
    const TranslatedPaymentForm = withTranslation()(PaymentForm)
    const TranslatedListArticles = withTranslation()(ListArticles)

    return (
      <>
        <Suspense fallback={(<div>Loading</div>)}>
          <Navbar />
          <Route exact path='/' component={ListArticles}><TranslatedListArticles /></Route>
          <Route exact path='/article/:id' component={requireSignIn(SingleArticle)} />
          <Route exact path='/create' component={requireSignIn(CreateArticle)} />
          <Route exact path='/politics' component={requireSignIn(Politics)} />
          <Route exact path='/economics' component={requireSignIn(Economics)} />
          <Route exact path='/sports' component={requireSignIn(Sports)} />
          <Route exact path='/tech' component={requireSignIn(Tech)} />
          <Route exact path='/leisure' component={requireSignIn(Leisure)} />
          <Route exact path='/lifestyle' component={requireSignIn(Lifestyle)} />
          <Route exact path='/login' component={Login}>
            {this.props.currentUser.isSignedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path='/signup' component={SignUp}>
            {this.props.currentUser.isSignedIn ? <Redirect to="/" /> : <SignUp />}
          </Route>
          <Route exact path='/logout' component={Logout}>
          </Route>
          <Route exact path='/payment' component={requireSignIn(PaymentForm)}>
            {this.props.currentUser.isSignedIn && this.props.currentUser.attributes.role === 'user' ? <TranslatedPaymentForm /> : <Redirect to="/" />}
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
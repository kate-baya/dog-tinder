import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

import Login from './Login'

import SetUpProfile from './SetUpProfile'
import Stack from './Stack'
import Nav from './Nav'
import Chat from './Chat'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='app'>
          <IfAuthenticated>
            <Nav />
            <Route path={'/setUpProfile/:id'} component={SetUpProfile} />
            <Route path='/stack/:id' component={Stack} />
            <Route path='/messages/:matchId' component={Chat} />
          </IfAuthenticated>
          <IfNotAuthenticated>
            <div className="singleLine">
              <h1 className = "dogTinder-font">Dog Tinder</h1> <img className="titleImg" src={'/images/dogpaws.png'}/>
            </div>
            <Route path='/' exact={true} component={Login}/>

          </IfNotAuthenticated>
        </div>
      </Router>
    )
  }
}

export default connect()(App)

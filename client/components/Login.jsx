import React from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'
import Register from './Register'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      newAccount: false,
      userDoesNotExist: false
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    return signIn({ username, password })
      .then((token) => {
        if (isAuthenticated()) {
          this.props.history.push(`/stack/${token.id}`)
          document.location.reload()
        } return null
      })
      .catch(() => this.setState({ userDoesNotExist: true })
      )
  }

  newAccount = () => {
    this.setState({
      newAccount: true
    })
  }

  render () {
    return (
      <>
        {this.state.newAccount !== true && <div>
          <h2>Login</h2>
          {this.state.userDoesNotExist && <p>User does not exist</p>}
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>Username: </p>
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            </label>
            <label>
              <p>Password:</p>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            <input type ="submit" value="Submit"></input>
          </form>

          <a href="#" onClick={this.newAccount}>Create New Account</a>
        </div>}

        {this.state.newAccount && <Register history={this.props.history}/>}
      </>
    )
  }
}

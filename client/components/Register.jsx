import React from 'react'
import { register, isAuthenticated } from 'authenticare/client'

export default class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      registerErrorMessage: false,
      login: false
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
    const { username, email, password } = this.state
    return register({ username, email, password })

      .then((token) => {
        if (isAuthenticated()) {
          this.props.history.push(`/setUpProfile/${token.id}`)
          document.location.reload()
        }
        return null
      })
      .catch((e) => {
        console.log(e)
        if (!isAuthenticated()) {
          this.setState({ registerErrorMessage: true })
        }
      })
  }

  render () {
    return (
      <div className="container">
        <div>
          <h3>Woof!</h3>
          <p>Please register to continue</p>
          {this.state.registerErrorMessage && <p>User already exists</p>}
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>Username: </p>
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            </label>
            <label>
              <p>Email: </p>
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
            </label>
            <label>
              <p>Password:</p>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Register"></input>
          </form>

        </div>
      </div>
    )
  }
}

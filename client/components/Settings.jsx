import React from 'react'
import { logOff } from 'authenticare/client'
import { connect } from 'react-redux'
import { getUser, updateUser } from '../apis/usersApi'
import Footer from './Footer'

class Settings extends React.Component {
  state = {
    edit: false,
    userSettings: {
      dog_name: '',
      breed: '',
      bio: '',
      owner_name: '',
      image: '',
      location: ''
    }
  }

  edit = e => {
    this.setState({
      edit: true
    })
  }

  save = e => {
    this.setState({
      edit: false
    })
  }

  componentDidMount () {
    getUser()
      .then(userSettings => {
        this.setState({ userSettings })
        return null
      })
      .catch(err => console.log(err))
  }

  handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        [name]: value
      }
    })
  }

  handleSubmit = e => {
    console.log('submitted')
    e.preventDefault()
    updateUser(this.state.userSettings, this.props.dispatch)
  }

  loggingOff = () => {
    logOff()
    document.location = '/'
  }

  render (e) {
    return (
      <div className="settings">
        <p className="title">App Settings</p>
        <div className="flexHorizontal center">
          <p>Profile Settings</p>
          {this.state.edit === false && <button className="space shadow" onClick={this.edit}>Edit User Details</button>}
          {this.state.edit === true &&
        <form onSubmit={this.handleSubmit} className="flexHorizontal">
          <label>
            Dog name: <br/>
            <input type="text" placeholder={this.state.userSettings.dog_name} name='dog_name' value={this.state.userSettings.dog_name} onChange={this.handleChange} />
          </label>
          <label>
            Owner name:<br/>
            <input type="text" placeholder={this.state.userSettings.owner_name} name='owner_name' value={this.state.userSettings.owner_name} onChange={this.handleChange} />
          </label>
          <label>
            Location:<br/>
            <input type="text" placeholder={this.state.userSettings.location} name="location" value={this.state.userSettings.location} onChange={this.handleChange} />
          </label>
          <label>
            Bio:<br/>
            <input type="text" placeholder={this.state.userSettings.bio} name="bio" value={this.state.userSettings.bio} onChange={this.handleChange} />
          </label>
          <label>
            Breed:<br/>
            <input type="text" placeholder={this.state.userSettings.breed} name="breed" value={this.state.userSettings.breed} onChange={this.handleChange} />
          </label>
          <label>
            Images<br/>
            <input type="text" name="image" value={this.state.image} onChange={this.handleChange} />
          </label>
          <input type="submit" value="save" onClick={this.save}></input>
        </form>}

          <p>Sign Out</p>
          <button className="shadow" onClick={this.loggingOff}>Log Off</button>
        </div>

        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Settings)

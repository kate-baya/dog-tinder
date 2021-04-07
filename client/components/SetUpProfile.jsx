import React from 'react'
import { connect } from 'react-redux'
import { saveUser } from '../apis/usersApi'

class SetUpProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dog_name: '',
      owner_name: '',
      breed: '',
      location: '',
      bio: '',
      image: ''
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
    saveUser(this.state, this.props.dispatch)
      .then(user => {
        this.props.history.push(`/stack/${user.id}`)
        document.location.reload()
        return null
      })
      .catch(error => console.log(error))
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Dog Name</p>
            <input type='text' name={'dog_name'} value={this.state.dog_name} onChange={this.handleChange} />
          </label>
          <label>
            <p>Owner Name</p>
            <input type='text' name={'owner_name'} value={this.state.owner_name} onChange={this.handleChange} />
          </label>
          <label>
            <p>Photos</p>
            <input type='text' name={'image'} value={this.state.image} onChange={this.handleChange} />
          </label>
          <label>
            <p>Breed</p>
            <input type='text' name={'breed'} value={this.state.breed} onChange={this.handleChange} />
          </label>
          <label>
            <p>Location</p>
            <input type='text' name={'location'} value={this.state.location} onChange={this.handleChange} />
          </label>
          <label>
            <p>Bio</p>
            <input type='text' name={'bio'} value={this.state.bio} onChange={this.handleChange} />
          </label>
          <br></br>
          <input type="submit" value="save"></input>
        </form>
      </div>
    )
  }
}

export default connect()(SetUpProfile)

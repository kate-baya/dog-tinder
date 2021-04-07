import React from 'react'
import { connect } from 'react-redux'

class MatchedUserProfile extends React.Component {
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

  unmatch = e => {
    // change this.state.like = false
    // change this.state.dislike = true
  }

  render () {
    return (
      <>
        <div>
          <img src={this.image}/>
          <div>
            <header>Name : breed of dog</header>
            <a href="#" onClick={this.moreInfo}>ℹ️</a>
            {this.state.moreInfo === true && <div>
              <p>Location</p>
              <p>Bio</p>
            </div>}
            <button onClick={this.unmatch}>Unmatch</button>
          </div>
        </div>
      </>
    )
  }
}

export default connect()(MatchedUserProfile)

import React from 'react'
import { connect } from 'react-redux'
import { getMatches } from '../apis/matches'
import { getUser } from '../apis/usersApi'
import Match from './Match'

class Matches extends React.Component {
  state = {
    loggedUser: {
      dog_name: '',
      owner_name: '',
      id: '',
      image: ''
    },
    noMatches: false
  }

  componentDidMount () {
    getMatches(this.props.dispatch)
    getUser()
      .then(loggedUser => {
        this.setState({ loggedUser })
        return null
      })
      .catch(err => console.log(err))
  }

  render () {
    const noMatches = this.props.matches.length === 0

    return (
      <>
        {noMatches && <div className="noDoggos">
          <p>Seems a little lonely here... </p>
          <p>💔</p>
          <p>get swiping for that puppy love!</p>
        </div>}
        <div>
          <ul style={{ listStyleType: 'none' }}>
            {this.props.matches.map(match => <Match match={match} key={match.swiper} />)}
          </ul>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.matches
  }
}

export default connect(mapStateToProps)(Matches)

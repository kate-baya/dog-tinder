import React from 'react'
import { Link } from 'react-router-dom'
import { deleteMatch } from '../apis/matches'
import { connect } from 'react-redux'

function Match (props) {
  function clickHandler () {
    deleteMatch(props.match, props.dispatch)
  }

  return <div className='matches'>
        <a href="#" className="unmatchButton" onClick={clickHandler}>Unmatch</a>
    <Link style={{ textDecoration: 'none' }} to={'/messages/' + props.match.swiper} >
      <li>
        <div className="matchFlex">
        <img className="matchImg padding" src={props.match.image}/>
        <p className="text">{props.match.dog_name}, {props.match.breed}</p> 
        </div>
        <h5> owned by {props.match.owner_name}</h5>
        
      </li>
    </Link>

  </div>
}

export default connect()(Match)

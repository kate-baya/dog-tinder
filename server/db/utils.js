function getUserMatches (userIsLiked, userLiked) {
  const userMatches = userLiked.reduce((userMatches, match) => {
    const userWants = match.swiped
    const reciprocalMatch = userIsLiked.find(item => item.swiper === userWants)
    if (reciprocalMatch) {
      const existingMatch = userMatches.find(item => item.swiper === reciprocalMatch.swiper)
      if (!existingMatch) {
        return [...userMatches, reciprocalMatch]
      }
    }
    return userMatches
  }, [])
  return userMatches
}

function getRightSwipes (matches, id) {
  const userIsLiked = matches.filter(match => match.swiped === id)
  const userLiked = matches.filter(match => match.swiper === id)
  return [userIsLiked, userLiked]
}

module.exports = {
  getUserMatches,
  getRightSwipes
}

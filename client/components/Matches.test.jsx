import React from 'react'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import Matches from './Matches'
import { getMatches } from '../apis/matches'

const fakeStore = {
  dispatch: jest.fn(),
  getState: jest.fn(),
  subscribe: jest.fn()
}

jest.mock('../apis/matches', () => ({
  getMatches: jest.fn()
}))

fakeStore.getState.mockImplementation(() => ({
  matches: [{ id: 21, swiper: 21, swiped: 22, liked: true },
    { id: 22, swiper: 21, swiped: 23, liked: true },
    { id: 23, swiper: 22, swiped: 21, liked: false },
    { id: 24, swiper: 22, swiped: 23, liked: true },
    { id: 26, swiper: 23, swiped: 21, liked: true },
    { id: 27, swiper: 23, swiped: 22, liked: true }]
}))

describe('<Matches/>', () => {
  test('receiving list of matches', async () => {
    render(<Provider store={fakeStore}><Matches/></Provider>)
    const matches = await screen.findAllByRole('listitem')
    expect(matches).toHaveLength(7)
  })
  test('getMatches gets called', () => {
    render(<Provider store={fakeStore}><Matches/></Provider>)
    expect(getMatches).toHaveBeenCalledWith(fakeStore.dispatch)
  })
})

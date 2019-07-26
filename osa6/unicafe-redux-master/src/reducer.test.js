import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok, good and bad is incremented', () => {
    const action1 = {
      type: 'OK'
    }
    const action2 = {
      type: 'BAD'
    }
    const action3 = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    
    let newState = counterReducer(state, action1)
    newState = counterReducer(newState, action2)
    newState = counterReducer(newState, action3)
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
  })
  test('zero sets all zero', () => {
    const action = {
      type: 'ZERO'
    }
    const state = {
      good:5,
      ok: 3,
      bad: 11
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
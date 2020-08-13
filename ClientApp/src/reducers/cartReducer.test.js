import cartReducer from './cartReducer'
import deepFreeze from 'deep-freeze'
import { jewelry, earring } from '../test_utils/test_jewelries'

describe('cartReducer', () => {

    it('returns new state with action ADD', () => {
        const state = []
        const action = {
            type: 'ADD',
            data: jewelry
        }

        deepFreeze(state)
        const newState = cartReducer(state, action)
        
        expect(newState.length).toBe(1)
        expect(newState).toContainEqual(action.data)
    })

    it('returns new state with action REMOVE', () => {
        const state = [jewelry, earring]
        const action = {
            type: 'REMOVE',
            data: earring
        }

        deepFreeze(state)
        const newState = cartReducer(state, action)

        expect(newState.length).toBe(1)
        expect(newState).toContainEqual(state[0])
    })

    it('returns new state with action CLEAR', () => {
        const state = [jewelry, earring]
        const action = {
            type: 'CLEAR',
            data: []
        }

        deepFreeze(state)
        const newState = cartReducer(state, action)

        expect(newState.length).toBe(0)
    })
})
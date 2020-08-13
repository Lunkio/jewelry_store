import jewelryReducer from './jewelryReducer'
import deepFreeze from 'deep-freeze'
import { jewelryArray } from '../test_utils/test_jewelries'

describe('jewelryReducer', () => {
    it('returns new state with action INITIAL_PRODUCTS', () => {
        const state = []
        const action = {
            type: 'INITIAL_PRODUCTS',
            data: jewelryArray
        }

        deepFreeze(state)
        const newState = jewelryReducer(state, action)
        expect(newState.length).toBe(2)
        expect(newState).toEqual(action.data)
    })
})
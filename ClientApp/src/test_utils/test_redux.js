import React from 'react'
import { render } from '@testing-library/react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import cartReducer from '../reducers/cartReducer'
import jewelryReducer from '../reducers/jewelryReducer'

const reducer = combineReducers({
    jewelry: jewelryReducer,
    cart: cartReducer
})

export default function renderWithRedux(
    component,
    { initialState, store = createStore(reducer, initialState) } = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store
    }
}
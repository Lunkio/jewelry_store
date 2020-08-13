import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import renderWithRedux from '../../test_utils/test_redux'
import Navbar from '../NavBar'
import { createStore, combineReducers } from 'redux'
import jewelryReducer from '../../reducers/jewelryReducer'
import cartTestReducer from '../../test_utils/test_cartReducer'

afterEach(cleanup)

describe('Navbar -component', () => {

    it('has four main links', () => {
        const component = renderWithRedux(<Router><Navbar /></Router>)
        const ul = component.container.querySelector('ul')
        expect(ul.children.length).toBe(5)
    })

    it('cart shows 0 when is empty', () => {
        const component = renderWithRedux(<Router><Navbar /></Router>)
        expect(component.getByText('cart (0)')).toBeDefined()
    })

    it('cart shows the amount of items in cart', () => {
        const store = createStore(combineReducers({
            jewelry: jewelryReducer,
            cart: cartTestReducer
        }))
        const component = renderWithRedux(<Router><Navbar /></Router>, { store })
        expect(component.getByText('cart (1)')).toBeDefined()
    })
})
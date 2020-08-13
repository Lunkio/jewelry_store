import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import Cart from '../cart/Cart'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import jewelryTestReducer from '../../test_utils/test_jeweryReducer'
import cartTestReducer from '../../test_utils/test_cartReducer'

afterEach(cleanup)

describe('Cart -component', () => {

    describe('empty cart', () => {
        it('shows "empty cart" -text if cart is empty', () => {
            const component = renderWithRedux(<Cart />)
            expect(component.container.querySelector('h1'))
                .toHaveTextContent('cart is empty')
        })
    })
    
    describe('items in cart', () => {
        let component

        beforeEach(() => {
            const store = createStore(combineReducers({
                jewelry: jewelryTestReducer,
                cart: cartTestReducer
            }))
            component = renderWithRedux(<Router><Cart /></Router>, { store })
        })


        it('shows items and form when there are items in cart', () => {            
            expect(component.container).not.toHaveTextContent('cart is empty')
            expect(component.getByText('Items in your cart')).toBeDefined()
            expect(component.getByText('Shipping address')).toBeDefined()
            expect(component.container.querySelector('.cart-items')).toBeTruthy()
        })

        it('empty cart-button empties cart', async () => {
            const button = component.getByTestId('emptyCart')
            fireEvent.click(button)
            expect(component.getByText('cart is empty')).toBeTruthy()
        })
    })
})
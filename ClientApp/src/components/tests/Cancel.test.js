import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import Cancel from '../Cancel'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import jewelryReducer from '../../reducers/jewelryReducer'
import cartTestReducer from '../../test_utils/test_cartReducer'

afterEach(cleanup)

describe('Cancel -component', () => {
    it('if cart is empty, component redirects to Home', () => {
        const { queryByTestId } = renderWithRedux(<Router><Cancel /></Router>)

        expect(queryByTestId(/testCancel/)).toBeNull()
    })

    it('shows cancel text if payment went wrong', () => {
        const store = createStore(combineReducers({
            jewelry: jewelryReducer,
            cart: cartTestReducer
        }))
        const { queryByTestId } = renderWithRedux(<Cancel />, { store })

        expect(queryByTestId(/testCancel/)).toBeTruthy()
    })
})
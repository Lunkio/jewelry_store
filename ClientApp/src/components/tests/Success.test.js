import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import renderWithRedux from '../../test_utils/test_redux'
import Success from '../Success'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Success -component', () => {

    it('if cart is empty, component redirects to Home', () => {
        const { queryByTestId } = renderWithRedux(<Router><Success /></Router>)
        expect(queryByTestId(/testSuccess/)).toBeNull()
    })
})
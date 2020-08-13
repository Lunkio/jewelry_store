import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, wait } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import renderWithRedux from '../../test_utils/test_redux'
import App from '../../App'
jest.mock('../../services/jewelryService')

afterEach(cleanup)

describe('App component', () => {

    it('gets all jewelries from backend', async () => {
        const component = renderWithRedux(<Router><App /></Router>)
        
        await wait()
        
        const items = component.container.querySelector('.home-row')
        expect(items.children.length).toBe(3)
    })
})
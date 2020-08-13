import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import jewelryTestReducer from '../../test_utils/test_jeweryReducer'
import Home from '../Home'
import { createStore, combineReducers } from 'redux'
import cartReducer from '../../reducers/cartReducer'
import { BrowserRouter as Router } from 'react-router-dom'

afterEach(cleanup)

describe('Home -component', () => {
    let component

    beforeEach(() => {
        component = renderWithRedux(<Home />)
    })

    it('renders three social media icons', () => {
        const i = component.container.querySelectorAll('i')
        expect(i.length).toBe(3)
    })

    it('shows welcome text', () => {
        expect(component.container.querySelector('h1'))
            .toHaveTextContent('Welcome to Post Mortem Creations')
    })

    it('renders no items if none on sale', () => {
        const items = component.container.querySelector('.home-row')
        expect(items.children.length).toBe(0)
    })

    it('renders all the items that are on sale', () => {
        const store = createStore(combineReducers({
            jewelry: jewelryTestReducer,
            cart: cartReducer
        }))
        const newStoreComponent = renderWithRedux(<Router><Home /></Router>, { store })
        const items = newStoreComponent.container.querySelector('.home-row')
        expect(items.children.length).toBe(4)
    })
})
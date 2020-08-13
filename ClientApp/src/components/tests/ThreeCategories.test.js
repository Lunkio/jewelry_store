import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import Necklaces from '../Necklaces'
import Earrings from '../Earrings'
import Terrariums from '../Terrariums'
import renderWithRedux from '../../test_utils/test_redux'
import { createStore, combineReducers } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import jewelryTestReducer from '../../test_utils/test_jeweryReducer'
import cartReducer from '../../reducers/cartReducer'

afterEach(cleanup)

describe('Jewelry category -components', () => {

    it('categories render "Nothing here" -text, if no correct jewelry-types available', () => {
        let component = renderWithRedux(<Earrings />)
        expect(component.container.querySelector('h5'))
            .toHaveTextContent('Nothing here, unfortunately... Please check other categories')
        component = renderWithRedux(<Necklaces />)
        expect(component.container.querySelector('h5'))
            .toHaveTextContent('Nothing here, unfortunately... Please check other categories')
        component = renderWithRedux(<Terrariums />)
        expect(component.container.querySelector('h5'))
            .toHaveTextContent('Nothing here, unfortunately... Please check other categories')
    })

    describe('Should render correct jewelries based on jewelry-type', () => {
        let earringComponent
        let necklaceComponent
        let terrariumsComponent

        beforeEach(() => {
            const store = createStore(combineReducers({
                jewelry: jewelryTestReducer,
                cart: cartReducer
            }))
            earringComponent = renderWithRedux(<Router><Earrings /></Router>, { store })
            necklaceComponent = renderWithRedux(<Router><Necklaces /></Router>, { store })
            terrariumsComponent = renderWithRedux(<Router><Terrariums /></Router>, { store })
        })

        it('earrings -component displays earring -types', () => {
            expect(earringComponent.getByText('Earrings:')).toBeTruthy()
            const earrings = earringComponent.container.querySelector('.home-row')
            expect(earrings.children.length).toBe(2)
        })

        it('necklaces -component displays necklace -types', () => {
            expect(necklaceComponent.getByText('Necklaces:')).toBeTruthy()
            const necklaces = necklaceComponent.container.querySelector('.home-row')
            expect(necklaces.children.length).toBe(1)
        })

        it('terrariums -component displays terrarium -types', () => {
            expect(terrariumsComponent.getByText('Terrariums:')).toBeTruthy()
            const terrariums = terrariumsComponent.container.querySelector('.home-row')
            expect(terrariums.children.length).toBe(1)
        })
    })
})
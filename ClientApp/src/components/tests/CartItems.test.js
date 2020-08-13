import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import CartItems from '../cart/CartItems'
import renderWithRedux from '../../test_utils/test_redux'
import { jewelry } from '../../test_utils/test_jewelries'

afterEach(cleanup)

describe('CartItems -component', () => {

    it('renders image of a product', () => {
        const component = renderWithRedux(<CartItems item={jewelry} />)
        const img = component.container.querySelector('img')
        expect(img).toBeTruthy()
    })

    it('renders price and remove-button', () => {
        const component = renderWithRedux(<CartItems item={jewelry}/>)
        expect(component.container.querySelector('.price'))
            .toHaveTextContent('10€')
        expect(component.container.querySelector('button'))
            .toHaveTextContent('Remove')
    })
})
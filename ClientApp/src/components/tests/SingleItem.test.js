import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import { BrowserRouter as Router } from 'react-router-dom'
import SingleItem from '../SingleItem'
import { jewelry } from '../../test_utils/test_jewelries'

afterEach(cleanup)

describe('SingleItem -component', () => {
    let component

    beforeEach(() => {
        component = renderWithRedux(<Router><SingleItem item={jewelry}/></Router>)
    })

    it('should display image, button and price', () => {
        expect(component.getByTestId('testImage')).toBeDefined()

        const span = component.container.querySelector('.amount')
        expect(span).toHaveTextContent('10')

        const button = component.container.querySelector('button')
        expect(button).toHaveTextContent('add to cart')
    })

    it('button can be clicked', () => {
        const button = component.container.querySelector('button')
        expect(button).toHaveTextContent('add to cart')
        expect(button).not.toHaveAttribute('disabled')

        fireEvent.click(button)
        expect(button).toHaveTextContent('in cart')
        expect(button).toHaveAttribute('disabled')
    })
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent } from '@testing-library/react'
import ClickedJewelry from '../ClickedJewelry'
import renderWithRedux from '../../test_utils/test_redux'
import { jewelry } from '../../test_utils/test_jewelries'

afterEach(cleanup)

describe('ClickedJewelry -component', () => {
    let component

    beforeEach(() => {
        component = renderWithRedux(<ClickedJewelry item={jewelry}/>)
    })

    it('shows item', () => {
        const p = component.container.querySelector('.text_contour')
        expect(p).toHaveTextContent('nice item')
    })
    
    it('if item is not in cart, button can be pressed', () => {
        const button = component.container.querySelector('button')
        expect(button).toHaveTextContent('add to cart')
        expect(button).not.toHaveAttribute('disabled')
    })

    it ('if item is in cart, button can\'t be pressed', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)
        expect(button).toHaveTextContent('in cart')
        expect(button).toHaveAttribute('disabled')
    })
})

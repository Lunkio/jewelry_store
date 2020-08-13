import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer -component', () => {

    it('renders', () => {
        const component = render(<Footer />)
        expect(component.container).toHaveTextContent('© Post Mortem Creations')
    })
})
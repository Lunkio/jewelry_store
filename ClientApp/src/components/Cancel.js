import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DivWrapper } from './DivWrapper';

const Cancel = () => {
    const cart = useSelector(state => state.cart);

    if (cart.length === 0) {
        return <Redirect to='/' />
    } else {
        return (
            <DivWrapper className='container cancelled'>
                <h1 className='text_contour'>Oops! Something went wrong</h1>
                <h3 className='text_contour' data-testid='testCancel'>Payment was cancelled/interrupted</h3>
                <h3 className='text_contour'>Please try again</h3>
            </DivWrapper>
        )
    }
}

export default Cancel;
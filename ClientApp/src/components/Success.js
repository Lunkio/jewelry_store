import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DivWrapper } from './DivWrapper';
import { Redirect } from 'react-router-dom';
import { initJewelries } from '../reducers/jewelryReducer';

const Success = () => {
    const dispatch = useDispatch();
    const payment = useSelector(state => state.payment);

    if (payment.length === 0) {
        return <Redirect to='/' />
    }

    dispatch(initJewelries());

    return (
        <DivWrapper className='container successful'>
            <h1 className='text_contour' data-testid='testSuccess'>PAYMENT SUCCESSFUL</h1>
            <h2 className='text_contour'>Thank you for your purchace!</h2>
            <p className='order-amount text_contour'>Order's total sum: <span className='order-sum'>{payment.reduce((acc, item) => acc + item.price, 0)} €</span></p>
            <p className='text_contour'>Order ref-nro: <span style={{ 'fontWeight': '600' }}>{payment[0].id}</span></p>
            <h4 className='text_contour'>You bought the following item(s):</h4>
            <div className='row bought-items'>
                {payment.map(j =>
                    <div className='col-lg-3 col-md-4 col-sm-6 img-box' key={j.id}>
                        <img src={`data:image/jpg;base64,${j.img}`} alt='item' />
                        <p className='price amount'>{j.price} €</p>
                    </div>
                )}
            </div>
        </DivWrapper>
    );
};

export default Success;
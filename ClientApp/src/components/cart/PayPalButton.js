import React from 'react';
import { useDispatch } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { withRouter } from 'react-router-dom';
import jewelryService from '../../services/jewelryService';
import buyerService from '../../services/buyerService';
import { addProductToPayment, emptyPayment } from '../../reducers/paymentReducer';
import { clearCart } from '../../reducers/cartReducer';

const NewPayPalButton = (props) => {
    const dispatch = useDispatch();

    const onSuccess = async (payment) => {
        //console.log("The payment was succeeded!", payment)
        dispatch(emptyPayment());

        const newBuyer = { ...props.buyer, payerID: payment.payerID, paymentID: payment.paymentID, paymentToken: payment.paymentToken }; //adds paypal-info to newBuyer
        //console.log('newbuyer', newBuyer)
        await buyerService.addBuyerToDataBase(newBuyer); //adds new buyer

        for (let i = 0; i < newBuyer.items.length; i++) { //loops through buyers' items and sets availability to false
            await jewelryService.jewelryAvailabilityToFalse(newBuyer.items[i].id, newBuyer.items[i]); // sets item's availability to false
            dispatch(addProductToPayment(newBuyer.items[i])); // add product to paymentReducer so that cart can be emptied
        }

        dispatch(clearCart());

        props.history.push('/success');
    };

    const onCancel = (data) => {
        //console.log('The payment was cancelled!', data)
        props.history.push('/cancel');
    };

    const onError = (err) => {
        //console.log("Error!", err);
        props.history.push('/cancel');
    };

    return (
        <PayPalButton
            amount={props.totalAmount}
            onSuccess={onSuccess}
            onCancel={onCancel}
            onError={onError}
            options={{clientId: process.env.REACT_APP_CLIENT_ID, currency: 'EUR'}}
        />
    );
}

export default withRouter(NewPayPalButton);
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DivWrapper } from '../DivWrapper';
import { clearCart } from '../../reducers/cartReducer';
import { removeFromCart } from '../../reducers/cartReducer';
import { initJewelries } from '../../reducers/jewelryReducer';
import jewelryService from '../../services/jewelryService';
import CartItems from './CartItems';
import PayPalButton from './PayPalButton';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [buyer, setBuyer] = useState({});
    const [paypalButtonVisible, setPaypalButtonVisible] = useState(false);

    if (cart.length === 0) {
        return (
            <DivWrapper className='container empty-cart'>
                <h1 className='text-capitalize text_contour'>cart is empty</h1>
            </DivWrapper>
        );
    }

    // Calculate cart's total amount
    let totalAmount = 0;
    cart.forEach(item => totalAmount += item.price);

    const calculateTotalSum = () => {
        let totalSum = 0;
        cart.forEach(item => totalSum += item.price);
        return totalSum;
    };

    const emptyCart = () => {
        dispatch(clearCart());
    };

    // get jewelries from database and check that all cart items' are available 
    // (if they were already in cart and somebody else bought them meanwhile) and then remove these items' from the cart
    const checkCartItemsAvailable = async () => {
        try {
            const jewelries = await jewelryService.getAll();
            //console.log(jewelries)
            let filteredItems = [];

            for (let i = 0; i < cart.length; i++) {
                for (let j = 0; j < jewelries.length; j++) {
                    if (cart[i].id === jewelries[j].id) {
                        filteredItems.push(jewelries[j]);
                    }
                }
            }

            let alreadySold = filteredItems.filter(item => item.availability === false);

            if (alreadySold.length > 0) {
                window.alert('Seems like one or more of the items in your cart is not available, these items are removed from your cart');
                for (let i = 0; i < alreadySold.length; i++) {
                    dispatch(removeFromCart(alreadySold[i]));
                }
            }
            dispatch(initJewelries());
            return true;
        } catch (e) {
            console.log('error', e);
            return false;
        }        
    };

    const customerDetails = (event) => {
        event.preventDefault();
        event.persist(); // targetit jää voimaan vaikka cartista välillä poistetaan kamaa

        const continueWithPayment = checkCartItemsAvailable();
        if (continueWithPayment === false) {
            return;
        }

        const firstName = event.target.buyerFirstName.value;
        const lastName = event.target.buyerLastName.value;
        const email = event.target.buyerEmail.value;
        const address = event.target.buyerAddress.value;
        const zip = event.target.buyerPostcode.value;
        const city = event.target.buyerCity.value;
        const country = event.target.buyerCountry.value;
        const items = cart;

        const newBuyer = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            zip: zip,
            city: city,
            country: country,
            items
        };
        setBuyer(newBuyer);
        setPaypalButtonVisible(true);
    };

    const show = { display: paypalButtonVisible ? '' : 'none' };

    return (
        <DivWrapper>
            <div className='container'>
                <div className='row cart-container'>
                    <div className='col-lg-6 cart-items-container'>
                        <h2 className='text_contour'>Items in your cart</h2>
                        {cart.map(j => 
                            <CartItems key={j.id} item={j} />
                        )}
                        <button data-testid='emptyCart' className='btn clear-cart-btn' onClick={emptyCart}>Empty Cart</button>
                    </div>
                    <div className='col-lg-6 cart-shipping-details'>
                        <h2 className='text_contour'>Shipping address</h2>
                        <hr className='cart-hr' />
                        <form onSubmit={customerDetails}>
                            <div className='form-row'>
                                <div className='form-group col-md-6'>
                                    <input id='firstName' type='text' name='buyerFirstName' placeholder='Firstname' required className='form-control' />
                                </div>
                                <div className='col-md-6'>
                                    <input id='lastName' type='text' name='buyerLastName' placeholder='Lastname' required className='form-control' />
                                </div>
                            </div>
                            <input id='email' type='email' name='buyerEmail' placeholder='Email' required className='form-control' /><br />
                            <input id='street' type='street' name='buyerAddress' placeholder='Street' required className='form-control' /><br />
                            <input id='city' type='city' name='buyerCity' placeholder='City' required className='form-control' /><br />
                            <div className='form-row'>
                                <div className='form-group col-md-8'>
                                    <select id="country" name="buyerCountry" className="form-control">
                                        <option value="">Select Country</option>
                                        <option value="Finland">Finland</option>
                                        <option value="Austria">Austria</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Switzerland">Switzerland</option>
                                    </select>
                                </div>
                                <div className='form-group col-md-4'>
                                    <input id='zip' type='zip' name='buyerPostcode' placeholder='Postal code' required className='form-control' /><br />
                                </div>
                            </div>
                            <div className='sum-total'>
                                <p className='amount text_contour'>Total sum: {calculateTotalSum()} €</p>
                            </div>
                            <p className='text_contour'>After you have filled your shipping details, press the 'Checkout' -button.
                                If everything is correct, a 'PayPal' -button will appear.
                            </p>
                            <div className='checkout-paypal-buttons'>
                                <button className='btn checkout-btn' id='checkoutBtn' type='submit'>Checkout</button>
                                <div style={show}>
                                    <PayPalButton buyer={buyer} totalAmount={totalAmount} items={cart} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DivWrapper>
    )
}

export default Cart;
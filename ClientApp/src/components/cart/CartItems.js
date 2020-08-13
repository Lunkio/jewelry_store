import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../reducers/cartReducer';

const CartItems = ({ item }) => {
    const dispatch = useDispatch();

    const handleClick = (item) => {
        dispatch(removeFromCart(item));
    };

    return (
        <div className='cart-items'>
            <hr className='cart-items-hr' />
            <div className='cart-item-box'>
                <img src={`data:image/jpg;base64,${item.img}`} alt='product'/>
                <div className='item-price-button'>
                    <div className='price amount'>{item.price}€</div>
                    <button className='btn remove-cart-btn' onClick={() => handleClick(item)}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems;
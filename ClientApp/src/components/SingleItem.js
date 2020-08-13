import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../reducers/cartReducer';

const SingleItem = ({ item }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const handleClick = (item) => {
        dispatch(addToCart(item));
    };

    const checkIfInCart = (id) => {
        let inCart = cart.find(item => item.id === id);
        return inCart !== undefined;
    };

    return (
        <div className='col-lg-4 col-md-6 col-sm-12 single_item_container'>
            <div className='box'>
                <Link to={`/item/${item.id}`}>
                    <img src={`data:image/jpg;base64,${item.img}`} alt='product' data-testid='testImage' />
                </Link>
            </div>
            <div className='item_footer'>
                <div className='price-button'>
                    <div className='price'>
                        <button
                            className='btn btn-primary media-query-set'
                            onClick={() => handleClick(item)}
                            disabled={checkIfInCart(item.id)}
                        >
                            {checkIfInCart(item.id) ? (<p className='text-capitalize mb-0'>in cart</p>) : (<p className='text-capitalize mb-0'>add to cart</p>)}
                        </button>
                        <p><span className='amount'>{item.price}</span> €</p>
                    </div>
                </div>
                <hr className='item_footer_hr' />
            </div>
        </div>
    );
}

export default SingleItem;
import React, { useState } from 'react';
import { DivWrapper } from './DivWrapper';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../reducers/cartReducer';
import Modal from './Modal';

const ClickedJewelry = () => {
    const id = useParams().id;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const jewelries = useSelector(state => state.jewelry);
    const [modalOpen, setModalOpen] = useState(false);

    const item = jewelries.find(i => i.id === Number(id));
    
    if (item === undefined) {
        return (
            <DivWrapper className='container'>
                <h2 className='text_contour'>Jewelry not found...</h2>
            </DivWrapper>
        );
    }

    const handleClick = (item) => {
        dispatch(addToCart(item));
    };

    const checkIfInCart = (id) => {
        let inCart = cart.find(item => item.id === id);
        return inCart !== undefined;
    };

    const modalOpener = () => {
        if (modalOpen) {
            setModalOpen(false);
        } else {
            setModalOpen(true);
        }
    };

    return (
        <DivWrapper className='container'>
            {modalOpen && <Modal img={`data:image/jpg;base64,${item.img}`} modalOpener={modalOpener} />}
            <div className='row clicked_container'>
                <div className='col-lg-6 zoom_box_container'>
                    <div className='zoom_box'>
                        <img onClick={modalOpener} src={`data:image/jpg;base64,${item.img}`} alt='product' />
                    </div>
                </div>
                <div className='col-lg-6 item-details-container'>
                    <div className='story-container'>
                        <p className='text_contour'>{item.description}</p>
                        <hr className='clicked_cc_hr' />
                    </div>
                    <div className='price-btn-container'>
                        <span className='price amount'>{item.price} € </span>
                        <button
                            className='btn btn-primary'
                            onClick={() => handleClick(item)}
                            disabled={checkIfInCart(item.id)}
                        >
                            {checkIfInCart(item.id) ? (<p className='text-capitalize mb-0'>in cart</p>) : (<p className='text-capitalize mb-0'>add to cart</p>)}
                        </button>
                    </div>
                </div>
            </div>
        </DivWrapper>
    );
}

export default ClickedJewelry;
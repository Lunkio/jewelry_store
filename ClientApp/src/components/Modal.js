import React from 'react';

const Modal = (props) => {
    return (
        <div className='modal-container'>
            <img onClick={props.modalOpener} src={props.img} alt='product' />
        </div>
    )
}

export default Modal;
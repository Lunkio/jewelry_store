import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import logo from './../images/logo.jpg';

const NavBar = () => {
    const cart = useSelector(state => state.cart);

    return (
        <NavWrap className='navbar fixed-top navbar-expand-sm navbar-dark'>
            <ul className='navbar-nav text-capitalize'>
                <li>
                    <Link to='/admin/login' className='nav-link'>
                        login
                    </Link>
                </li>
                <li>
                    <Link to='/' className='nav-link'>
                        home
                        {/* <Image src={logo} alt='logo' className='navbar-brand mr-5' width='50'/> */}
                    </Link>
                </li>
                <li>
                    <Link to='/necklaces' className='nav-link'>
                        necklaces
                    </Link>
                </li>
                <li>
                    <Link to='/earrings' className='nav-link'>
                        earrings
                    </Link>
                </li>
                <li>
                    <Link to='/terrariums' className='nav-link'>
                        terrariums
                    </Link>
                </li>
            </ul>
            <div className='nav-cart-container text-capitalize'>
                <Link to='/cart' className='nav-link cart'>
                    <span>
                        <i className='fas fa-shopping-cart' style={{'fontSize': '1.2rem'}}/>
                    </span> {`cart (${cart.length})`}
                </Link>
            </div>
        </NavWrap>
    )
}

const NavWrap = styled.nav`
    background: #786466;
`;

// const Image = styled.img`
//     width: 3rem;
//     border-radius: 15px;
// `

export default NavBar;
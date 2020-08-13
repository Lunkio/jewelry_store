import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterWrap className='font-small'>
            <div className='footer-copyright'>© Post Mortem Creations</div>
        </FooterWrap>
    )
}

const FooterWrap = styled.nav`
    background: #AD887F;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
`;

export default Footer;
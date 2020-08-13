import React from 'react';
import { DivWrapper } from './DivWrapper';
import { useSelector } from 'react-redux';
import SingleItem from './SingleItem';

const Home = () => {
    const jewelries = useSelector(state => state.jewelry);
    //console.log('jewelries', jewelries);

    return (
        <DivWrapper className='container home_main'>
            <div className='social_media-image'>
                <div className='social_media'>
                    <a target='_blank' rel='noreferrer noopener' href='https://www.instagram.com/post_mortem_creations_/'>
                        <span><i className='fab fa-instagram' style={{'fontSize': '2rem', 'color': 'black'}} /></span>
                    </a>
                    <a target='_blank' rel='noreferrer noopener' href='https://www.facebook.com/postmortemcreations1/'>
                        <span><i className='fab fa-facebook-square' style={{'fontSize': '2rem', 'color': 'black'}} /></span>
                    </a>
                    <a className='mail' href='mailto:carolinschumann@yahoo.de/'>
                        <span><i className='fas fa-envelope-square' style={{'fontSize': '2rem', 'color': 'black'}} /></span>
                    </a>
                </div>
                <div className='home_image'>
                    <h1><span className='welcome_text'>Welcome to </span>Post Mortem Creations</h1>
                </div>
            </div>
            <hr className='home-hr' /><hr className='home-hr' />
            <div className='h2_header'>
                <h2 className='text_contour'>All Pieces</h2>
            </div>
            <hr className='home-hr' />
            <div className='row home-row'>
                {jewelries
                    .filter(j => j.availability === true)
                    .map(j => <SingleItem key={j.id} item={j} />
                )}
            </div>
        </DivWrapper>
    )
}

export default Home;
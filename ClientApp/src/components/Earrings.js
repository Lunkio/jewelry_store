import React from 'react';
import SingleItem from './SingleItem';
import { useSelector } from 'react-redux';
import { DivWrapper } from './DivWrapper';

const Earrings = () => {
    const jewelries = useSelector(state => state.jewelry);

    const earrings = jewelries.filter(j => j.type === 'earring');

    if (earrings.length === 0) {
        return (
            <DivWrapper className='container'>
                <h1 className='category-header text_contour'>Earrings:</h1>
                <h5 className='text_contour'>Nothing here, unfortunately... Please check other categories</h5>
            </DivWrapper>
        )
    }

    return (
        <DivWrapper className='container'>
            <h1 className='category-header text_contour'>Earrings:</h1>
            <div className='row home-row'>
                {jewelries
                    .filter(j => j.type === 'earring')
                    .filter(j => j.availability === true)
                    .map(j => <SingleItem key={j.id} item={j} />
                )}
            </div>            
        </DivWrapper>
    )
}

export default Earrings;
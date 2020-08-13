import React from 'react';
import SingleItem from './SingleItem';
import { useSelector } from 'react-redux';
import { DivWrapper } from './DivWrapper';

const Necklaces = () => {
    const jewelries = useSelector(state => state.jewelry);

    const necklaces = jewelries.filter(j => j.type === 'necklace');

    if (necklaces.length === 0) {
        return (
            <DivWrapper className='container'>
                <h1 className='category-header text_contour'>Necklaces:</h1>
                <h5 className='text_contour'>Nothing here, unfortunately... Please check other categories</h5>
            </DivWrapper>
        )
    }

    return (
        <DivWrapper className='container'>
            <h1 className='category-header text_contour'>Necklaces:</h1>
            <div className='row home-row'>
                {jewelries
                    .filter(j => j.type === 'necklace')
                    .filter(j => j.availability === true)
                    .map(j => <SingleItem key={j.id} item={j} />
                )}
            </div>
        </DivWrapper>
    )
}

export default Necklaces;
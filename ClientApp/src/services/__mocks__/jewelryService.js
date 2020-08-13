const jewelries = [
    {
        type: 'earring',
        price: 10,
        availability: true,
        story: 'nice item',
        img: 'randombytes',
        id: '123456789'
    },
    {
        type: 'earring',
        price: 20,
        availability: true,
        story: 'cool item',
        img: 'randombytes',
        id: '234567890'
    },{
        type: 'necklace',
        price: 50,
        availability: true,
        story: 'super item',
        img: 'randombytes',
        id: '987654321'
    },
]

const getAll = () => {
    return Promise.resolve(jewelries)
}

export default { getAll }
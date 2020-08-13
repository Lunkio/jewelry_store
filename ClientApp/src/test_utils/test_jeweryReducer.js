import { jewelry, earring, necklace, terrarium } from './test_jewelries'

const jewelryTestReducer = (state = [jewelry, earring, necklace, terrarium], action) => {
    switch (action.type) {
        case 'INITIAL_PRODUCTS':
            return action.data
        default:
            return state
    }
}

export const initializeProducts = (products) => {
    return {
        type: 'INITIAL_PRODUCTS',
        data: products
    }
}

export default jewelryTestReducer
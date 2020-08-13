import { jewelry } from './test_jewelries'

const cartTestReducer = (state = [jewelry], action) => {
    switch (action.type) {
        case 'ADD':
            return state = [...state, action.data]
        case 'REMOVE':
            const productToBeRemoved = state.find(item => item.id === action.data.id)
            //console.log(productToBeRemoved)
            return state.filter(item => item.id !== productToBeRemoved.id)
        case 'CLEAR':
            return action.data
        case 'UPDATE':
            return action.data
        default:  return state
    }
}

export const addToCart = (product) => {
    return {
        type: 'ADD',
        data: product
    }
}

export const removeFromCart = (product) => {
    return {
        type: 'REMOVE',
        data: product
    }
}

export const clearCart = () => {
    return {
        type: 'CLEAR',
        data: []
    }
}

export const updateCart = (cart) => {
    let updatedCart = JSON.parse(JSON.stringify(cart))
    updatedCart.forEach(item => item.availability = false)
    return {
        type: 'UPDATE',
        data: updatedCart
    }
}

export default cartTestReducer
import jewelryService from "../services/jewelryService";

const jewelryReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIAL_PRODUCTS':
            return action.data;
        default: return state;
    }
};

export const initJewelries = () => {
    return async dispatch => {
        const jewelries = await jewelryService.getAll();
        dispatch({
            type: 'INITIAL_PRODUCTS',
            data: jewelries
        });
    }
};

export default jewelryReducer;
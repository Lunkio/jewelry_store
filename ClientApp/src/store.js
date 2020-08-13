import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import jewelryReducer from './reducers/jewelryReducer';
import cartReducer from './reducers/cartReducer';
import paymentReducer from './reducers/paymentReducer';

const reducers = combineReducers({
    jewelry: jewelryReducer,
    cart: cartReducer,
    payment: paymentReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
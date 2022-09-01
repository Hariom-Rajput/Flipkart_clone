

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { cartReducer } from './reducers/cartReducer';
import { getProductDetailsReducers, getProductsReducers } from './reducers/productReducer';
import { cartReducer } from './reducers/CartReducers';

const reducer = combineReducers({
    getProducts: getProductsReducers,
    getProductDetails: getProductDetailsReducers,
    cart: cartReducer
})


const middleware = [thunk];

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
import * as actionTypes from '../constants/productConstant';
import axios from 'axios';
const URL = '';

export const getProducts = () => async (dispatch) => {
    try {  
        console.log('Hiiiiii getproducts')
        const { data } = await axios.get(`${URL}/products`);
        console.log(data);
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response });
    }
};



export const getProductDetails = (id) => async (dispatch) => {
    try {

        console.log('Product details');
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST})
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`http://localhost:8000/product/${id}`);
        console.log(data);

        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.response});
    }
};


// export const removeProductDetails = () => (dispatch) => {
    
//     dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });

// };
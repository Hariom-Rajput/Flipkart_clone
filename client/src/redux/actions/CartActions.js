import axios from "axios";
import * as actionTypes from '../constants/cartConstants';
const URL = '';

export const addToCart = (id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`http://${URL}/product/${id}`);
        console.log('cart api ', data);
        dispatch({type: actionTypes.ADD_TO_CART, payload: data});
    } catch (error) {
        console.log('error while calling cart API');
    }
}


export const removeFromCart = (id) => (dispatch) =>{
    dispatch({type: actionTypes.REMOVE_FROM_CART, payload: id});
}
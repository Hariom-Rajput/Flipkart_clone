import * as actionTypes from '../constants/productConstant';


export const getProductsReducers = (state = { products: [] }, action) => {
    console.log('Hi getProductReducers', action.type)
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return { products: action.payload }
        case actionTypes.GET_PRODUCTS_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};

export const getProductDetailsReducers = (state = { product: {} }, action) => {

    console.log('Hi getProductDetailsReducers', action.type)
    switch (action.type) {

        // case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
        //     return {
        //         loading: true
        //     }
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                product: action.payload
            }

        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                error: action.payload
            }
        case actionTypes.GET_PRODUCT_DETAILS_RESET:
            return {
                product: {}
            }
        default:
            return state
    }
}
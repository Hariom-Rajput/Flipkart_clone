import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import {  removeFromCart } from '../../redux/actions/CartActions';
import TotalView from './TotalView';
import { post } from '../../utils/paytm';
import { payUsingPaytm } from '../../service/Api';


const useStyle = makeStyles(theme => ({
    component: {
        padding: '30px 135px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 0'
        }
    },
    leftComponent: {
        paddingRight: 15,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 15
        }
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    bottom: {
        padding: '16px 22px',
        background: '#fff',
        boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
        borderTop: '1px solid #f0f0f0'
    },
    placeOrder: {
        display: 'flex',
        marginLeft: 'auto',
        background: '#fb641b',
        color: '#fff',
        borderRadius: 2,
        width: 250,
        height: 51
    }
}));



const Cart = () => {

    const classes = useStyle();

    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        console.log(cartItems);
    });

    const dispatch = useDispatch();

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});  //  api call
            var information = {
                action: 'https://securegw-stage.paytm.in/order/process',
                params: response    
            }
            post(information);
        }

    return (
        <>
            {cartItems.length ?
                <Grid container className={classes.component}>
                    <Grid item lg={9} md={9} sm={12} xs={12} className={classes.leftComponent}>
                        <Box className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Cart ({cartItems?.length})</Typography>
                        </Box>

                        {
                            cartItems.map(item => (
                                <CartItem item={item} removeItemFromCart={removeItemFromCart} />
                            ))
                        }

                        <Box className={classes.bottom}>
                            <Button onClick={() => buyNow()} variant="contained" className={classes.placeOrder}>Place Order</Button>
                        </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <p> Total view</p>
                        <TotalView cartItems={cartItems} />
                    </Grid>
                </Grid> : <EmptyCart />
            }
        </>

    )
}

export default Cart;
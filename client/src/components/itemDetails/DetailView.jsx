import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import { useEffect } from "react";
import { Box, Typography,Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router";
import clsx from 'clsx'

import ProductDetails from "./ProductDetails";
import ActionItem from "./ActionItem";

const useStyle = makeStyles(theme=>({
    component: {
        marginTop: 55,
        background: '#F2F2F2'
    },
    container: {
        // margin: '0 80px',
        background: 'white',
        display: 'flex',
        [theme.breakpoints.down('md')]:{
            margin: 0
        }
    },
    rightContainer: {
        marginTop: 50,
        '& > *': {
            marginTop: 10
        }
    },
    price: {
        fontSize: 28
    },
    smallText: {
        fontSize: 14,
    },
    greyTextColor: {
        color: '#878787'
    }
}));


const data = { 
    id: '',
    url: '', 
    detailUrl: '',
    title: {
        shortTitle: '',
        longTitle: '',
    }, 
    price: {
        mrp: 0,
        cost: 0,
        discount: ''
    },
    description: '',
    discount: '', 
    tagline: '' 
};



const DetailView = () => {
    const classes = useStyle();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

    const { product } = useSelector((state) => state.getProductDetails);
    const id = useParams().id;
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getProductDetails(id))
        // dispatch(getProductDetails();
    }, [dispatch,id])


    return (
        <Box className={classes.component}>
            {product && Object.keys(product).length &&
                <Grid container className={classes.container}>

                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product}/>
                    </Grid>

                    <Grid item lg={8} md={8} sm={8} xs={12}className={classes.rightContainer}>
                        <Typography> {product.title.longTitle}</Typography>
                        <Typography className={clsx(classes.smallText, classes.greyTextColor)}> 
                        5 Ratings & 1 review
                        <span><img src={fassured} style={{width: 77, marginLeft: 20}} /></span>
                        </Typography>
                        <Typography>
                            <span className={classes.price}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                            <span className={classes.greyTextColor}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{color: '#388E3C'}}>{product.price.discount} off</span>
                            </Typography>
                            <ProductDetails product={product} />
                    </Grid>
                </Grid>
            }
        </Box>
    )
}

export default DetailView;
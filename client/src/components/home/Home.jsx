// components
import { Box, makeStyles } from '@material-ui/core';
import NavBar from "./NavBar";
import Banner from "./Banner";
import MidSection from "./MidSection";
import MidSlide from './MidSlide';
import Slide from "./Slide";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from "../../redux/actions/productActions";

const useStyles = makeStyles({
    components: {
        padding: 10,
        background: '#F2F2F2',                //  background of slides
    }
});


const Home = () => {
    const classes = useStyles();

    // calling the getProducts function which is 
    const { products } = useSelector(state => state.getProducts);

    const dispatch = useDispatch();

    // as soon as home component will mount, useEffect will be called and it will call the listProducts and get 
    // list products call the API and the data from DB 
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])



    return (
        <>
            <NavBar />
            <Box className={classes.components}>
                <Banner />
                <MidSlide products={products} />
                <MidSection />


                <Slide
                    data={products}
                    title='Suggested for You'
                    timer={false}
                    multi={true}
                />                            {/*   we can use many slides bcz it is reuseable */}
                <Slide
                    data={products}
                    title='Top Fashion Brands'
                    timer={false}
                    multi={true}
                />
                <Slide
                    data={products}
                    title='Recommended Items'
                    timer={false}
                    multi={true}
                />
            </Box>
        </>
    )
}

export default Home;
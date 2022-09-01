import Carousel from 'react-material-ui-carousel'
import { bannerData } from '../../constants/Data';
import { makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
    },
    image: {
        width: '100%',
        height: 280,                            //   when screen be large
        [theme.breakpoints.down('sm')]: {
            objectFit: 'cover',
            height: 180                         //  when screen be small
        }
    }
}))


const Banner = () => {
    const classes = useStyles();
    return (
        <Carousel 
        autoPlay={true}                             //  automaticly sliding pics
        animation='slide'
        indicators={false}
        navButtonsAlwaysVisible	= {true}
        cycleNavigation={true}
        navButtonsProps={{
            style:{
                background:'#ffffff',
                color: '#494949',
                borderRadius: 0,
                marginLeft: 0,
                height: 100
            }
        }}
        className={classes.carousel}
        >
            {
                bannerData.map(image => (
                    <img src={image} alt=""  className={classes.image}/>
                ))
            }
        </Carousel>
    )
}

export default Banner;
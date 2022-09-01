import { navData } from "../../constants/Data";
import {Box, Typography, makeStyles} from '@material-ui/core' 

const useStyles = makeStyles(theme => ({
    components:{
        display: 'flex',
        margin: '55px 130px 0 130px',
        justifyContent: 'space-between',
        overflowX: 'overlay',
        [theme.breakpoints.down('md')]: {           //  when screen size is less then medium then margine would be zero
            margin: 0
        }
    },
    container:{
        textAlign: 'center',
        padding:'12px 8px',
    },
    image:{
        width: 60
    },
    text:{
        fontSize: 14,
        fontWeight: 600
    }

}));


const NavBar =()=>{
    const classes = useStyles();
    return(
        <Box className={classes.components}>
            {
                navData.map(data=>(
                    <Box className={classes.container}>
                        <img src={data.url} alt=""  className={classes.image}/>
                        <Typography className={classes.text}>{data.text}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

export default NavBar;

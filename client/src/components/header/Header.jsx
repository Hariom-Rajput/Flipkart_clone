
import { AppBar, Toolbar, makeStyles, Typography, Box, withStyles, IconButton, Drawer, List, ListItem } from '@material-ui/core';          //  importing the AppBar from materioal ui
import { Link } from 'react-router-dom';
import { Menu } from '@material-ui/icons';
import { useState } from 'react';

//components
import SearchBar from './SearchBar';
import HeaderButtons from './HeaderButtons'
// if you want to add your on CSS, you have to override the The 'makeStyle' function 
const useStyles = makeStyles(theme=>({
    header: {
        background: '#2874f0',
        height: 55
    },
    logo: {
        width: 75
    },
    subURL: {                       //  css for the logo after the explore plus
        width: 10,
        marginLeft: 4,
        height: 12
    },
    container: {
        display: 'flex'             //  all components will be align in the same line
    },
    components: {
        marginLeft: '12%',
        lineHeight: 0,
        textDecoration: 'none',         //  remove the underline bello the 'explore plus;
        color: 'white'
    },
    subHeading: {                    //  css for 'explore plus'
        fontSize: 10,
        fontStyle: 'italic'
    },
    list: {
        width: 250
    },
    menuButton:{
        display: 'none',
        [theme.breakpoints.down('sm')]:{
            display: 'block',
        }
    },
    headerButtons:{
        margin: '0 5px 0 auto',
        [theme.breakpoints.down('sm')]:{
            display: 'none'
        }
    }

}));

// if you want to change the default CSS which is provided by the material UI,then you have to override the The CSS of'withStyle' function 
const ToolBar = withStyles({
    root: {
        minHeight: 55
    }
})(Toolbar);                    //  where we are going to apply

const Header = () => {
    const classes = useStyles();
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    

    const list = () => (
        <Box className={classes.list} onClick={handleClose} >
            <List>
                <ListItem>
                    <HeaderButtons />
                </ListItem>
            </List>
        </Box>
    )

    return (
        <AppBar className={classes.header}>

            {/* <Toolbar>                               default component of material-ui */}
            <ToolBar>                                   {/* overrided toolbar*/}

                <IconButton
                    color='inherit'
                    className={classes.menuButton}
                    onClick={handleOpen}
                >
                    <Menu />
                </IconButton>

                <Drawer open={open} onClose={handleClose} >
                    {list()}
                </Drawer>

                <Link to='/' className={classes.components}>
                    <img src={logoURL} alt="flipcart icon" className={classes.logo} />
                    <Box className={classes.container}>
                        <Typography className={classes.subHeading}>  Explore <Box component="span" style={{ color: "yellow" }}>Plus</Box></Typography>
                        <img src={subURL} alt="" className={classes.subURL} />
                    </Box>
                </Link>
                <SearchBar />
                <span className={classes.headerButtons}><HeaderButtons /></span>
            </ToolBar>
        </AppBar >
    )
}

export default Header;

/*

for changing the css i material UI we have to import 'makeStyles' from material ui.

Typography gives us a <p> tag
'Box' gives us a <div> tag


*/

import { Dialog, DialogContent, makeStyles, Box, Typography, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { authenticateSignup, authenticateLogin} from '../../service/Api';


const useStyle = makeStyles({
    component: {
        height: '70vh',
        width: '90vh',
    },
    image: {
        backgroundImage: `url(${'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'})`,
        height: '70vh',
        backgroundRepeat: ' no-repeat',
        background: '#2874f0',
        width: '40%',
        backgroundPosition: 'center 85%',
        padding: '45px 35px',
        '& > *': {
            fontWeight: 600,
            color: '#FFFFFF',
        }
    },
    login: {
        padding: '13px 35px ',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        '& > *': {
            marginTop: 20
        }

    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    loginbtn: {
        textTransform: 'none',
        color: 'white',
        background: '#FB641B',
        height: 48,
        borderRadius: 2,
        fontWeight: 600
    },
    reqbtn: {
        textTransform: 'none',
        color: '#2874F0',
        background: 'white',
        height: 48,
        borderRadius: 2,
        fontWeight: 600,
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    createText: {
        color: '#2874F0',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 'auto',
        fontWeight: 600,
        cursor: 'pointer'
    },
    error:{
        fontSize: 13,
        color : '#ff6161',
        fontWeight: 600,
        marginTop: 10,
        lineHeight: 0
    }

});

const initialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup:{
        view:'signup',
        heading: "Looks like you're new here! ",
        subHeading: 'Signup with your mobile number and get started'
    }
}

// when user enter his/her informations, it will store in this object
const signupInitialValues = {
    name: '',
    username:'',
    email:'',
    password:'',
    phone: ''
}

const loginInitialValues = {
    username: '',
    password:''
}

// first argument is normal argument and second argument is --> function i.e. setOpen
const Login = ({ open, setOpen, setAccount }) => {
    const classes = useStyle();

    const [account, toggleAccount] = useState(initialValues.login);
    const [signup, setSignup] = useState(signupInitialValues)
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');


    const handleClose = () => {
        setOpen(false);
        setError('');
        toggleAccount(initialValues.login);        //  closing the dialog box and simultaneously set state at-->  login 
    }

    // this is for toggle  the page of either login or signup
    const toggleUserAccount = () => {
        toggleAccount(initialValues.signup);
    }


    const toggleAccountLogin = () => {
        toggleAccount(initialValues.login);
    }

    const signupUser = async ()=>{
        let response = await authenticateSignup(signup);
        if(!response) return;

        // if successfull signup
        handleClose();
        setAccount(signup.username);
    }

    const userLogin = async ()=>{
        let response = await authenticateLogin(login);
        if(!response) {
            setError(true);
            return;
        }

        handleClose();
        setAccount(login.username);
    }

    
    const onInputChange =(e)=>{
        setSignup({ ...signup, [e.target.name]: e.target.value });
        console.log(signup);
    }

    const onValueChange =(e)=>{
        setLogin({ ...login, [e.target.name]: e.target.value})
        console.log(login);
    }

    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent className={classes.component}>
                <Box style={{ display: 'flex' }}>


                    {/* this is for image which is left side in the login box */}
                    <Box className={classes.image} >
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: '20px' }}>{account.subHeading}</Typography>
                    </Box>



                    {/* conditional rendering */}
                    {
                        account.view === 'login' ?
                            <Box className={classes.login}>
                                <TextField onChange={(e) => onValueChange(e)} name='username' label='Enter Email/Mobile number ' />
                                <TextField onChange={(e) => onValueChange(e)} name='password' label='Enter Password' type='password' /> 
                                {error &&  <Typography className={classes.error}>Invalid username or Password</Typography>}
                                <Typography className={classes.text}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Typography>
                                <Button variant="contained" onClick={()=>userLogin()} className={classes.loginbtn}>Login</Button>
                                <Typography style={{ textAlign: 'center', color: '#878787', fontSize: 13 }}>OR</Typography>
                                <Button variant="contained" className={classes.reqbtn}>Requests OTP</Button>
                                <Typography className={classes.createText} onClick={ () => toggleUserAccount() }>New to Flipkart? Create an account</Typography>
                            </Box> :
                            <Box className={classes.login}>
                                <TextField onChange={(e) => onInputChange(e)} name="name" label='Enter name ' />
                                <TextField onChange={(e) => onInputChange(e)} name="username" label='username ' />
                                <TextField onChange={(e) => onInputChange(e)} name="email" label='Email ' />
                                <TextField onChange={(e) => onInputChange(e)} name="password" label='Password ' />
                                <TextField onChange={(e) => onInputChange(e)} name="phone" label='Enter Phone number ' />
                                <Button variant="contained" className={classes.loginbtn} onClick={ () => signupUser()}>Signup</Button>
                                <Button variant="contained" className={classes.reqbtn} onClick={ () => toggleAccountLogin() }>Existing User? Login!</Button>
                            </Box>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default Login;


// label tag works as placeholder in material ui
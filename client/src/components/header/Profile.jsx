import { Typography, Menu, MenuItem, makeStyles } from "@material-ui/core";
import { useState } from "react";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyle = makeStyles({
    component: {
        marginTop: 40
    },
    logout: {
        marginLeft: 20,
        fontSize: 14
    }
});

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);        //  initially menu would be close

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    }

    /// when we logged out from the flipkart
    const logout = () => {
        setAccount('');
    }

    const classes = useStyle();

    return (
        <>
            <Typography onClick={handleClick} style={{ marginTop: 2, cursor: 'pointer' }}>{account}</Typography> 
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                className={classes.component}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
            >
                <MenuItem onClick={() => { handleClose(); logout(); }}>
                    <PowerSettingsNewIcon fontSize="small" color="primery" />
                    <Typography className={classes.logout}> Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Profile;
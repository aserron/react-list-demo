import React, {useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import Modal from "@material-ui/core/Modal";
// import SimpleModal from "../modal/SimpleModal";
// import FormDialog from "../modal/FormDialog";
// import Dialog from "@material-ui/core/Dialog";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import TextField from "@material-ui/core/TextField";
// import DialogActions from "@material-ui/core/DialogActions";
import {Container} from "@material-ui/core";
import AddUserButton from "../user/form/AddUserButton";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import AddIcon from '@material-ui/icons/Add';
import {Label} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function AppHeaderBar(props) {

    const classes = useStyles();

    const onAddUser = props.handleAddUser;

    console.debug('[AppHeaderBar] Render:', props);

    return (


        <AppBar position="static">


            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    User List
                </Typography>

                <AddUserButton handleAddUser={onAddUser}/>

            </Toolbar>

        </AppBar>

    );
}


export default React.memo(AppHeaderBar);
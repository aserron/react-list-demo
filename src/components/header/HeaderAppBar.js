import React from 'react';
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
import AddUserBtn from "./AddUserBtn";

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



export default function HeaderAppBar(props) {
    
    console.info('[HeaderAppBar] fn > props:',props);
    
    const classes = useStyles();

    return (

        <Container className={classes.root}>

            <AppBar position="static">


                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        User List
                    </Typography>

                    <AddUserBtn classes={classes} handleAddUser={props.handleAddUser} />

                </Toolbar>

            </AppBar>
        </Container>
    );
}
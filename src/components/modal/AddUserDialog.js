import React from "react";
import PropTypes from "prop-types";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";

import AddUserForm from "../form/AddUserForm";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root   : {
        
        flexGrow: 1
    },
    paper  : {
        
        height : 240,
        width  : 600,
        padding: theme.spacing(2),
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function AddUserDialog(props) {
    
    
    const {description, onCloseModal, openModal, title} = props;
    
    return (
      <Dialog
        open={openModal}
        onClose={onCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
        maxWidth="xl"
        fullWidth={true}
      >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
              
              {(description)
               ? <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
               : null
              }
              
              <AddUserForm onFormikSubmit={props.handleFormikSubmit}/>
              
          </DialogContent>
          
          {(false)
           ? (<DialogActions>
                <Button onClick={onCloseModal} color="primary">
                    Okay
                </Button>
            </DialogActions>)
           : null
          }
      
      </Dialog>
    )
}

AddUserDialog.propTypes = {
    description : PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    openModal   : PropTypes.bool.isRequired,
    title       : PropTypes.string.isRequired
};

export default AddUserDialog;

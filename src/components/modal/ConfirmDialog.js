import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import React from "react";

function ConfirmDialog(props) {
    
    const {handleClickOpen, handleClose} = props;
    
    return (
      <div>
          
          <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                  {"Success!!"}
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      User successfully added.
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose} autoFocus>Close</Button>
              </DialogActions>
          </Dialog>
      </div>
    );
}

export default ConfirmDialog;
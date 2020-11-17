import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));


const AddUserBtn = function(props) {
    
    const classes = useStyles();
    
    const defaultCb = (e) => {
        console.warn("[AddUserBtn]", "add user btn callback NOT present in props.", e)
    }
    
    // console.debug(classes);
    
    const handleAddUser = props.handleAddUser || defaultCb;
    
    return (
      <div className={classes.root}>
          <Button className     ="appbar-user-add"
                  data-testid   ="add-user-btn"
                  type="adduser"
                  variant="contained"
                  color="default"
                  onClick={handleAddUser}>
              
              Add New User
          </Button>
      </div>
    )
}

export default AddUserBtn;
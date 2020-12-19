import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const AddUserButton = function (props) {

    const classes = useStyles();

    const defaultCb = (e) => {
        console.warn("[AddUserButton]", "add user btn callback NOT present in props.", e)
    }

    // console.debug(classes);

    const handleAddUser = props.handleAddUser || defaultCb;

    return (
        <>
            <Button
                type="button"
                data-testid="add-user-btn"
                // type="adduser"
                variant="contained"
                color="default"

                className={classes.button}
                startIcon={<Icon>add</Icon>}

                onClick={handleAddUser}
            >
                <Typography variant="button" >
                    Add New User
                </Typography>

            </Button>
        </>
    )
}

export default AddUserButton;
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Container} from "@material-ui/core";
import * as PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";


function createData(id, first_name, last_name, email, birthday, phone) {
    return {id, first_name, last_name, email, birthday, phone};
}

const rows = [
    createData(
        {
            "id": 1,
            "first_name": "Brand",
            "last_name": "New",
            "email": "brand@columbia.edu",
            "birthday": "3/17/1979",
            "phone": "204-472-9613"
        })
]


const DATE_NOW = new Date(Date.now());

const getUserAge = (birthday) => {

    const now = DATE_NOW;

    if (!(birthday instanceof Date)) {
        birthday = new Date(birthday);
    }

    var diff = (birthday.getTime() - now.getTime()) / 1000;
    diff /= (60 * 60 * 24);

    return Math.abs(Math.floor(diff / 365.25));

}

const isAdult = (date) => {
    // console.warn ('date:',date);
    let res = getUserAge(date);
    // console.warn (res);
    return (res > 18);
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function UserTableRow(props) {


    // debug(handleClickUp);

    return <TableRow>
        <TableCell component="th" scope="row">
            {props.row.id}
        </TableCell>
        <TableCell align="left">{props.row.first_name}</TableCell>
        <TableCell align="left">{props.row.last_name}</TableCell>
        <TableCell align="left">{props.row.email}</TableCell>
        <TableCell align="left">{props.row.birthday}</TableCell>
        <TableCell align="left">{isAdult(props.row.birthday) ? "YES" : "NO"}</TableCell>
        <TableCell align="left">{props.row.phone}</TableCell>
        <TableCell align="left">
            <IconButton onClick={props.onClickUp} data-id={props.row.id}>UP</IconButton>
        </TableCell>
    </TableRow>;
}

UserTableRow.propTypes = {row: PropTypes.any};



export default function UserTable(props) {


    const classes = useStyles();

    const dense = false;

    const getUserById=(id)=>{

        console.info('getUserById',id);

        return props.data.findIndex(
            (item)=>{
                console.log(item.id,id,item.id===id,item);
                return (item.id === id);
            }
        )

    }

    /**
     *
     * @param {SyntheticBaseEvent} e
     */
    const handleClickUp = function (e){

        e.preventDefault();

        console.clear();

        console.info('handleClickUp',e);

        console.log('current',e.currentTarget);
        console.dir({
            event:e,
            currentTarget:e.currentTarget,
            id: e.currentTarget.dataset.id,
            dataset: e.currentTarget.dataset
        });

        const uid   = e.currentTarget.dataset.id;
        const index = getUserById(Number.parseInt( uid));

        console.warn('index for %s',uid,index);

        // with index copy list, change copy, setState

    }


    return (

        <TableContainer component={Paper}>
            <Table className={classes.table}
                   size={dense ? 'small' : 'medium'}
                   aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="left">Last Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Birthday</TableCell>
                        <TableCell align="left">+18</TableCell>
                        <TableCell align="left">Phone</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (props.data.length > 0) ? props.data.map(

                            (row) => (
                                <UserTableRow key={row.id} row={row}
                                              onClickUp={handleClickUp}/>
                            )

                        ) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>

    );
}
import React from 'react';
import PropTypes from 'prop-types';

import withStyles from "@material-ui/core/styles/withStyles";
import {Container} from "@material-ui/core";

import UserTable from "./components/user/UserTable/UserTable";
import HeaderAppBar from "./components/app/HeaderAppBar";
import AppHeaderBar from "./components/app/AppHeaderBar";
import ConfirmDialog from "./components/user/AddUserDialog/ConfirmDialog";
import AddUserDialog from "./components/user/AddUserDialog/AddUserDialog";


import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import AppFooter from "./components/app/AppFooter";


import axios from 'axios';


// temp theme style
const styles = theme => ({

        root: {
            margin: theme.spacing(3),
            width: 345,
        },
        tempFormCt: {
            background: 'red solid',
            alignContent: "stretch"
        },
        appUserTable: {

            marginBottom: theme.spacing(5),

        }
    }
);


class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            users: [],
            okOpen: false,
            formOpen: false,

        }

        // // bind handlers scope

        // formik
        this.handleFormikSubmit = this.handleFormikSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

        // confirm dialog
        this.handleOkOpen = this.handleOkOpen.bind(this);
        this.handleOkClose = this.handleOkClose.bind(this);

        // form dialog
        this.handleFormOpen = this.handleFormOpen.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);

        // debug
        this.testAdd = this.testAdd.bind(this);
        // this.handleFormSubmit   = this.handleFormSubmit.bind(this);

        console.debug("[App] constructor", {props: props, this: this});
    }

    //
    // REACT lifecyle methods..

    // here we should perform an ajax call instead we load dummy
    componentDidMount() {

        axios.get(`http://localhost:3000/data/users.json`)
            .then(res => {

                console.debug('[App] > componentDidMount > AXIOS get:', (res));

                const list = res.data;
                this.setState({users: list});



            })


        // old local data version
        // const list = [...this.props.users];
        // this.setState({users: list});

        const list = [...this.props.users];
        // console.clear();
        console.debug('[App] > componentDidMount loading list:', (list));
    }

    // // EO lifecyle methods

    //
    // User List Methods


    createUser() {
        const baseUser = {
            "id": this.state.users.length + 1,
            "first_name": "Brand",
            "last_name": "New",
            "email": "brand@columbia.edu",
            "birthday": "3/17/1979",
            "phone": "204-472-9613"
        };

        return Object.assign({}, baseUser);
    }

    /**
     * Add a new user to the users list.
     * @param user
     */
    addUser(user) {

        console.debug('[App] addUser', user);

        let list;

        user = user || this.createUser();
        list = [...this.state.users, user];

        this.setState((state, props) => ({
            users: list
        }));
    }

    // event handlers
    handleOnChange(e) {
        console.info("[AppNews.js].handleOnChange", e);
    }

    handleClearGrid() {
        // Correcto
        this.setState((state, props) => ({
            users: []
        }));
    }

    // FORMIK METHODS
    /**
     * App handles Formik Form submit event.
     * @param values
     * @returns {Promise<void>}
     */
    async handleFormikSubmit(values) {

        // console.log("_");
        // console.debug("[App.js] handleFormikSubmit ", values);
        // console.log(">> submit : begin");


        // submit completed ok, close form, process and forward.
        console.log(">> submit : completed;", "\\n");

        this.setFormOpen(false);

        // fix date for list format.
        let dt = values.birthday;
        let fixed = [dt.getMonth(), dt.getDate(), dt.getFullYear()].join('/');
        values.birthday = fixed;

        // forward action.
        this.handleFormSubmit(values);

    }


    // OK DIALOG
    setOkOpen(isOpen) {
        this.setState({okOpen: isOpen});
    }

    handleOkOpen() {
        this.setState({okOpen: true});
    };

    handleOkClose() {
        this.setState({okOpen: false});
    };


    // Form Dialog
    setFormOpen(isOpen) {
        this.setState({formOpen: isOpen});
    }

    handleFormOpen(e) {
        this.setState({formOpen: true});
    };

    handleFormClose() {
        this.setState({formOpen: false});
    };

    /**
     * App handles success submit, perform add user.
     * @param values
     */
    handleFormSubmit(values) {

        console.info("[App] handleFormSubmit", {values: values, scope: this});

        let user;
        user = this.createUser();
        user = Object.assign(user, values)
        this.addUser(user);


        // after adding UI feedback
        this.setOkOpen(true);

        // close modal after 2s.
        (new Promise((r) => setTimeout(r, 2000)))
            .then(
                () => {
                    this.setOkOpen(false);
                }
            );

    }

    // Debug Methods
    testAdd(e) {

        // console.clear();
        console.info('[App.js] handleTestAdd', e);
        // trying to add a user hardcoded

        const newUser = this.createUser();

        let newList;
        newList = this.state.users.slice();
        newList.push(newUser);


        // Correcto
        this.setState((state, props) => ({
            users: newList
        }));

        console.log("New resulting state", this.state);
    }

    // Component Render
    render() {

        const {classes} = this.props;


        console.debug("[App]", ' render:', {
            "state.users": this.state.users,
            "props.users": this.props.users
        });

        return (

            <ThemeProvider theme={theme}>

                <CssBaseline/>

                <Container>

                    <HeaderAppBar/>


                    <AppHeaderBar handleAddUser={this.handleFormOpen}/>


                    <Container component="main" disableGutters={true} className={classes.appUserTable}>
                        <UserTable data={this.state.users}/>

                    </Container>


                    <AppFooter onAddUser={this.handleFormOpen}/>

                </Container>


                <ConfirmDialog open={this.state.okOpen}
                               handleClickOpen={this.handleOkOpen}
                               handleClose={this.handleOkClose}/>


                <AddUserDialog openModal={this.state.formOpen}
                               onCloseModal={this.handleFormClose}

                               handleFormikSubmit={this.handleFormikSubmit}

                               title='Add User'
                               description=''
                />


            </ThemeProvider>

        );

    }
}

/*
 
 <
 */

App.propTypes = {
    users: PropTypes.array
};

export default withStyles(styles)(App);


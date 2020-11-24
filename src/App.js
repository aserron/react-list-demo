import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {Container} from "@material-ui/core";

import UserTable from "./components/user/UserTable";
import HeaderAppBar from "./components/header/HeaderAppBar";
import ConfirmDialog from "./components/modal/ConfirmDialog";
import AddUserDialog from "./components/modal/AddUserDialog";

const styles = theme => ({
    tempFormCt: {
        background  : 'red solid',
        alignContent: "stretch"
    }
});

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            users   : [],
            okOpen  : false,
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

        console.debug("[App] constructor", {props:props,this: this});
    }

    // lifecyle methods..

    // here we should perform an ajax call instead we load dummy
    componentDidMount() {



        const list = [...this.props.users];

        this.setState({users: list});

        // console.clear();
        console.debug('[App] > componentDidMount loading list:', (list));

    }

    // eo lifecyle


    // User List Methods
    createUser() {
        const baseUser = {
            "id"        : this.state.users.length + 1,
            "first_name": "Brand",
            "last_name" : "New",
            "email"     : "brand@columbia.edu",
            "birthday"  : "3/17/1979",
            "phone"     : "204-472-9613"
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
        let dt      = values.birthday;
        let fixed = [dt.getMonth(),dt.getDate(),dt.getFullYear()].join('/');
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
        user     = this.createUser();
        user     = Object.assign(user, values)
        this.addUser(user);


        // after adding UI feedback
        this.setOkOpen(true);

        // close modal after 2s.
        (new Promise((r) => setTimeout(r, 2000)))
            .then(
                () =>{this.setOkOpen(false);}
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

        console.debug("[App]",' render:', {
            "state.users": this.state.users,
            "props.users": this.props.users
        });

        return (
            <div className={styles.root}>

                <Container component="header">
                    <HeaderAppBar handleAddUser={this.handleFormOpen}/>
                </Container>


                <Container component="main">

                    <UserTable data={this.state.users}/>
                </Container>


                <Container component="footer" style={{padding: 20}}>
                    <Container><h3>Welcome user!</h3></Container>
                </Container>


                <ConfirmDialog open={this.state.okOpen}
                               handleClickOpen={this.handleOkOpen}
                               handleClose={this.handleOkClose}/>


                <AddUserDialog openModal={this.state.formOpen}
                               onCloseModal={this.handleFormClose}

                               handleFormikSubmit={this.handleFormikSubmit}

                               title          ='Add User'
                               description    =''
                />


            </div>
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


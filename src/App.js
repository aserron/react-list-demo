import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {Button, Container, Grid, Paper} from "@material-ui/core";

import UserTable from "./components/user/UserTable";
import HeaderAppBar from "./components/header/HeaderAppBar";
import AddUserForm from "./components/form/AddUserForm";
import ConfirmDialog from "./components/modal/ConfirmDialog";
import AddUserDialog from "./components/modal/AddUserDialog";

/*
 * Update State
 * // Correcto
 *
 this.setState((state, props) => ({
 counter: state.counter + props.increment
 }));
 */

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
            okOpen  : false,
            formOpen: false,
            users   : [],
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
        
        console.info('[App.js] constructor', props, this);
    }
    
    // life cyle methods
    
    // willMount, etc
    componentDidMount() {
        
        const list = Array.from(this.props.users || []);
        
        this.setState({users: list});
        
        // console.clear();
        console.info('[App.js] componentDidMount loading list:', (list));
        
    }
    
    // eo lifecyle


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
    
    
    // User Methods
    
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
    
    addUser(user) {
        
        user = user || this.createUser();
        
        console.info('[App.js] addUser', user);
        
        let newList;
        newList = this.state.users.slice();
        newList.push(user);
        
        this.setState((state, props) => ({
            users: newList
        }));
    }
    
    
    // FORMIK METHODS
    async handleFormikSubmit(values) {
        console.log("_");
        console.info("[App.js] handleFormikSubmit ", values);
        console.log(">> submit : begin");
    
    
        // fix date
       
        
        this.setOkOpen(true);
        await new Promise((r) => setTimeout(r, 4000));
        console.log(">> submit : completed;", "\\n");
        this.setOkOpen(false);
        this.setFormOpen(false);
    
    
        // let dt = new Date();
        let dt      = values.birthday;
        let fixed = [dt.getMonth(),dt.getDate(),dt.getFullYear()].join('/');
        values.birthday = fixed;
        this.handleTestSubmit(values);
    
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
        console.info('[App.js] handleFormOpen:', {
            scope: this,
            event: e
        });
        this.setState({formOpen: true});
    };
    
    handleFormClose() {
        this.setState({formOpen: false});
    };
    
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
    
    
    handleTestSubmit(values) {
        console.warn("[App.js] handleTestSubmit", {values: values, scope: this});
        
        let user = this.createUser();
        user = Object.assign(user, values)
        this.addUser(user);
    }
    
    
    
    // Component Render
    render() {
        
        
        const DebugFooter = (props) => {
            return (
              <Container>
                  <Grid container spacing={4} style={{
                      width       : 'auto',
                      alignItems  : 'stretch',
                      alignContent: 'space-around',
                      justify     : 'space-around'
                  }}>
                      <Grid item xs={12}>
                          <Grid container spacing={2}>
                              <Grid key="1" item>
                                  <Paper className={styles.paper}>
                                      <h3>debug forced input</h3>
                                      <form onSubmit={this.handleFormikSubmit}
                                      >
                                          <input type="text" name="first_name" required/>
                                          <br/>
                                          <div className="wrapper">
                                              <Button type="submit">Submit</Button>
                                              <Button type="button" onClick={() => {
                                                  console.clear();
                                                  // console.info("Cleared Form");
                                              }}>clear[cns]
                                              </Button>
                                          </div>
                                      </form>
                                  </Paper>
                              </Grid>
                              <Grid key="2" item>
                                  <Paper className={styles.paper}>
                                      <h3>debug list</h3>
                                      <Button onClick={this.testAdd} variant='contained'>Add Test</Button>
                                      <Button onClick={this.handleClearGrid.bind(this)} variant='contained'>Clear
                                          Grid</Button>
                                      <Container>
                                          <h2>Test List</h2>
                                          <ul>
                                              {users.map((item, i, arr) => {
                                                  // console.log({id:item.id, item:item,index:i});
                                                  return (
                                                    <li key={item.id}>`{item.id} - {item.first_name} `</li>
                                                  )
                                              })}
                                          </ul>
                                      </Container>
                                  </Paper>
                              </Grid>
                              
                              <Grid key="3" item>
                                  <Paper className={styles.paper}>
                                      <h3>debug form</h3>
                                      <Container>
                                          <AddUserForm/>
                                      </Container>
                                  </Paper>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              
              </Container>
            )
        }
        
        const users = this.state.users;
        
        console.info('[App.js] render:', {
            "state.users": this.state.users,
            "props.users": this.props.users
        });
        
        
        return (
          <div className={styles.root}>
    
              <Container component="header">
                  <HeaderAppBar handleAddUser={this.handleFormOpen}/>
              </Container>
    
    
              <Container component="main">
                  <UserTable data={users}/>
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


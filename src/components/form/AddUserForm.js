import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import {Field, Form, Formik, FormikBag, FormikValues, FormikConfig} from 'formik';

import {TextField} from 'formik-material-ui';
import Button from "@material-ui/core/Button";
import {FormControl} from "@material-ui/core";

import {DatePicker,} from 'formik-material-ui-pickers';

import {MuiPickersUtilsProvider} from '@material-ui/pickers';

// Depending on the library you picked
import DateFnsUtils from '@date-io/date-fns';


// components
import PhoneInput from "./PhoneInput";


// helpers
const useStyles = makeStyles((theme) => ({

    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        width: 400,
        minWidth: 220,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },

}))

// class
const AddUserForm = (props) => {

    const classes = useStyles();

    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));


    /**
     * @type FormikConfig
     */
    const formikConfig = {

        initialValues: {
            first_name: 'Mark',
            last_name: 'Konig',
            email: 'andy@rotar.com',
            birthday: new Date(),
            phone: '049 334 034'
        },
        onSubmit: async (values, formikBag) => {

            // formikBag.setSubmitting(true);

            console.log("[AddUserForm] onSubmit: simulate external action. (2s wait)");

            await wait(2 * 1000);

            console.log("[AddUserForm] onSubmit: submit success, call parent callback");

            formikBag.setSubmitting(false);
            props.onFormikSubmit(values, formikBag);

        }
    }


    console.debug("[AddUserForm] Render", props);

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <Formik {...formikConfig} >

                    {(formProps) => {

                        return (
                            <Form className={classes.form}>


                                <FormControl className={classes.formControl}>
                                    <Field name="first_name"
                                           label="First Name"
                                           placeholder="Jane"
                                           component={TextField}
                                           required
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <Field name="last_name"
                                           label="Last Name"
                                           placeholder="Doe"
                                           component={TextField}
                                           required
                                    />
                                </FormControl>


                                <FormControl className={classes.formControl}>
                                    <Field name="email"
                                           type="email"
                                           label="Email"
                                           component={TextField}
                                           required
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <Field name="birthday"
                                           label="Date"
                                           format="MM/dd/yyyy"

                                           component={DatePicker}
                                           required
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <Field name="phone" component={PhoneInput} required/>
                                </FormControl>


                                <FormControl className={classes.formControl}>
                                    <Button type="submit"
                                            disabled={formProps.isSubmitting}
                                    >Submit</Button>
                                </FormControl>
                            </Form>
                        )


                    }
                    }
                </Formik>
            </MuiPickersUtilsProvider>
        </>
    )

};


export default AddUserForm;
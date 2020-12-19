import {
    TimePicker,
    DatePicker,
    DateTimePicker,
} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MuiTextField from "@material-ui/core/TextField";
import {fieldToTextField} from "formik-material-ui";
import React from "react";

/**
 *
 * @param {TextFieldProps} props
 * @returns {JSX.Element}
 * @constructor
 */
function DateField(props) {
    
    const {
              form : {setFieldValue},
              field: {name},
          } = props;
    
    const override = {
        inputProps: {
            label      : "Date",
            // placeholder: "555-555-555",
            type   : 'date'
            
        }
    }
    const newProps = Object.assign({}, props, override);
    
    // jsx
    return <MuiTextField {...fieldToTextField(newProps)} />;
}

export default DateField;
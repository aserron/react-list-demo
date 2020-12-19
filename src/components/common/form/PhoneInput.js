import MuiTextField from "@material-ui/core/TextField";
import {fieldToTextField} from "formik-material-ui";
import React from "react";

/**
 *
 * @param {TextFieldProps} props
 * @returns {JSX.Element}
 * @constructor
 */
function PhoneInput(props) {
    
    const {
              form : {setFieldValue},
              field: {name},
          } = props;
    
    const override = {
        inputProps: {
            label      : "Phone",
            placeholder: "555-555-555",
            
            type        : 'tel',
            pattern     : "[0-9]{3}[-\\s]*[0-9]{3}[-\\s]*[0-9]{3}"
        }
    }
    const newProps = Object.assign({}, props, override);
    
    // jsx
    return <MuiTextField {...fieldToTextField(newProps)} />;
}

export default PhoneInput;
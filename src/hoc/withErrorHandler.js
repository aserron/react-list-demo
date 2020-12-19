import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ModalDialog} from "@material-ui/pickers/_shared/ModalDialog";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error:null})
            })

            axios.interceptors.response.use(null, error => {
                this.setState({error:error})
            })
        }


        render() {
            return (
                <>
                    <ModalDialog onAccept={}
                                 onDismiss={}
                                 onClear={}>

                    </ModalDialog>
                    
                </>
            )
        }
    }

}
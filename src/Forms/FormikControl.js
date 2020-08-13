import React from 'react'
import ChakraInput from './ChakraInput';

function FormikControl(props) {
    const { control, ...rest } = props;
    switch (control) {
        case 'chakraInput': return <ChakraInput {...rest} />
        default:
            return null;
    }
}

export default FormikControl

import React from 'react'
import { Field } from 'formik';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from "@chakra-ui/core";

function ChakraInput(props) {
    const { name, label, ...rest } = props;
    return (
        <>
            <Field name={name}>
                {
                    ({ form, field }) => {
                        return (
                            <FormControl
                                mt="5"
                                isRequired
                                isInvalid={form.errors[name] && form.touched[name]}
                            >
                                <FormLabel htmlFor={label}>
                                    {label}
                                </FormLabel>
                                <Input
                                    size="sm"
                                    mt="0"
                                    autoComplete="off"
                                    borderColor="#63b7af"
                                    focusBorderColor="#63b7af"
                                    id={name}
                                    {...rest}
                                    {...field}
                                />
                                <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                            </FormControl>
                        )
                    }
                }
            </Field>
        </>
    )
}

export default ChakraInput

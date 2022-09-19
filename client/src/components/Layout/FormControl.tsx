import { FC } from 'react';

// Material UI
import {
    FormControl as InputControl,
} from "@mui/material";

// Models
import { FormControlProps } from '../../models/Layout/FormControlProps';

const FormControl: FC<FormControlProps> = ({ children, className, margin }) => {
    return (
        <InputControl className={`${className} ${margin || ""}`}>
            {children}
        </InputControl>
    )
}

export default FormControl;
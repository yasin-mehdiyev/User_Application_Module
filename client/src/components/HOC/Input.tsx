import { FC } from 'react';

// Material UI
import {
    TextField,
} from "@mui/material";

// Models
import { InputProps } from '../../models/HOC/InputProps';

const Input: FC<InputProps> = ({ label, name, multiline, formik }) => {
    return (
        <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            name={name}
            label={label}
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.[name]}
            error={(formik?.touched?.[name] && Boolean(formik?.errors?.[name]))}
            helperText={(formik?.touched?.[name] && formik?.errors?.[name])}
            rows={6}
            multiline={multiline ? true : false}
        />
    )
}

export default Input;
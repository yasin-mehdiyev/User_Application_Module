import { FC } from 'react';

// Material UI
import {
    TextField,
} from "@mui/material";

// Models
import { DateProps } from '../../models/HOC/DateProps';

const Date: FC<DateProps> = ({ label, name, formik }) => {
    return (
        <TextField
            id="date"
            label={label}
            type="date"
            name={name}
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.[name]}
            error={(formik?.touched?.[name] && Boolean(formik?.errors?.[name]))}
            helperText={(formik?.touched?.[name] && formik?.errors?.[name])}
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}

export default Date;
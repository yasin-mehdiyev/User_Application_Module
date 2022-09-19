import { FC, Fragment } from 'react';

// Material UI
import {
    Select as SelectField,
    InputLabel,
    MenuItem,
    FormHelperText
} from "@mui/material";

// Models
import { SelectProps } from '../../models/HOC/SelectProps';

const Select: FC<SelectProps> = ({ label, name, data, formik }) => {
    return (
        <Fragment>
            <InputLabel id="demo-simple-select-label" style={(formik?.touched?.[name] && formik?.errors?.[name]) ? { color: '#d32f2f' } : undefined}>{label}</InputLabel>
            <SelectField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name={name}
                label={label}
                onBlur={formik?.handleBlur}
                onChange={formik?.handleChange}
                value={formik?.values?.[name]}
                error={(formik?.touched?.[name] && Boolean(formik?.errors?.[name]))}
            >
                {
                    data && data.length && (
                        data.map((item, index) => (
                            <MenuItem key={index} value={item?.status}>{item?.name}</MenuItem>
                        ))
                    )
                }
            </SelectField>
            <FormHelperText style={{ color: "#d32f2f" }}>
                {(formik?.touched?.[name] && formik?.errors?.[name])}
            </FormHelperText>
        </Fragment>
    )
}

export default Select;
import { FC, useEffect, useState } from 'react';

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// React_Router_DOM
import { useNavigate } from 'react-router-dom';

// Components
import Row from '../../Layout/Row';
import Col from '../../Layout/Col';
import FormControl from '../../Layout/FormControl';
import Input from '../../HOC/Input';
import DateField from '../../HOC/Date';
import Select from '../../HOC/Select';

// Services
import * as userService from '../../../services/UserService';

// Models
import { AddEditProps } from '../../../models/Modules/User/AddEditProps';

// Material UI
import {
    Button as MaterialButton,
} from "@mui/material";

// Form.module.css
import classes from "../../../styles/HOC/Form/Form.module.css";

// HELPERS
import { CASES, GENDER } from '../../../helpers/constants';
import { OPERATIONS } from '../../../helpers/enums';

// Sweetalert
import swal from "sweetalert";

const AddEdit: FC<AddEditProps> = ({ type, id, user }) => {

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(5, "Too small")
            .max(15, "Too large")
            .required("Please the enter your name"),
        surname: Yup.string()
            .min(5, "Too small")
            .max(20, "Too large")
            .required("Please the enter your surname"),
        birthDate: Yup.date()
            .min(new Date("1970-01-01").toUTCString())
            .max(new Date().toUTCString())
            .required("Please the enter your birthDate"),
        gender: Yup.string()
            .required("Please the enter your gender"),
        profession: Yup.string()
            .min(10, "Too small")
            .max(20, "Too large")
            .required("Please the enter your profession"),
        isActive: Yup.boolean()
            .required("Please the enter user status"),
        biography: Yup.string()
            .min(20, "Too small")
            .max(200, "Too large")
            .required("Please the enter your biography"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            birthDate: "",
            gender: "",
            profession: "",
            isActive: "",
            biography: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values: any) => {
            const shouldAddEdit = await swal({
                title: "Are you sure?",
                text: `${values.name} ${values.surname} user will be deleted`,
                icon: "warning",
                buttons: ['Cancel', 'Ok'],
                dangerMode: true,
            });

            if (shouldAddEdit) {
                let response: any = {};
                if (type === OPERATIONS.ADD) {
                    const { data } = await userService.createUser(values);
                    const { success, message } = data;
                    response["success"] = success;
                    response["message"] = message;
                } else {
                    const { data } = await userService.updateUser(id || "", values);
                    const { success, message } = data;
                    response["success"] = success;
                    response["message"] = message;
                }

                const { success, message } = response;
                if (success) {
                    swal({
                        title: "Congratulations",
                        text: `${values.name} ${values.surname} ${message}`,
                        icon: "success"
                    }).then(function () {
                        navigate("/");
                    });
                } else {
                    swal("Error!", message, "error");
                }
            }
        },
    });

    const [disabled, setDisabled] = useState<boolean>(false);

    const insertOperationValidate = (formik: any): void => {
        if (
            Object.entries(formik?.touched).length !== 0 &&
            Object.entries(formik?.errors).length === 0
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const updateOperationValidate = (formik: any): void => {
        let isDisabled = false;
        if (Object.entries(formik.touched).length === 0) {
            for (const item of Object.values(formik.values)) {
                if (item === "") {
                    isDisabled = true;
                    break;
                }
            }

            if (!isDisabled) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        } else {
            insertOperationValidate(formik);
        }
    };

    useEffect(() => {
        if (user && user.success) {
            const { data } = user;
            const { name, surname, birthDate, gender, profession, isActive, biography } = data;
            formik.setFieldValue("name", name);
            formik.setFieldValue("surname", surname);
            formik.setFieldValue("birthDate", birthDate);
            formik.setFieldValue("gender", gender);
            formik.setFieldValue("profession", profession);
            formik.setFieldValue("isActive", isActive);
            formik.setFieldValue("biography", biography);
        }
    }, []);

    useEffect(() => {
        if (type === OPERATIONS.ADD) {
            insertOperationValidate(formik);
        } else {
            updateOperationValidate(formik);
        }
    }, [formik]);

    return (
        <form className={classes.form_wrapper} onSubmit={formik.handleSubmit}>
            <Row>
                <Col device={"md"} size={6} textCenter={true}>
                    <FormControl className={classes.form_control}>
                        <Input label="Name" name="name" formik={formik} />
                    </FormControl>
                </Col>
                <Col device={"md"} size={6}>
                    <FormControl className={classes.form_control}>
                        <Input label="Surname" name="surname" formik={formik} />
                    </FormControl>
                </Col>
                <Col device={"md"} size={6} textCenter={true}>
                    <FormControl className={classes.form_control}>
                        <DateField label="Date of birth" name="birthDate" formik={formik} />
                    </FormControl>
                </Col>
                <Col device={"md"} size={6}>
                    <FormControl className={classes.form_control}>
                        <Select label="Gender" data={GENDER} name="gender" formik={formik} />
                    </FormControl>
                </Col>
                <Col device={"md"} size={6} textCenter={true}>
                    <FormControl className={classes.form_control}>
                        <Input label="Profession" name="profession" formik={formik} />
                    </FormControl>
                </Col>
                <Col device={"md"} size={6}>
                    <FormControl className={classes.form_control}>
                        <Select label="User status" data={CASES} name="isActive" formik={formik} />
                    </FormControl>
                </Col>
                <Col device={"md"} size={6} textCenter={true}>
                    <FormControl className={classes.form_control}>
                        <Input label="Biography" multiline={true} name="biography" formik={formik} />
                    </FormControl>
                </Col>
                <Col device={"md"} size={12} textCenter={true}>
                    <MaterialButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={disabled}
                        className={classes.materialButton}
                    >
                        {type === OPERATIONS.ADD ? "Create" : "Update"}
                    </MaterialButton>
                </Col>
            </Row>
        </form>
    )
}

export default AddEdit;
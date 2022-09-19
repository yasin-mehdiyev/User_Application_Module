import { FC, Fragment, useEffect, useState } from "react";

// React_Router_DOM
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, fetchUsers, removeUser } from "../../../store/feature/user/userAction";
import { selectUsers } from "../../../store/feature/user/userSlice";

// Components
import Col from "../../../components/Layout/Col";
import Container from "../../../components/Layout/Container";
import Row from "../../../components/Layout/Row";
import Table from "../../../components/HOC/Table";
import HeaderAction from "../../../components/Modules/Header/HeaderAction";
import HeaderText from "../../../components/Modules/Header/HeaderText";
import Loader from "../../../components/Modules/Loader/index";

// Common.module.css
import classes from "../../../styles/Modules/Common/Common.module.css";

// Sweetalert package
import swal from 'sweetalert';

const Index: FC = () => {

    const dispatch = useDispatch<any>();
    const users: any = useSelector(selectUsers);
    const navigate: any = useNavigate();

    const [loader, setLoader] = useState<boolean>(true);

    useEffect(() => {
        try {
            setLoader(true);
            dispatch(fetchUsers());
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setTimeout(() => {
                setLoader(false);
            }, 2000);
        }
    }, [dispatch]);

    const handleUpdateUser = async (e: { stopPropagation: () => void; }, id: string) => {
        e.stopPropagation();
        await dispatch(fetchUserById(id));
        navigate(`/edit/${id}`);
    };

    const handleDetailUser = async (id: string) => {
        await dispatch(fetchUserById(id));
        navigate(`/detail/${id}`);
    };

    const handleRemove = async (e: { stopPropagation: () => void; }, id: string, item: any) => {
        e.stopPropagation();
        const shouldDelete = await swal({
            title: "Are you sure?",
            text: `${item.name} ${item.surname} user will be deleted`,
            icon: "warning",
            buttons: ['Cancel', 'Ok'],
            dangerMode: true,
        });

        if (shouldDelete) {
            const { data } = await dispatch(removeUser(id));
            const { success, message } = data;

            if (success) {
                swal("Congratulations", `${item.name} ${item.surname} user has been deleted`, "success");
                dispatch(fetchUsers());
            } else {
                swal("Error!", message, "error");
            }
        }
    };

    return (
        <Fragment>
            {
                loader ? <Loader /> : (
                    <section>
                        <Container>
                            <Row>
                                <Col device={"md"} size={12}>
                                    <HeaderText title="User List" />
                                </Col>
                                <Col device={"md"} size={12}>
                                    <HeaderAction moreButton={false} backButton={false} addButton={true} />
                                </Col>

                                <Col device={"md"} size={12}>
                                    {
                                        users && users.success && users.data && users.data.length ? (
                                            <Table data={users.data} handleRemove={handleRemove} handleDetailUser={handleDetailUser} handleUpdateUser={handleUpdateUser} />
                                        ) : <p className={classes.noData}>It doesn't exist any data</p>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </section>
                )
            }
        </Fragment >
    )
}

export default Index;
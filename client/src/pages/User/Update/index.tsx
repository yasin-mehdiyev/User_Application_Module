import { FC, Fragment, useEffect, useState } from 'react';

// React_Router_Dom
import { useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectUserById } from '../../../store/feature/user/userSlice';
import { fetchUserById } from '../../../store/feature/user/userAction';

// Components
import Container from '../../../components/Layout/Container';
import Row from '../../../components/Layout/Row';
import Col from '../../../components/Layout/Col';
import Loader from "../../../components/Modules/Loader/index";
import HeaderAction from '../../../components/Modules/Header/HeaderAction';
import HeaderText from '../../../components/Modules/Header/HeaderText';
import AddEdit from '../../../components/Modules/User/AddEdit';

// Common.module.css
import classes from "../../../styles/Modules/Common/Common.module.css";

const Index: FC = () => {

    const dispatch: any = useDispatch();
    const { id }: any = useParams();
    const user: any = useSelector(selectUserById);

    const [loader, setLoader] = useState<boolean>(true);

    useEffect(() => {
        try {
            setLoader(true);
            dispatch(fetchUserById(id));
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setTimeout(() => {
                setLoader(false);
            }, 1500);
        }
    }, [dispatch, id]);


    return (
        <Fragment>
            {
                loader ? <Loader /> : (
                    <section>
                        <Container>
                            <Row>
                                <Col device={"md"} size={12}>
                                    <HeaderText title="Update User" />
                                </Col>
                                <Col device={"md"} size={12}>
                                    <HeaderAction moreButton={false} backButton={true} addButton={false} />
                                </Col>
                                <Col device={"md"} size={12}>
                                    {
                                        Object.keys(user).length > 0 ? (
                                            <AddEdit type="edit" id={id} user={user} />
                                        ) : (
                                            <p className={classes.noData}>It doesn't exist any data</p>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </section>
                )
            }
        </Fragment>
    )
}

export default Index;
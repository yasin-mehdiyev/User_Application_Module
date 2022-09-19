import { FC, Fragment, useEffect, useState } from 'react';

// React_Router_DOM
import { useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../../store/feature/user/userAction';
import { selectUserById } from '../../../store/feature/user/userSlice';

// Components
import Container from '../../../components/Layout/Container';
import Row from '../../../components/Layout/Row';
import Col from '../../../components/Layout/Col';
import Loader from "../../../components/Modules/Loader/index";
import HeaderText from '../../../components/Modules/Header/HeaderText';
import HeaderAction from '../../../components/Modules/Header/HeaderAction';
import Detail from '../../../components/Modules/User/Detail';

// Common.module.css
import classes from "../../../styles/Modules/Common/Common.module.css";

const Index: FC = () => {

    const { id }: any = useParams();
    const dispatch = useDispatch<any>();
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
            }, 2000);
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
                                    <HeaderText title="User Detail" />
                                </Col>
                                <Col device={"md"} size={12}>
                                    <HeaderAction moreButton={false} backButton={true} addButton={false} />
                                </Col>
                                <Col device={"md"} size={12}>
                                    {
                                        Object.keys(user).length > 0 ? <Detail user={user} /> : <p className={classes.noData}>It doesn't exist any data</p>
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
import { FC, Fragment, useEffect, useState } from 'react';

// Components
import Container from '../../../components/Layout/Container';
import Row from '../../../components/Layout/Row';
import Col from '../../../components/Layout/Col';
import Loader from "../../../components/Modules/Loader/index";
import HeaderAction from '../../../components/Modules/Header/HeaderAction';
import HeaderText from '../../../components/Modules/Header/HeaderText';
import AddEdit from '../../../components/Modules/User/AddEdit';

const Index: FC = () => {

    const [loader, setLoader] = useState<boolean>(true);

    useEffect(() => {
        try {
            setLoader(true);
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setTimeout(() => {
                setLoader(false);
            }, 1500);
        }
    }, []);

    return (
        <Fragment>
            {
                loader ? <Loader /> : (
                    <section>
                        <Container>
                            <Row>
                                <Col device={"md"} size={12}>
                                    <HeaderText title="Create User" />
                                </Col>
                                <Col device={"md"} size={12}>
                                    <HeaderAction moreButton={false} backButton={true} addButton={false} />
                                </Col>
                                <Col device={"md"} size={12}>
                                    <AddEdit type="add" />
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
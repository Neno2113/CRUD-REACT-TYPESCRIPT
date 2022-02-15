import { Route, Routes } from 'react-router-dom';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { Row, Col, Divider,  } from 'antd';
import { LoginPage } from '../pages/auth/LoginPage';


export const AuthRouter = () => {
    return (
        <>
            <Divider orientation="left" style={{ marginTop: '30px'}}>Auth Page</Divider>
            <Row justify='center' align='middle' style={{ marginTop: '70px'}}>
                <Col span={17} >
                    <Routes>
                        <Route path="/" element={ < LoginPage />} />
                        <Route path="/login" element={ < LoginPage />} />
                        <Route path="/register" element={ < RegisterPage />} />
                        
                    </Routes>
                </Col>
            </Row>
        </>
    )

};

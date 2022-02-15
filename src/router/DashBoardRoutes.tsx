import {
    Routes,
    Route
  } from "react-router-dom";
import { Layout,  } from 'antd';
import { BreadCrumbPage, FooterPage, FormPage, HeaderPage, ListBooks } from "../pages";

const { Content,  Sider } = Layout;



export const DashBoardRoutes = () => {
  return (
    <Layout>
        <HeaderPage />
        <Content style={{ padding: '0 50px' }}>
            <BreadCrumbPage />
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                <Sider className="site-layout-background" width={120}>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 400 }}>
                    <Routes>
                        <Route path="/"  element={ <ListBooks />} />
                        <Route path="/formulario"  element={ <FormPage />} />

                    </Routes>
                </Content>
            </Layout>
        </Content>
        <FooterPage />
    </Layout>

  );
};

import { Layout, Menu, Dropdown, Button   } from 'antd';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth/authContext';
import { BooksContext } from '../../context/file/BooksContext';

const { Header } = Layout;


export const HeaderPage = () => {

  const { user, logout } = useContext( AuthContext);
  const { doClearSelectedFile } = useContext( BooksContext );

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <a onClick={ logout }>
         Logout
        </a>
      </Menu.Item>
    </Menu>
  );
  
  
  return (
    <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/">Libros</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/formulario" onClick={ doClearSelectedFile }>Formulario</Link></Menu.Item>
            <Menu.Item style={{ marginLeft: '70%'}}>
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}>{ user?.name }</Button>
              </Dropdown>


            </Menu.Item>
        </Menu>
 
    </Header>
  );
};

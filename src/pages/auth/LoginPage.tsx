import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/authContext';


export const LoginPage = () => {
  const { doLogin } = useContext( AuthContext );

  
  const onFinish = (values: any) => {

    doLogin( values );
    
  }

  return (
  <Form
    name="normal_login"
    className="login-form"
    initialValues={{ remember: true }}
    onFinish={onFinish}
  >
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please input your Email!' }]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
  
    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button" block>
        Log in
      </Button>
      Or <Link to="/auth/register">register now!</Link>
    </Form.Item>
  </Form>
    )
};

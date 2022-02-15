import {
  Form,
  Input,
  Button,
} from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, UserOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';


export interface BookFile {
  title:string;
  author:string;
  description:string;
  fecha_pub: any
}

const buttonItemLayout ={
      wrapperCol: { span: 14, offset: 5 },
  };


export const RegisterPage = () => {


  const handleFinish = (values:BookFile) => {
    console.log(values);
        
    
  }

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{
        name: '',
        surname: '',
        email: '',
        password: ''
      }}
      onFinish={  handleFinish }
    >
    
      <Form.Item label="Name" 
        name='name' 
        rules={[
          {
            required: true,
            message: 'The name is required'
          }
        ]}
      >
        <Input 
    
        />
      </Form.Item>
      <Form.Item label="Surname"
        name='surname' 
        rules={[
          {
            required: true,
            message: 'The surname is required'
          }
        ]}
      >
        <Input
        />
      </Form.Item>
      <Form.Item label="Email"
        name='email' 
        rules={[
          {
            required: true,
            message: 'The email is required'
          }
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item label="Password" 
        name='password' 
        rules={[
          {
            required: true,
            message: 'The password is required'
          }
        ]}
      >
        <Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
            placeholder="input password again"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item { ...buttonItemLayout }>
        <Button type="primary" icon={<UserOutlined />}  htmlType="submit" danger block>
          Sign Up
        </Button>
        Or <Link to="/auth/login">sign in!</Link>
      </Form.Item>

    </Form>
  );
};

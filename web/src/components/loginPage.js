import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/loginPage.css';
const { Title } = Typography;

const LoginForm = () => {
    const history = useHistory();
    const onFinish = (values) => {
    //   console.log('Received values of form: ', values);
        const querry_data = {username: values.username};
        axios.post('http://localhost:8080/api/login', querry_data, 
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            }
        })
        .then(response => {
            console.log(response.data);
            history.push("/report-submission");
        })
    };

    return (
      <div className="login-div">
          <Title>ENLUME</Title>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your Username!',
                },
            ]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your Password!',
                },
            ]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
            </Form.Item>
            <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <a className="login-form-forgot" href="">
                Forgot password
            </a>
            </Form.Item>
    
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
      </div>
    );
};

export default LoginForm;
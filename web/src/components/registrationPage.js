import axios from 'axios';
import { Form, Input, Button, Typography } from 'antd';
import '../styles/registrationPage.css';
const { Title } = Typography;


const RegistrationForm = () => {
    
    const onFinish = (values) => {
       
        const registration_data = {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            password: values.password
        }

        axios.post('http://localhost:8080/api/register', registration_data, 
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => console.log(response.data));
    };

    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    return (
        <div className="register-title">
            <Title>Welcome to registration page</Title>
            <div>
                <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 8,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your email!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="FullName"
                    name="fullName"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your fullName!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your phone!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>


                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                    >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default RegistrationForm;
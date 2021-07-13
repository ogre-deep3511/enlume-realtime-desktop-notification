import { Form, Input, Button, Typography } from "antd";
import io from "socket.io-client";
import '../styles/reportSubmissionPage.css'
const { detect } = require('detect-browser');
const browser = detect();
const ip = require('ip');
const { TextArea } = Input;
const { Title } = Typography;

const ReportSubmission = () => {

    const onFinish = (values) => {

        const socket = io().connect("http://localhost:8080");

        socket.emit('show_notification', function (data) {
            showDesktopNotification();
        });

        // var Notification = window.Notification || window.mozNotification || window.webkitNotification;
        Notification.requestPermission().then((permission) => {
            if(permission === "granted") {
                showDesktopNotification();
            }
        });

        function requestNotificationPermissions() {
            if (Notification.permission !== 'denied') {
                Notification.requestPermission().then((permission) => {
                    if(permission === "granted") {
                        showDesktopNotification();
                    }
                });
            }
        }

        function showDesktopNotification() {
            
            requestNotificationPermissions();
            var instance = new Notification(
                "New report submitted by a user", 
                {
                        body: `Name: ${values.name}` + "\n" + `Report: ${values.report}` + "\n" + `Browser: ${browser.name}` + "\n" + `IP: ${ip.address()}`
                }
            );
            instance.onclick = function () {
                window.location.href = "http://localhost:3000/"
            };

            setTimeout(instance.close.bind(instance), 4000);
            return false;
        }
    

        // const showNotification = () => {
        //     const notification = new Notification("New report submitted by a user", {
        //         body: `Name: ${values.name}` + "\n" + `Report: ${values.report}`
        //     });

        //     notification.onclick = (e) => {
        //         window.location.href = "http://localhost:3000/"
        //     }
        // }

        // // console.log(Notification.permission);
        // if(Notification.permission === "granted") {
        //     showNotification();
        // }else if(Notification.permission !== "denied") {
        //     Notification.requestPermission().then(permission => {
        //         if(permission === "granted") {
        //             showNotification();
        //         }
        //     })
        // }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="report-title">
            <Title>Post your report</Title>
            <div className="col-md-3 center">
                <Form
                    className="form"
                    name="basic"
                    labelCol={{
                    span: 6,
                    }}
                    wrapperCol={{
                    span: 20,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Report"
                        name="report"
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 20,
                        }}
                        >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ReportSubmission;
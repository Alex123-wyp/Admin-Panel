import React from "react"
import {Form, Input, Button} from 'antd'
import './login.css'
import {getMenu} from '../../API'
import { useNavigate, Navigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    //in login state, jump to home page
    if(localStorage.getItem('token')){
        return <Navigate to="/home" replace/>
    }
    const handleSubmit = (val) => {
        if(!val.password || !val.username){
            return
        }else{
            getMenu(val).then(({data}) => {
                console.log(data);
                localStorage.setItem('token', data.data.token);
                navigate('/home');
            })
        }
       
    }


    return(
        <Form className="login-container" onFinish={handleSubmit}>
            <div className="login_title">Sign up</div>
            <Form.Item label="Username" name="username" rules={[{required: true, message: "Please input your user name!"}]}>
                <Input placeholder="Please input username" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{required: true, message: "Please input your message!"}]}>
                <Input.Password placeholder="Please input you password"/>
            </Form.Item>

            <Form.Item className="login-button">
                <Button type="primary" htmlType="submit">Sign up</Button>
            </Form.Item>
        </Form>
    )
}

export default Login;
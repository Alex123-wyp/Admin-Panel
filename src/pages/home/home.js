import React from 'react'
import { Col, Row, Card } from 'antd';
import './home.css'
const Home = () => {
    const userImg = require('../../assets/images/user.png')
    return(
        <div>
            <Row className='home'>
                <Col span={8}>
                <Card hoverable>
                    <div className='user'>
                        <img src={userImg}/>
                        <div className='userinfo'>
                            <p className='name'>Admin</p>
                            <p className='access'>Super Manager</p>
                        </div>
                    </div>
                    <div className='login-info'>
                        <p>Last time login<span>2025-1-1</span></p>
                        <p>Last addr login<span>Cork</span></p>
                    </div>

                </Card>
                </Col>
                <Col span={16}></Col>
            </Row>
        </div>
    )
}

export default Home
import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd';
import './home.css'
import { getData } from '../../API';
import * as Icon from '@ant-design/icons';
import MyEchart from '../../components/Echarts'
import { type } from '@testing-library/user-event/dist/type';


const iconToElement = (name) => React.createElement(Icon[name]);
const Home = () => {
    const userImg = require('../../assets/images/user.png')
    useEffect(() => {
        getData().then(({data}) => {
            const {tableData, orderData} = data.data;
            setTableData(tableData);
        })

        //echarts data get
        const order = orderData
        //xAxis data
        const Xdata = order.date;
        //series data
        const keyArray = Object.keys(order.data[0]);
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]);
            type: 'line'
          })
        })
    }, [])

    //store data in tableData
    const [tableData, setTableData] = useState([]);
    
    const countData = [
        {
          "name": "Today Order",
          "value": 1234,
          "icon": "CheckCircleOutlined",
          "color": "#2ec7c9"
        },
        {
          "name": "Today Order",
          "value": 3421,
          "icon": "ClockCircleOutlined",
          "color": "#ffb980"
        },
        {
          "name": "unpaid order",
          "value": 1234,
          "icon": "CloseCircleOutlined",
          "color": "#5ab1ef"
        },
        {
          "name": "Month Order",
          "value": 1234,
          "icon": "CheckCircleOutlined",
          "color": "#2ec7c9"
        },
        {
          "name": "Month Order",
          "value": 3421,
          "icon": "ClockCircleOutlined",
          "color": "#ffb980"
        },
        {
          "name": "unpaid order",
          "value": 1234,
          "icon": "CloseCircleOutlined",
          "color": "#5ab1ef"
        }
      ]

    const columns = [
        {
            title: 'Brand', 
            dataIndex: 'name', 
            key: 'name',
        },
        {
            title: 'TodayBuy', 
            dataIndex: 'todayBuy', 
            key: 'todayBuy',
        },
        {
            title: 'MonthBuy', 
            dataIndex: 'monthBuy', 
            key: 'monthBuy',
        },
        {
            title: 'Total',
            dataIndex: 'totalBuy',
            key: 'totalBuy'
            
        }
    ]
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
                <Table columns={columns} dataSource={tableData} />
                </Col>
                <Col span={16}>
                    <div className='num'>
                        {
                            countData.map((Item, index) => {
                                return(
                                    <Card key={index}>
                                        <div className='icon-box' style={{ background: Item.color }}> {iconToElement(Item.icon)} </div>
                                        <div className='detail'>
                                            <p className="num"> ${Item.value}</p>
                                            <p className="txt">{Item.name}</p>    
                                        </div>
                                    </Card>
                                )
                            }) 
                        }
                    </div>

                    <MyEchart  />
                </Col>
            </Row>
        </div>
    )
}

export default Home
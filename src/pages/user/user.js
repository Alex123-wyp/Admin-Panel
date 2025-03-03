import React, {useEffect, useState} from "react";
import {Button, Form, Input, Popconfirm, Table, Modal, Select, InputNumber, DatePicker} from 'antd'
import './user.css'
import {getUser, editUser, addUser, deleteUser} from '../../API'
import { useForm } from "antd/es/form/Form";
import dayjs from 'dayjs'



const User = () => {
    
    const [listData, setListData] = useState({
        name: '',
    })
    //set the state of tableData that fetch from the backend
    const [tableData, setTableData] = useState([])
    //set the state of modal is open or not
    const [isModalOpen, setIsModalOpen] = useState(false);
    //0: add
    //1: edit
    const [modalType, setModalType] = useState(0);
    //create form instance, to get form dom
    const [form] = useForm();
    //modal confirm
    const handleOk = () => {
        form.validateFields().then((val) => {
            console.log(val, 'val');
            val.birth = dayjs(val.birth).format('YYYY-MM-DD');
            console.log(val, 'newval');
            //interact with interface
            if(modalType){ //edit
                editUser(val).then(() => {
                    setIsModalOpen(false);
                    getTableData();
                    
                }).catch(err => {
                    console.log(err);
                })           
            }else{//add
                addUser(val).then(() => {
                    setIsModalOpen(false);
                    getTableData();
                    form.resetFields();
                }).catch(err => {
                    console.log(err);
                })
            }
        })
        
    }
    //modal cancel
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    }
    
    // deal with the click event of 'add' or 'edit' button
    const handleClick = (type, rowData) => {
        if(type === 'add'){
            setModalType(0);
            setIsModalOpen(!isModalOpen)
        }else if(type === 'edit'){
            setModalType(1);
            //This is a common way to deep clone an object in JavaScript
            const cloneData = JSON.parse(JSON.stringify(rowData))
            cloneData.birth = dayjs(cloneData.birth);
            if(cloneData.sex === 0){
                cloneData.sex = 'male'
            }else if(cloneData.sex === 1){
                cloneData.sex = 'female'
            }
            //form data refill
            form.setFieldsValue(cloneData);
            console.log(rowData, 'rowData');
            setIsModalOpen(!isModalOpen)
        }
    }

    const handleDelete = ({id}) => {
        deleteUser({id}).then(res => {
            getTableData();
        }).catch(err => {
            console.log(err);
        })
    }

    {/**
        Please pay attention to this point, putting the getTableData() function into handleFinish() function is not correct,
        it may cause delay to show the result, because  setListData is asynchronous. In this case, I use useEffect hook, which
        can solve this problem perfectly. Only when listData has changed, getTableData() will execute immediately.
        */}
    const handleFinish = (e) => {
        console.log(e);
        setListData({
            name: e.keyword
        })
    }
    useEffect(() => {
        getTableData();
    }, [listData])

    const getTableData = () => {
        getUser(listData).then(({data}) => {
            setTableData(data.list);
        })
    }

    const columns = [
    {
        title: "Name",
        dataIndex: 'name',
    },
    {
        title: "Age",
        dataIndex: 'age',
    },
    {
        title: "Gender",
        dataIndex: 'sex',
        render: (val) => {
            return val ? 'female' : 'male'
        }
    },
    {
        title: "Birth",
        dataIndex: 'birth',
    },
    {
        title: "Address",
        dataIndex: 'addr',
    },
    {
        title: "Operation",
        render: (rowData) => {
            return (
                <div className="flex-box">
                    {/**
                     * Please pay attention to the onClick function, if this function is written as 
                     * onClick={handleClick('edit', rowData)}, it will lead to serious loop problems.
                     * Because this will cause function execute immediately when the page first render,
                     * and then the state of 'isModalopen' will change, which cause the page render again,
                     * as a result, the page will always loop. Of course, you will not see any user data, 
                     * because getUser() function will execute when the first render is over.
                     */}
                    <Button style={{marginRight: '5px'}} onClick={() => {handleClick('edit', rowData)}}>Edit</Button>
                    <Popconfirm
                        title="remind"
                        description="This action will cause to delete, continue?"
                        onConfirm={() => handleDelete(rowData)}
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                    
                </div>
            )
        }
    }
]

    useEffect(() => {
        //invoke interface, get user data
        getTableData();
    }, [])

    return(
        <div className="user">
            <div className="flex-box space-between">
                <Button type="primary" onClick={() => handleClick('add')}>+ADD</Button>
                <Form layout="inline" onFinish={handleFinish}>
                    <Form.Item name="keyword" rules={[{required: false, message:'Please Input'}]}>
                        <Input placeholder="Please input username"/>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div>
                <Table columns={columns} dataSource={tableData} rowKey={'id'}/>
            </div>

            <div>
                <Modal title={modalType ? "Edit" : "Add"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form labelCol={{span: 4}} wrapperCol={{span: 16,}} labelAlign="left" form={form}>
                        
                        {
                            modalType == 1 && <Form.Item name="id" hidden><Input /></Form.Item>
                        }

                        <Form.Item label="Name" name="name" rules={[{required: true, message: 'Please input your username!'}]}>
                         <Input placeholder="Please input your name"/>  
                         </Form.Item>

                        <Form.Item label="Age" name="age" rules={[{required: true, message: 'Please input your age!'}]} >
                         <InputNumber/> 
                         </Form.Item>

                        <Form.Item label="Birth" name="birth" rules={[{required: true, message: 'Please input your date of birth!'}]}>
                         <DatePicker format={"YYYY/MM/DD"}/> 
                         </Form.Item>

                        <Form.Item label="Gender" name="sex" rules={[{required: true, message: 'Please input your gender!'}]}>
                            <Select>
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Address" name="addr" rules={[{required: true, message: 'Please input your address!'}]}>
                         <Input placeholder="Please input your address"/>
                        </Form.Item>
                        
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default User;
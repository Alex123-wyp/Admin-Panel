import React, { use } from "react";
import { Button, Layout, Avatar, Dropdown } from 'antd';
import commonHeader from './commonHeader.css'
import {MenuFoldOutlined, MenuUnfoldOutlined, ArrowLeftOutlined, UserOutlined} from '@ant-design/icons'
import { useDispatch } from "react-redux";
import {collapseMenu} from "../../store/reducers/tab"
const { Header } = Layout;
const items = [
  {
    key: '1',
    label: 'Profile',
    icon: <UserOutlined />
  },
  {
    key: '2',
    label: 'Logout',
    icon: <ArrowLeftOutlined />
  }
]

const CommonHeader = ({collapse}) => {
  // const logout = () => {
  // }
  const dispatch = useDispatch();
  const setCollapsed = () => {
    dispatch(collapseMenu());
  }
    return(
        <Header className="header-container">
        <Button
          type="text"
          style={{
            fontSize: '16px',
            width: 30,
            height: 30,
            backgroundColor: '#fff'
          }
        }
        onClick={() => setCollapsed()}
        >
        {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Dropdown menu={{items}}>
        <Avatar size={50} icon={<UserOutlined/>}/>
        </Dropdown>
        
      </Header>
    )
}
export default CommonHeader
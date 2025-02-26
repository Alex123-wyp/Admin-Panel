import React from "react";
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import MenuConfig from '../../config/config'

const { Sider } = Layout;
//get icon component
const iconToElement = (name) => React.createElement(Icon[name]);
//Deal with the menu info
const items = MenuConfig.map((item) => {
    const child = {
        key: item.path,
        icon: iconToElement(item.icon),
        label: item.label
    }
    //if subMenu exists
    if(item.children){
        child.children = item.children.map((element) => {
            return {
                key: element.path,
                label: element.label
            }
        })
    }
    return child
})


const CommonSider = ({collapse}) => {
    console.log(collapse, 'commonSider');
    return(
        <Sider trigger={null} collapsible collapsed={collapse}>
        {/**
         * control the title length to make sure it is suitable when menu is collapsed
         */}
        <h3 className='app-name'>{!collapse ? "Admin Panel" : "Admin"}</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
              height:'100%'
          }}
        />
      </Sider>
    )
}

export default CommonSider
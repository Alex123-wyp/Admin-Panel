import React from 'react';
import { Layout, theme} from 'antd';
import CommonSider from '../components/commonSider/commonSider'
import CommonHeader from "../components/commonHeader/commonHeader";
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RouterAuth } from '../router/routerAuth';


const { Content } = Layout;
const Main = () => {
    // const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    //get the state of menu whether is collapsed or not
    /**
     * Besides, here is the reason why I get the state here instead of
     * commonHeader component: the menu state is related to two components, 
     * which is commonHeader and commonAside, so we had better put this state
     * in a component that includes both of them, which is layout component
     */
    const collapse = useSelector(state => state.tab.isCollapse);
    
    return(
      <RouterAuth>
         <Layout className='main-container'>
    {/**
     * There is a problem that should be pay attention to, which confused me for 10 minutes:
     * There are two ways for collapse to pass to subcomponent, which is:
     * 1. <CommonSider collapse = {collapse}/>
     * 2. <CommonSider collapse}/>
     * The second way is wrong in this case, because in JSX, <CommonSider collapse}/> is equivalent to
     * <CommonSider collapse = {true}}/>, it means the collapse value is always true, which can not be
     * changed. However, in this context we need to change change it to control the state of the menu.
     * So this is the reason why the second pass value approach can not work.
     */}
      <CommonSider collapse = {collapse}/>
      <Layout>
      <CommonHeader collapse = {collapse}/>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>           
      </RouterAuth>
      
    )
}

export default Main
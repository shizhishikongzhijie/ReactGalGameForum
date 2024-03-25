import React, { useRef, useState } from 'react';
import styles from './index.module.scss'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col } from 'antd';
import Weather from './components/Weather/index';
import TagList from './components/tagsView/tagList';

const { Header, Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    // 使用useToken定制主题色
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
            onClick: () => {
                setTags([...tags, label]);
            }
        };
    }


    // 通过useState管理标签列表
    const [tags, setTags] = useState([]);

    const items = [
        getItem('仪表盘', '1', <DashboardOutlined />),
        getItem('Navigation Two', '2', <CalendarOutlined />),
        getItem('Navigation Three', 'sub1', <AppstoreOutlined />, [
            getItem('Option 3', '3'),
            getItem('Option 4', '4'),
            getItem('Submenu', 'sub1-2', null, [
                getItem('Option 5', '5'),
                getItem('Option 6', '6')]),
        ]),
        getItem('Navigation Four', 'sub2', <SettingOutlined />, [
            getItem('Option 7', '7'),
            getItem('Option 8', '8'),
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
        ]),
        getItem(
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Ant Design
            </a>,
            'link',
            <LinkOutlined />,
        ),
    ];
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.sidebarLogoWrapper}>
                    {/* <img src={logo} className={styles.sidebarLogo} alt='logo' /> */}
                    <h1 className={styles.sidebarTitle}>React-Ant-Admin</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <TagList tagsList={tags} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Row gutter={[24, 24]}>
                        <Col span={12}>
                            <Weather />
                        </ Col>
                        <Col span={12} />

                        <Col span={12} />
                        <Col span={12} />
                    </Row>
                    <Row gutter={[24, 24]}>
                        <Col span={12} />
                        <Col span={12} />
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;
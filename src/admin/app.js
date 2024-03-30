import React, { useState } from 'react';
import styles from './index.module.scss'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    PushpinOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import TagList from './components/tagsView/tagList';
import DashBoard from './page/DashBoard/DashBoard';
import ArticleEditor from './page/ArticleEditor/ArticleEditor';

const { Header, Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    // 使用useToken定制主题色
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const [selectedTags, setSelectedTags] = useState(0);
    // 通过useState管理标签列表
    const [tags, setTags] = useState([]);
    // 删除指定的标签
    const handleClose = (removedIndex) => {
        const newTags = tags.filter((tag, index) => index !== removedIndex); // 使用索引来过滤标签
        setTags([...newTags]); // 更新标签列表
    };


    //进行选择
    const handleTagClickToChangeColor = ([index,tag]) => {
        // 切换选中状态
        if (selectedTags[0] === index) {
            setSelectedTags([0,null]);
        } else {
            setSelectedTags([index,tag]);
            console.log("elseindex:" + index);
            console.log("setSelectedTags:" + selectedTags);
        }
    };
    //当新增tag时，把新的Index变为selectedTags
    const handleTagClickToAdd = ([index,tag]) => {
        setSelectedTags([index,tag]);
    };
    //当删除tag时，把selectedTags变为这个Index的上一个，如果没有上一个，则为空
    const handleTagClickToDelete = ([index,tag]) => {
        if (tags.length === 1) {
            setSelectedTags([0,null]);
        } else {
            setSelectedTags([index - 1,tag])
        }
    };
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
            onClick: () => {
                setTags([...tags, label]);
                const tagsLength = tags.length;//为setSelectedTags的Index
                handleTagClickToAdd([tagsLength,label])
            }
        };
    }
    const items = [
        getItem('仪表盘', '1', <DashboardOutlined />),
        getItem('文章', '2', <PushpinOutlined />),
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
        getItem('文章', '10', <SettingOutlined />),
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
                        onClick={() => {
                            setCollapsed(!collapsed)
                        }}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <TagList tags={tags} handleClose={handleClose} selectedTags={selectedTags}
                    handleTagClickToChangeColor={handleTagClickToChangeColor}
                    handleTagClickToDelete={handleTagClickToDelete} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto', // 或者 'scroll'
                    }}
                >
                    <AppChildren selectedTags={selectedTags} />
                </Content>
            </Layout>
        </Layout>
    );
};
const AppChildren = ({ selectedTags }) => {
    switch (selectedTags[1]) {
        case '仪表盘'://仪表盘
            return <DashBoard />;
        case '文章'://文章
            return <ArticleEditor />;
        default:
            return <div>shizhishi</div>;
    }
};
export default App;
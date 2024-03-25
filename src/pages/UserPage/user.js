import React, { useEffect, useState } from 'react';
import { HomeOutlined, TeamOutlined, PlayCircleOutlined, StarOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Avatar } from 'antd';

const User = () => {
    const [current, setCurrent] = useState('Home');
    const [content, setContent] = useState([]);
    const items = [
        { label: '主页', key: 'Home', icon: <HomeOutlined />, },
        { label: '动态', key: 'Team', icon: <TeamOutlined />, },
        { label: '投稿', key: 'PlayCircle', icon: <PlayCircleOutlined />, },
        { label: '收藏', key: 'Star', icon: <StarOutlined />, },
        { label: '设置', key: 'Setting', icon: <SettingOutlined /> }
    ];
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    useEffect(() => {
        switch (current) {
            case 'Home': setContent(<div>主页</div>); break;
            case 'Team': setContent(<div>动态</div>); break;
            case 'PlayCircle': setContent(<div>投稿</div>); break;
            case 'Star': setContent(<div>收藏</div>); break;
            case 'Setting': setContent(<div>设置</div>); break;
            default: setContent(<div>主页</div>); break;
        }
    }, [current]);
    return (
        <div className='User' style={{ marginTop: '6rem', width: '85vw' ,marginInline: 'auto' }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <div>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                {content}
            </div>
        </div>
    );
};

export default User;

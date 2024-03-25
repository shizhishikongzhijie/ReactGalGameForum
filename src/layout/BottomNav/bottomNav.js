import { NavLink } from "react-router-dom"
import "./bottomNav.scss"
import '../../plugins/fontawsome/css/all.css'
import { useIsMobile } from "../../hooks/useIsMobile";
// 菜单数组
const menu = [
    {
        key: "home",
        title: "首页",
        link: "/",
        icon: "home-lg-alt"
    },
    {
        key: "chat",
        title: "聊天",
        link: "/chat",
        icon: "comment-dots"
    },
    {
        key: "search",
        title: "搜索",
        link: "/search",
        icon: "search"
    },
    {
        key: "user",
        title: "我的",
        link: "/user",
        icon: "user-alt"
    }
];
function BottomNav() {
    
    // const checkDeviceType = () => {
    //     const userAgent = navigator.userAgent;
    //     const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    //     setIsMobile(isMobile);
    // };
    // checkDeviceType();
    // 你也可以添加一个事件监听器来响应屏幕尺寸的变化，这里只是简单的一次性检测
    const { isMobile } = useIsMobile();
    return (
        <>
            {isMobile && (
                    <ul className="bottomNav">
                        {menu.map(item => (
                            <MenuItem key={item.key} {...item} />
                        ))}
                    </ul>
            )}
        </>
    );
}

function MenuItem({ link, icon, title }) {
    return (
        <li className="menuItem col-3">
            <NavLink to={link}>
                <span>
                    <i className={`fas fa-${icon}`} />
                </span>
                <br />
                <span>{title}</span>
            </NavLink>
        </li>
    );
}

export default BottomNav;

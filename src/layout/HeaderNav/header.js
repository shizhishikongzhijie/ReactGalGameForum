import logo from '../../logo.svg';
function Header() {
    return (
        <header className="navigation fixed-top">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-white">
                    <a className="navbar-brand order-1" href="/index">
                        <img
                            className="img-fluid"
                            width="50px"
                            src={logo}
                            alt="空之界 | 时之世"
                        />
                    </a>
                    <div
                        className="offcanvas offcanvas-end  text-center order-lg-2 order-3"
                        tabIndex={-1}
                        id="navigation"
                        style={{width:"160px"}}
                    >
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="/index"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    网站首页
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link"
                                    href="/index"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    关于 <i className="ti-angle-down ml-1" />
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="about-me.html">
                                        关于我
                                    </a>
                                    <a className="dropdown-item" href="about-us.html">
                                        关于我们
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/chat">
                                    聊天
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link"
                                    href="/index"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    页面 <i className="ti-angle-down ml-1" />
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="author.html">
                                        作者
                                    </a>
                                    <a className="dropdown-item" href="author-single.html">
                                        作者 Single
                                    </a>
                                    <a className="dropdown-item" href="advertise.html">
                                        做广告
                                    </a>
                                    <a className="dropdown-item" href="/articleread">
                                        帖子详细信息
                                    </a>
                                    <a className="dropdown-item" href="post-elements.html">
                                        帖子元素
                                    </a>
                                    <a className="dropdown-item" href="/index">
                                        标签
                                    </a>
                                    <a className="dropdown-item" href="/search-result">
                                        搜索结果
                                    </a>
                                    <a className="dropdown-item" href="search-not-found.html">
                                        搜索未找到
                                    </a>
                                    <a className="dropdown-item" href="privacy-policy.html">
                                        隐私策略
                                    </a>
                                    <a className="dropdown-item" href="terms-conditions.html">
                                        条款条件
                                    </a>
                                    <a className="dropdown-item" href="404.html">
                                        404 界面
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="shop.html">
                                    商店
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="order-2 order-lg-3 d-flex align-items-center">
                        <div className="m-2 border-0 bg-transparent" id="change-theme">
                            {/* <i id="Sun" class="bi bi-brightness-high-fill theme-active"></i>
              <i id="Night" class="bi bi-moon"></i> */}
                            <i id="Night" type="button" className="fas fa-moon" />
                            <i id="Sun" type="button" className="fas fa-sun theme-active" />
                        </div>
                        <div className="m-2 border-0 bg-transparent dropdown" id="user-login">
                            <a
                                href="/index"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                style={{ color: "inherit" }}
                            >
                                <i className="fas fa-user" />
                            </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li>
                                    <a className="dropdown-item" href="/login">
                                        登录/注册
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* search */}
                        <form className="search-bar" action="/search">
                            <input
                                id="search-query"
                                name="s"
                                type="search"
                                placeholder="Type & Hit Enter..."
                            />
                        </form>
                        <button
                            className="navbar-toggler border-0 order-1"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#navigation"
                            aria-controls="navigation"
                            style={{ color: "inherit"}}
                        >
                            <i className=" fas fa-bars" />
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;

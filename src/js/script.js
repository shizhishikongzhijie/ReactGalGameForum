/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */
// Preloader js
import $ from 'jquery/dist/jquery'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick.js'
// import Instafeed from '../plugins/instafeed/instafeed.min';
window.onload = function () {
    $('.preloader').fadeOut(100);
};
$(function () {
    $('#articles').on('load', function () {
        // 使用定时器确保动态内容加载完成
        setTimeout(() => {
            // 获取当前元素的内容，并找到其中的 root 元素
            const iframeRoot = $(this).contents().find('#root');

            // 获取 iframeRoot 元素的滚动高度并赋值给变量 height
            const height = iframeRoot[0].scrollHeight;

            // 设置iframe容器的高度
            $('#edit-article-box').height(height);
            console.log('Iframe Root height:', height);
        }, 10); // 延迟10毫秒以等待动态内容加载，这个值可能需要根据实际情况调整
    });
});
$(window).on('scroll', function () {
    // 获取滚动距离
    const scrolling = $(this).scrollTop();
    // 如果滚动距离大于10
    if (scrolling > 10) {
        // 给导航添加类名 'nav-bg'
        $('.navigation').addClass('nav-bg');
    } else {
        // 从导航移除类名 'nav-bg'
        $('.navigation').removeClass('nav-bg');
    }
});

// tab
// 找到所有的.tab-content元素，并对每个元素进行遍历操作
$('.tab-content').find('.tab-pane').each(function (idx, item) {
    // 获取当前元素最近的.code-tabs祖先元素，并找到其中的.nav-tabs元素
    const navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
        // 获取当前元素的title属性值
        title = $(this).attr('title');
    // 在.nav-tabs元素中追加一个li元素和a元素
    navTabs.append('<li class="nav-item"><a class="nav-link" href="#">' + title + '</a></li>');
});

// 对所有的.code-tabs元素中的ul.nav-tabs元素进行遍历操作
$('.code-tabs ul.nav-tabs').each(function () {
    // 找到当前元素中的第一个li元素，并添加active类
    $(this).find('li:first').addClass('active');
});

// 对所有的.code-tabs元素中的.tab-content元素进行遍历操作
$('.code-tabs .tab-content').each(function () {
    // 找到当前元素中的第一个div元素，并添加active类
    $(this).find('div:first').addClass('active');
});
// 点击导航栏中的选项卡时
$('.nav-tabs a').click(function (e) {
    e.preventDefault();  // 阻止默认行为
    const tab = $(this).parent(),  // 获取当前点击的选项卡的父元素
        tabIndex = tab.index(),  // 获取当前点击的选项卡的索引
        tabPanel = $(this).closest('.code-tabs'),  // 获取最近的一个指定类名为'code-tabs'的祖先元素
        tabPane = tabPanel.find('.tab-pane').eq(tabIndex);  // 在最近的一个指定类名为'code-tabs'的祖先元素中找到索引为tabIndex的.tab-pane元素
    tabPanel.find('.active').removeClass('active');  // 在最近的一个指定类名为'code-tabs'的祖先元素中找到.class为'active'的元素，并移除该class
    tab.addClass('active');  // 给当前点击的选项卡添加.class为'active'
    tabPane.addClass('active');  // 给当前点击的.tab-pane元素添加.class为'active'
});

// 移动折叠面板
$('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find('.ti-plus').removeClass('ti-plus').addClass('ti-minus');  // 在当前折叠面板的父元素中找到.class为'ti-plus'的元素，并将其class修改为'ti-minus'
}).on('hidden.bs.collapse', function () {
    $(this).parent().find('.ti-minus').removeClass('ti-minus').addClass('ti-plus');  // 在当前折叠面板的父元素中找到.class为'ti-minus'的元素，并将其class修改为'ti-plus'
});

// 图片轮播
$(document).ready(function(){
    $('.post-slider').slick({
        slidesToShow: 1,  // 每次显示1张幻灯片
        slidesToScroll: 1,  // 滚动1张幻灯片
        autoplay: true,  // 自动播放幻灯片
        dots: false,  // 不显示小圆点
        arrows: true,  // 显示前后按钮
        prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',  // 前一幅图的按钮HTML代码
        nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>'  // 下一幅图的按钮HTML代码
    });
});

// 复制到剪贴板
$(document).on('click', '.copy', function () {
    const inputlink = this.nextElementSibling;
    if (inputlink && inputlink.classList.contains('inputlink')) {
        inputlink.select();
        navigator.clipboard.writeText(inputlink.value)
            .then(() => {
                console.log('复制成功');
            })
            .catch(err => {
                console.error('复制失败: ', err);
            });
    }
});

// // instafeed
// if (($('#instafeed').length) !== 0) {
//     // 获取访问令牌
//     var accessToken = $('#instafeed').attr('data-accessToken');
//     // 创建一个新的Instafeed对象
//     var userFeed = new Instafeed({
//         get: 'user', // 获取用户feed
//         resolution: 'low_resolution', // 图片分辨率低
//         accessToken: accessToken, // 授权访问令牌
//         template: '<div class="instagram-post"><a href="{{link}}" target="_blank"><img src="{{image}}"></a></div>' // 渲染模板
//     });
//     userFeed.run(); // 执行Instafeed对象
// }
setTimeout(function () {
    // 创建一个slick对象，用于轮播
    $('.instagram-slider').slick({
        dots: false, // 不显示点
        speed: 300, // 幻灯片切换速度
        autoplay: true, // 自动播放
        arrows: false, // 不显示箭头
        slidesToShow: 8, // 同时显示的幻灯片数
        slidesToScroll: 1, // 滑动的幻灯片数
        responsive: [ // 响应式配置
            {
                breakpoint: 1024, // 当屏幕宽度小于等于1024px时应用以下配置
                settings: {
                    slidesToShow: 6 // 同时显示的幻灯片数
                }
            },
            {
                breakpoint: 600, // 当屏幕宽度小于等于600px时应用以下配置
                settings: {
                    slidesToShow: 4 // 同时显示的幻灯片数
                }
            },
            {
                breakpoint: 480, // 当屏幕宽度小于等于480px时应用以下配置
                settings: {
                    slidesToShow: 2 // 同时显示的幻灯片数
                }
            }
        ]
    });
}, 1500); // 延迟1500ms后执行


// 弹出视频
var $videoSrc;  // 定义变量$videoSrc

// 点击视频按钮时，将数据源赋值给$videoSrc
$('.video-btn').click(function () {
    $videoSrc = $(this).data('src');
});

console.log($videoSrc);  // 打印$videoSrc的值到控制台

// 当模态框显示时，设置视频标签的src属性为$videoSrc加上一些参数
$('#myModal').on('shown.bs.modal', function (e) {
    $('#video').attr('src', $videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0');
});

// 当模态框隐藏时，设置视频标签的src属性为$videoSrc
$('#myModal').on('hide.bs.modal', function (e) {
    $('#video').attr('src', $videoSrc);
})
$(document).ready(function () {
    $('#Sun,#Night').click(function () {
        // 点击太阳或黑夜按钮时执行
        const $themeStyle = $('#theme-night-style');
        if ($themeStyle.prop('disabled')) {
            // 如果自定义样式被禁用，则启用它
            $themeStyle.prop('disabled', false); // 启用自定义样式
        } else {
            // 如果自定义样式已被启用，则禁用它
            $themeStyle.prop('disabled', true);  // 禁用自定义样式
        }
    });
    $('#Sun').click(function () {
        // 点击太阳按钮时执行
        $('#Sun').removeClass('theme-active');  // 移除主题激活样式
        $('#Sun').css('display', 'none');  // 隐藏太阳图标
        $('#Night').css('display', 'block');  // 显示黑夜图标
        $('#Night').addClass('theme-active');  // 添加主题激活样式
    });
    $('#Night').click(function () {
        // 点击黑夜按钮时执行
        $('#Night').removeClass('theme-active');  // 移除主题激活样式
        $('#Night').css('display', 'none');  // 隐藏黑夜图标
        $('#Sun').css('display', 'block');  // 显示太阳图标
        $('#Sun').addClass('theme-active');  // 添加主题激活样式
    });
});
// $('#Sun,#Night').click(function () {
//     // 点击太阳或黑夜按钮时执行
//     const $themeStyle = $('#theme-night-style');
//     if ($themeStyle.prop('disabled')) {
//         // 如果自定义样式被禁用，则启用它
//         $themeStyle.prop('disabled', false); // 启用自定义样式
//     } else {
//         // 如果自定义样式已被启用，则禁用它
//         $themeStyle.prop('disabled', true);  // 禁用自定义样式
//     }
// });
// $('#Sun').click(function () {
//     // 点击太阳按钮时执行
//     $('#Sun').removeClass('theme-active');  // 移除主题激活样式
//     $('#Sun').css('display', 'none');  // 隐藏太阳图标
//     $('#Night').css('display', 'block');  // 显示黑夜图标
//     $('#Night').addClass('theme-active');  // 添加主题激活样式
// });
// $('#Night').click(function () {
//     // 点击黑夜按钮时执行
//     $('#Night').removeClass('theme-active');  // 移除主题激活样式
//     $('#Night').css('display', 'none');  // 隐藏黑夜图标
//     $('#Sun').css('display', 'block');  // 显示太阳图标
//     $('#Sun').addClass('theme-active');  // 添加主题激活样式
// });
$('.search-bar').submit(function (event) {
    event.preventDefault(); // 防止表单默认提交行为
    const searchcontent = $('#search-query').val();

    if (searchcontent) {
        // 存储搜索内容到 sessionStorage
        sessionStorage.setItem('searchQuery', searchcontent);
        // 跳转到 /search-result 页面
        window.location.href = '/search-result';
    } else {
        alert('搜索输入为空');
    }
});

// $(document).ready(function () {
//     $('li.list-inline-item').on('click', function () {
//         // 获取点击的<li>元素中<a>标签的文本内容
//         const searchContent = $(this).find('a').text();

//         // 判断搜索内容是否为空
//         if (searchContent) {
//             // 存储搜索内容到 sessionStorage
//             sessionStorage.setItem('searchQuery', searchContent);

//             // 重定向到 /search-result 页面
//             window.location.href = '/search-result';
//         } else {
//             // 如果内容为空，可以选择显示一个警告或不执行任何操作
//             console.log('搜索内容为空');
//         }
//     });
//     if (window.location.pathname === '/search-result' || window.location.pathname === '/searchall') {
//         // 从 sessionStorage 获取搜索内容
//         const searchcontent = sessionStorage.getItem('searchQuery');
//         $('mark').text(searchcontent);
//         if (searchcontent) {
//             $.ajax({
//                 url: '/search-resultapi', // 确保这是向后端请求数据的正确 URL
//                 type: 'POST',
//                 data: { searchContent: searchcontent },
//                 success: function (data) {
//                     // 将数据存储到 sessionStorage
//                     sessionStorage.setItem('searchResults', JSON.stringify(data));
//                     // 处理显示数据
//                     const searchmain = JSON.parse(sessionStorage.getItem('searchResults'));

//                     // 如果searchmain不是	"{\"message\":\"未找到结果\"}"
//                     let html = '';
//                     if (searchmain && searchmain.length !== 19) {
//                         for (let item of searchmain) {
//                             item = JSON.parse(item);
//                             let id = item.id;
//                             let autor = item.author;
//                             let autorimg;
//                             let articleimg;
//                             $.post('/getarticleimg', { id: id, author: autor }, function (data) {
//                                 articleimg = data[0];
//                                 autorimg = data[1][0];
//                                 html += `<article class="card mb-4"><div class="row card-body"><div class="col-md-4 mb-4 mb-md-0"><div class="post-slider slider-sm">`
//                                 for (let items of articleimg) {
//                                     html += `<img src="${items}" class="card-img" alt="post-thumb"  
//                                                 style="height:200px; object-fit: cover;">`
//                                 }
//                                 html += `</div></div><div class="col-md-8">
//                                         <h3 class="h4 mb-3"><a class="post-title" href="#">${item.title}</a></h3>
//                                         <ul class="card-meta list-inline"><li class="list-inline-item"><a href="author-single.html" class="card-meta-author">
//                                             <img src="${autorimg}" alt="${item.author}">
//                                             <span>${item.author}</span></a></li>
//                                         <li class="list-inline-item"><i class="ti-timer"></i>${item.readingtime} Min To Read</li>
//                                         <li class="list-inline-item"><i class="ti-calendar"></i>${item.datetime}</li><li class="list-inline-item"><ul class="card-meta-tag list-inline">`
//                                 //用split(',')分隔tags
//                                 let tags = item.tags.split(',');
//                                 for (let tag of tags) {
//                                     html += `<li class="list-inline-item"><a href="#">${tag}</a></li>`
//                                 }

//                                 html += `</ul></li></ul>
//                                     <p>${item.mainsentence}</p>
//                                     <a href="/articleread?id=${item.id}" title="/articleread?id=${item.id}" class="btn btn-outline-primary">阅读更多</a></div></div></article>`;
//                                 // 更新页面内容
//                                 $('#search-result-main').html(html);
//                                 // 初始化轮播图
//                                 $('.post-slider').slick({
//                                     slidesToShow: 1,  // 每次显示1张幻灯片
//                                     slidesToScroll: 1,  // 滚动1张幻灯片
//                                     autoplay: true,  // 自动播放幻灯片AC
//                                     dots: false,  // 不显示小圆点
//                                     arrows: true,  // 显示前后按钮
//                                     prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',  // 前一幅图的按钮HTML代码
//                                     nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>'  // 下一幅图的按钮HTML代码
//                                 });
//                                 $(function () {
//                                     // 当页面加载完毕后，绑定点击事件到所有包含'/articalread'字符的<a>标签上
//                                     $("a[href*='/articleread']").click(function (event) {
//                                         // alert('您点击了阅读更多');
//                                         // 阻止a标签的跳转行为
//                                         event.preventDefault();
//                                         // 获取当前被点击的<a>标签的href属性值
//                                         const href = $(this).attr('href');
//                                         // 使用URL对象从当前页面的URL中获取id参数的值
//                                         const id = new URL(href, window.location.href).searchParams.get("id");
//                                         // alert(id);
//                                         // 将id的值存入sessionStorage
//                                         sessionStorage.setItem('articalwant', id);
//                                         // 将当前被点击的<a>标签的href属性值去掉id参数，重新赋值给window.location.href，实现页面跳转
//                                         window.location.href = $(this).attr("href");
//                                     });
//                                 });
//                             })

//                         }
//                     } else {
//                         alert('未找到搜索内容');
//                     }
//                 },
//                 error: function (xhr, status, error) {
//                     console.error('请求失败:', xhr, status, error); // 在控制台打印错误信息
//                 }
//             });
//         } else {
//             console.error('无搜索内容');
//             alert('无搜索内容');
//         }
//     }
// });
// $(document).ready(function () {
//     // 获取localStorage中的user对象
//     const login = $('#user-login').find('.dropdown-menu');
//     if (!localStorage.getItem('user')) {
//         // 如果用户未登录，则显示登录/注册链接
//         login.html('<li><a class="dropdown-item" href="/login">登录/注册</a></li>');
//     } else {
//         $.post('/rootornot', { 'user': JSON.parse(localStorage.getItem('user')).name }, function (data) {
//             // 如果用户是管理员，则显示后台管理链接
//             if (data) {
//                 login.html(`
//                                 <li><a class="dropdown-item" href="#" data-index="0">修改头像</a>
//                                 </li>
//                                 <li><a class="dropdown-item" href="javascript:void(0);" type="button" onclick="profile()" data-index="1">个人资料</a>
//                                 </li>
//                                 <li><a class="dropdown-item" href="/contact" data-index="2">联系我们</a>
//                                 </li>
//                                 <li class="divider"></li>
//                                 <li><a href="javascript:void(0);" type="button" onclick="logout()">安全退出</a>
//                                 </li>
//                         `);
//             } else {
//                 login.html(`
//                             <li><a class="dropdown-item" href="javascript:void(0);" data-index="0">修改头像</a>
//                             </li>
//                             <li><a class="dropdown-item" href="javascript:void(0);" type="button" onclick="profile()" data-index="1">个人资料</a>
//                             </li>
//                             <li><a class="dropdown-item" href="/root" data-index="2">管理界面</a>
//                             </li>
//                             <li class="divider"></li>
//                             <li><a href="javascript:void(0);" type="button" onclick="logout()">安全退出</a>
//                             </li> 
//                         `);
//             }
//         });
//     }
// })


// function logout() {
//     if (window.confirm('确定要退出吗？')) {
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//     }
// }

// function profile() {
//     const user = localStorage.getItem('user');
//     $.post('/profile', { 'name': JSON.parse(user).name, 'password': JSON.parse(user).password }, function (data) {
//         //给body的内容添加一个div
//         const div = document.createElement('div');
//         div.innerHTML = `
//         <!--在fix中心一个的方块-->
//             <div id="profile-flexcover" style="background-color: rgba(0, 0, 0, 0.515);display: none"
//                 class="justify-content-center align-items-center w-100 h-100 position-fixed-top fixed-top top-0">
//                 <div id="profile-flex" class="h-30" style="width: 200px;margin: 0 auto;z-index: inherit;background-color: white;border-radius: 20px;">
//                 <button onclick="closeprofile()" style="width: 20px; height: 20px; background-color: #fff; border-radius: 50%; position: absolute; right: 10px; top: 10px; border: none; z-index: 1;"><i class="fas fa-times"></i></button>
//                 <div class="rounded-circle mt-3 d-flex justify-content-center align-content-center overflow-hidden"
//                     style="width:150px;height:150px;margin:0 auto;">
//                     <img class="img img-rounded" src="${data[0]}" alt="" style="height: -webkit-fill-available;">
//                 </div>
//                 <div class="m-3 d-flex flex-column">
//                     <span class="text-center">${JSON.parse(user).name}</span>
//                     <a href="javascript:void(0);">
//                     历史记录
//                     </a>
//                 </div>
//                 </div>
//             </div>`;
//         document.body.appendChild(div);
//         $('#profile-flexcover').css('display', 'flex')
//     });
// }

// function closeprofile() {
//     $('#profile-flexcover').hide();
// }

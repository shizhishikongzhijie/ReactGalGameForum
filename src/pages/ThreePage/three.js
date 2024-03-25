import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
function Three() {
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const cubeRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();

        // 创建立方体
        const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
        const cubeMaterials = [
            new THREE.MeshBasicMaterial({ color: 0xff0000 }),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff }),
            new THREE.MeshBasicMaterial({ color: 0xffff00 }),
            new THREE.MeshBasicMaterial({ color: 0x00ffff }),
            new THREE.MeshBasicMaterial({ color: 0xff00ff })
        ];
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
        cubeRef.current = cube;
        scene.add(cube);

        // 创建摄像机
        const width = window.innerWidth;
        const height = window.innerHeight;
        /**
 * 创建一个透视相机对象。
 * @param {number} fov - 视场角，即镜头能够看到的视野的垂直角度。
 * @param {number} aspect - 相机视口的宽高比。
 * @param {number} near - 近平面裁剪面的距离。
 * @param {number} far - 远平面裁剪面的距离。
 * @returns {THREE.PerspectiveCamera} 返回一个透视相机对象。
 */
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 300;

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        rendererRef.current = renderer;

        sceneRef.current = scene;
        cameraRef.current = camera;

        const animate = () => {
            requestAnimationFrame(animate);

            // 旋转立方体
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        const container = document.getElementById('webgl');
        container.appendChild(renderer.domElement);

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <>
            <div id="webgl" style={{ marginTop: "200px", marginLeft: '100px' }}>
            </div>
        </>

    )
}

export default Three;
// import * as THREE from 'three'; // 导入Three.js库

// import Stats from 'three/addons/libs/stats.module.js'; // 导入性能监控库Stats.js
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js'; // 导入用于创建GUI的库

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // 导入OrbitControls控制器
// import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js'; // 导入OutlineEffect特效
// import { MMDLoader } from 'three/addons/loaders/MMDLoader.js'; // 导入MMDLoader加载器
// import { MMDAnimationHelper } from 'three/addons/animation/MMDAnimationHelper.js'; // 导入MMDAnimationHelper动画辅助工具

// let stats; // 声明变量用于存储性能监控对象

// let mesh, camera, scene, renderer, effect; // 声明变量用于存储模型、相机、场景、渲染器和特效对象
// let helper, ikHelper, physicsHelper; // 声明变量用于存储辅助对象、IK帮助器和物理帮助器

// const clock = new THREE.Clock(); // 创建Clock对象，用于计算时间间隔

// Ammo().then(function (AmmoLib) { // 异步加载Ammo物理引擎库
//     Ammo = AmmoLib; // 设置Ammo为加载后的物理引擎对象

//     init(); // 初始化场景
//     animate(); // 启动动画循环
// });

// function init() {
//     const container = document.createElement('div'); // 创建一个DIV容器
//     document.body.appendChild(container); // 将容器添加到DOM中

//     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000); // 创建透视相机
//     camera.position.z = 30; // 设置相机位置

//     scene = new THREE.Scene(); // 创建场景
//     scene.background = new THREE.Color(0xffffff); // 设置场景背景颜色

//     const gridHelper = new THREE.PolarGridHelper(30, 0); // 创建极坐标网格帮助器
//     gridHelper.position.y = -10; // 设置网格帮助器位置
//     scene.add(gridHelper); // 将网格帮助器添加到场景中

//     const ambient = new THREE.AmbientLight(0xaaaaaa, 3); // 创建环境光
//     scene.add(ambient); // 将环境光添加到场景中

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // 创建定向光
//     directionalLight.position.set(-1, 1, 1).normalize(); // 设置定向光位置
//     scene.add(directionalLight); // 将定向光添加到场景中

//     renderer = new THREE.WebGLRenderer({ antialias: true }); // 创建WebGL渲染器
//     renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比
//     renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器大小
//     container.appendChild(renderer.domElement); // 将渲染器DOM元素添加到容器中

//     effect = new OutlineEffect(renderer); // 创建OutlineEffect特效对象

//     stats = new Stats(); // 创建性能监控对象
//     container.appendChild(stats.dom); // 将性能监控对象的DOM元素添加到容器中

//     // 加载模型和动画
//     // 加载模型文件和动画文件，并在加载完成后执行回调函数
//     const modelFile = 'models/mmd/miku/miku_v2.pmd'; // 模型文件路径
//     const vmdFiles = ['models/mmd/vmds/wavefile_v2.vmd']; // 动画文件路径数组
//     helper = new MMDAnimationHelper({ afterglow: 2.0 }); // 创建MMDAnimationHelper对象
//     const loader = new MMDLoader(); // 创建MMDLoader对象
//     loader.loadWithAnimation(modelFile, vmdFiles, function (mmd) { // 使用加载器加载模型和动画
//         mesh = mmd.mesh; // 获取加载的模型网格
//         mesh.position.y = -10; // 设置模型位置
//         scene.add(mesh); // 将模型添加到场景中

//         helper.add(mesh, { animation: mmd.animation, physics: true }); // 使用辅助工具添加动画和物理模拟
//         ikHelper = helper.objects.get(mesh).ikSolver.createHelper(); // 创建IK帮助器
//         ikHelper.visible = false; // 设置IK帮助器初始可见性为false
//         scene.add(ikHelper); // 将IK帮助器添加到场景中

//         physicsHelper = helper.objects.get(mesh).physics.createHelper(); // 创建物理帮助器
//         physicsHelper.visible = false; // 设置物理帮助器初始可见性为false
//         scene.add(physicsHelper); // 将物理帮助器添加到场景中

//         initGui(); // 初始化GUI控制面板
//     }, onProgress, null);

//     const controls = new OrbitControls(camera, renderer.domElement); // 创建OrbitControls控制器
//     controls.minDistance = 10; // 设置控制器最小距离
//     controls.maxDistance = 100; // 设置控制器最大距离

//     window.addEventListener('resize', onWindowResize); // 监听窗口大小变化事件
// }

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight; // 更新相机视口长宽比
//     camera.updateProjectionMatrix(); // 更新相机投影矩阵

//     effect.setSize(window.innerWidth, window.innerHeight); // 更新特效大小
// }

// function animate() {
//     requestAnimationFrame(animate); // 请求动画帧

//     stats.begin(); // 开始记录性能数据
//     render(); // 渲染场景
//     stats.end(); // 结束记录性能数据
// }

// function render() {
//     helper.update(clock.getDelta()); // 更新动画辅助工具
//     effect.render(scene, camera); // 渲染场景
// }

// function initGui() {
//     const api = { // 创建GUI控制面板
//         'animation': true,
//         'ik': true,
//         'outline': true,
//         'physics': true,
//         'show IK bones': false,
//         'show rigid bodies': false
//     }; // 创建GUI控制参数对象

//     const gui = new GUI(); // 创建GUI控制面板

//     gui.add(api, 'animation').onChange(function () { // 添加动画控制选项到GUI面板，并绑定onChange事件处理函数
//         helper.enable('animation', api['animation']); // 启用或禁用动画
//     });

//     gui.add(api, 'ik').onChange(function () { // 添加IK控制选项到GUI面板，并绑定onChange事件处理函数
//         helper.enable('ik', api['ik']); // 启用或禁用IK
//     });

//     gui.add(api, 'outline').onChange(function () { // 添加轮廓效果控制选项到GUI面板，并绑定onChange事件处理函数
//         effect.enabled = api['outline']; // 启用或禁用轮廓特效
//     });

//     gui.add(api, 'physics').onChange(function () { // 添加物理模拟控制选项到GUI面板，并绑定onChange事件处理函数
//         helper.enable('physics', api['physics']); // 启用或禁用物理模拟
//     });

//     gui.add(api, 'show IK bones').onChange(function () { // 添加显示IK骨骼控制选项到GUI面板，并绑定onChange事件处理函数
//         ikHelper.visible = api['show IK bones']; // 设置IK骨骼可见性
//     });

//     gui.add(api, 'show rigid bodies').onChange(function () { // 添加显示刚体控制选项到GUI面板，并绑定onChange事件处理函数
//         if (physicsHelper !== undefined) physicsHelper.visible = api['show rigid bodies']; // 设置刚体可见性
//     });
// }

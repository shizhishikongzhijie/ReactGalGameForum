import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
// 定义一个将文件转换为Base64格式的函数
/**
 * 将文件转换为Base64格式的Promise函数
 * @param {File} file 需要转换的文件对象
 * @returns {Promise} 返回一个Promise对象，成功时携带Base64编码的文件数据，失败时携带错误信息
 */
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); // 文件读取成功时触发
        reader.onerror = (error) => reject(error); // 文件读取失败时触发
    });

/**
 * 图片上传组件
 * 该组件允许用户上传图片，并在上传过程中提供预览功能。用户可以选择多张图片，已上传的图片会展示在组件内。
 */
const ImgUploadWall = () => {
    // 控制预览模态框的显示状态
    const [previewOpen, setPreviewOpen] = useState(false);
    // 预览图片的URL
    const [previewImage, setPreviewImage] = useState('');
    // 预览图片的标题
    const [previewTitle, setPreviewTitle] = useState('');
    // 文件列表，用于展示上传的图片
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'emoji/1f4aa.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'emoji/1f9ce.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'emoji/1f34b.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'emoji/1f44b.png',
        },
        {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'emoji/1f44c.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ]);
    // 关闭预览模态框
    const handleCancel = () => setPreviewOpen(false);
    /**
     * 打开预览并处理图片预览
     * 如果图片还没有URL或预览链接，则通过getBase64函数生成预览链接
     * @param {Object} file 需要预览的文件对象
     */
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    // 处理文件列表变化
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    // 自定义上传按钮
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    // 渲染组件
    return (
        <>
            <ImgCrop rotationSlider>
                <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
            </ImgCrop>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} >
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
export default ImgUploadWall;
// 导入 Emoji Mart 的数据和 React 组件
// import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react';
import { Modal } from 'antd';
import { SmileOutlined } from '@ant-design/icons'
import getEmojis from './EmojiCustom';
// 定义自定义表情列表，包含 Bilibili 和 GIFs 两个分类
const custom = getEmojis();

function EmojiWall({ setContent }) {
    const insertEmoji = (emoji) => {
        console.log(emoji)
        if (!emoji.native) {
            setContent(currentContent => currentContent + `<img src="${emoji.src}" alt="" style="max-width:100px;"/>`);
        }
        else {
            setContent(currentContent => currentContent + emoji.native);
        }

    };
    const [previewOpen, setPreviewOpen] = useState(false);
    // 关闭预览模态框
    const handleCancel = () => setPreviewOpen(false);
    return (
        <>
            <button type="button" style={{
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                background: "none", border: "1px dashed #d9d9d9",
                borderRadius: "8px", width: "102px", height: "102px",
                margin: "10px",
            }}
                onClick={() => setPreviewOpen(true)}>
                <span role="img" aria-label="plus">
                    <SmileOutlined />
                </span>
                <div style={{ marginTop: "8px" }}>Emoji</div>
            </button>
            <Modal open={previewOpen} title='emojis' footer={null} onCancel={handleCancel} >
                <Picker
                    set='google' // 使用 Google 表情符号集
                    include={['custom']}
                    custom={custom} // 传入自定义表情数据
                    categories={['bilibili']}
                    onEmojiSelect={insertEmoji} // 选择表情时的回调处理
                    style={{ width:'auto' }}
                />
            </Modal>
        </>
    )
}
export default EmojiWall
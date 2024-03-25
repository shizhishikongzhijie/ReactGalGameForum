import React, { useState } from 'react';
import { Button } from 'antd';
import { useIsMobile } from '../../hooks/useIsMobile';
import FileUploadWall from '../../components/FileUploadWall/FileUploadWall';
import EmojiWall from '../../components/EmojiWall/EmojiWall';

const ChatInput = ({ setInputValue }) => {
    const { isMobile } = useIsMobile();
    const [rotateDegree, setRotateDegree] = useState(0);
    const [content, setContent] = useState('');

    const handleClick = () => {
        const navTool = document.getElementById('navTool');
        navTool.classList.toggle('d-none');
        setRotateDegree((prevRotateDegree) => (prevRotateDegree + 45) % 360);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setInputValue(content);
            // console.log('content'+content);
        }
    };

    return (
        <>
            <div className={`chat-input fixed-bottom ${!isMobile ? 'mb-0' : ''}`} style={{ zIndex: 1 }}>
                <div className="container d-flex justify-inputValue-between flex-row chat-input-bg">
                    <div
                        className='col-10'
                        contentEditable
                        suppressContentEditableWarning={true}
                        // onInput={(e) => setContent(e.target.textContent)}
                        // onChange={(e) => setContent(e.target.textContent)}
                        dangerouslySetInnerHTML={{ __html: content }} // 使用dangerouslySetInnerHTML插入富文本内容
                        onKeyDown={handleKeyDown}

                        style={{
                            border: '1px solid #d9d9d9',
                            borderRadius: '5px',
                            backgroundColor: '#fafafa',
                            padding: '5px',
                            cursor: 'text',
                            overflow: 'auto',
                            whiteSpace: 'pre-wrap',
                            minHeight: '100px',
                        }}
                    ></div>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<i className="fas fa-plus" style={{ transform: `rotate(${rotateDegree}deg)`, transition: 'all 0.5s' }} />}
                        size='large'
                        onClick={handleClick}
                    />
                </div>
                <div className='container navTool d-none d-flex' id='navTool'>
                    <FileUploadWall setContent={setContent} />
                    <EmojiWall setContent={setContent} />
                </div>
            </div>
        </>
    );
};

export default ChatInput;
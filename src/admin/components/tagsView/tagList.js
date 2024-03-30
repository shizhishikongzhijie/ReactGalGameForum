/**
 * App组件：展示并管理一个标签列表。
 * @param {Object} tags - 包含标签名称的数组。
 * @returns 返回渲染的标签列表组件。
 */
import React, { useEffect} from 'react';
import { Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import './tagList.css'

const App = ({ tags, handleClose,selectedTags,handleTagClickToChangeColor,handleTagClickToDelete }) => {
  useEffect(() => {
    console.log("渲染");
  }, [selectedTags]);
  
  // 为每个标签生成Tag组件
  const forMap =(tag, index) => (
    <span key={`${tag}-${index}`}
      style={{ display: 'inline-block', margin: 5 }}
      className={selectedTags[0]===index ? 'selected' : ''}
      onClick={() => handleTagClickToChangeColor([index,tag])}
    >
      <Tag
        closable
        // color='blue'
        onClose={(e) => {
          e.preventDefault();
          handleTagClickToDelete([index,tag]);
          handleClose(index);
        }}
        style={{opacity: 0.8,margin: 2}}
      >
        {tag}
      </Tag>
    </span>
  );

  // 渲染标签组件，使用动画效果
  return (
    <>
      <div style={{ margin: 10, backgroundColor: 'rgb(255, 255, 255)' }}>
        <TweenOneGroup
          key={tags.map(tag => tag).join(',')} // 设置一个动态的key值
          appear={false}
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          leave={{
            opacity: 0,
            width: 0,
            scale: 0,
            duration: 200,
          }}
          onEnd={(e) => {
            if (e.type === 'appear' || e.type === 'enter') {
              e.target.style = 'display: inline-block';
            }
          }}
        >
          {tags.map((tag, index) => forMap(tag, index))} {/* 映射tags到Tag组件 */}
        </TweenOneGroup>
      </div>
    </>
  );
};

export default App;

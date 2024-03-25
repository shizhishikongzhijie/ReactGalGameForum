/**
 * App组件：展示并管理一个标签列表。
 * @param {Object} tagsList - 包含标签名称的数组。
 * @returns 返回渲染的标签列表组件。
 */
import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

const App = ({ tagsList }) => {
  // 使用state管理当前的标签列表
  const [tags, setTags] = useState([]);
  useEffect(() => {
    console.log("tags:"+tags);
  }, [tags]);
  // 当tagsList prop更新时，更新tags state
  useEffect(() => {
    console.log("tagsList:"+tagsList);
    setTags([...tagsList]);
  }, [tagsList]);
  // 删除指定的标签
  const handleClose = (removedTag) => {
    console.log("removedTag:"+removedTag);
    const newTags = tags.filter((tag) => tag !== removedTag); // 过滤掉要删除的标签
    console.log("newTags:"+newTags);
    setTags([...newTags]); // 更新标签列表
  };

  // 为每个标签生成Tag组件
  const forMap = (tag, index) => (
    <span key={`${tag}-${index}`} style={{ display: 'inline-block', margin: 5 }}>
      <Tag
        color='blue'
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
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
          enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          onEnd={(e) => {
            if (e.type === 'appear' || e.type === 'enter') {
              e.target.style = 'display: inline-block';
            }
          }}
        >
          {tags.map((tag, index) => forMap(tag, index))} {/* 映射tagsList到Tag组件 */}
        </TweenOneGroup>
      </div>
    </>
  );
};

export default App;

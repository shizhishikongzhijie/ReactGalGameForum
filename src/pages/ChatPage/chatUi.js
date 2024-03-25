import React, { useEffect, useRef } from 'react';
import '@chatui/core/es/styles/index.less';
import { ChatUI, Btn, Input, Msg, useMountedRef } from '@chatui/core';
import { useMemoizedFn } from 'ahooks';
import '@chatui/core/dist/index.css';
import './chatui-theme.css'

// 配置抽象为函数
function getChatSdkConfig(canRecord) {
    return {
        root: null, // 此处修改为使用 useRef 的结果
        config: {
            lang: 'zh-CN',
            placeholder: '输入任何您想办理的服务',
            // （可选）配置按钮文案
            loadMoreText: '点击加载更多',
            // （可选）进入页面时，是否自动触发加载历史消息操作
            autoLoadMore: true,
            // 当支持语音时默认用语音输入
            inputType: canRecord ? 'voice' : 'text',
            toolbar: [
                {
                    type: 'image',
                    icon: 'image',
                    title: '相册',
                },
            ],
        },
        requests: {
            history: function () {
                return {
                    url: '/api/history',
                };
            },
            autoComplete(data) {
                return {
                    url: '/xiaomi/associate.do',
                    data: {
                        q: data.text,
                    },
                };
            },
        },
        handlers: {
            parseResponse(res, requestType) {
                if (requestType === 'autoComplete') {
                    return {
                        list: res.AssociateList.slice(0, 8).map((t) => ({ title: t.Title })),
                        keyword: res.Utterance,
                    };
                }
                return res;
            },
        },
        makeRecorder({ ctx }) {
            return {
                canRecord,
                onStart() {
                    // 开始录音
                    nativeInvoke('startVoiceRecognition');
                },
                onEnd() {
                    // 停止录音
                    nativeInvoke('stopVoiceRecognition', (text) => {
                        // 识别到文本
                        ctx.postMessage({
                            type: 'text',
                            content: { text },
                        });
                    });
                },
                onCancel() {
                    // 录音
                    nativeInvoke('cancelVoiceRecognition');
                },
            };
        },
        onToolbarClick(item, ctx) {
            // 如果点的是“相册”
            if (item.type === 'image') {
                ctx.util.chooseImage({
                    // multiple: true, // 是否可多选
                    success(e) {
                        if (e.files) { // 如果有 h5 上传的图
                            const file = e.files[0];
                            // 先展示图片
                            ctx.appendMessage({
                                type: 'image',
                                content: {
                                    picUrl: URL.createObjectURL(file)
                                },
                                position: 'right'
                            });

                            // 发起请求，具体自行实现，这里以 OCR 识别后返回文本为例
                            requestOcr({ file }).then(res => {
                                ctx.postMessage({
                                    type: 'text',
                                    content: {
                                        text: res.text
                                    },
                                    quiet: true // 不展示
                                });
                            });

                        } else if (e.images) { // 如果有 app 上传的图
                            const file = e.files[0];
                            // 先展示图片
                            ctx.appendMessage({
                                type: 'image',
                                content: {
                                    picUrl: URL.createObjectURL(file)
                                },
                                position: 'right'
                            });

                            // 发起请求，具体自行实现，这里以 OCR 识别后返回文本为例
                            requestOcr({ file }).then(res => {
                                ctx.postMessage({
                                    type: 'text',
                                    content: {
                                        text: res.text
                                    },
                                    quiet: true // 不展示
                                });
                            });
                        }
                    },
                });
            }
        },
        bridge: {
            takePhoto(opts) {
                // 调用 app 的传图，这里假定调用 nativeInvoke('takePhoto')
                nativeInvoke('takePhoto', (res) => {
                    // 成功后返回图片给 onToolbarClick 使用
                    opts.success({
                        images: res
                    });
                });
            }
        }
    };
}

// 上传图片逻辑抽象
async function handleImageUpload(file, ctx) {
    const picUrl = URL.createObjectURL(file);
    ctx.appendMessage({
        type: 'image',
        content: {
            picUrl,
        },
        position: 'right'
    });

    // 假设 requestOcr 是一个已经实现的函数
    const res = await requestOcr({ file });
    ctx.postMessage({
        type: 'text',
        content: {
            text: res.text
        },
        quiet: true // 不展示
    });
}

export default function ChatUi() {
    const wrapper = useRef();
    const canRecord = true; // 这里可以根据实际逻辑进行动态判断

    useEffect(() => {
        const config = getChatSdkConfig(canRecord);
        config.root = wrapper.current; // 设置 root 为 wrapper 的当前值

        const bot = new window.ChatSDK(config);

        try {
            bot.run();
        } catch (error) {
            console.error("ChatSDK failed to run:", error);
            // 这里可以添加错误处理逻辑，比如错误上报、用户提示等
        }
    }, [canRecord, wrapper]);

    return <div style={{ height: '100%' }} ref={wrapper} />;
}

// 注意：nativeInvoke 和 requestOcr 方法需要根据实际情况进行实现。
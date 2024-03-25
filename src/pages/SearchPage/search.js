/**
 * 搜索组件，用于展示搜索结果
 * @param {Object} s - 搜索上下文，包含搜索关键字等信息
 */
import React, { useState, useEffect } from "react";
import { List } from "antd";
import axios from "axios";
import ArticalCard from "../../components/ArticalCard/ArticalCard";

const CancelToken = axios.CancelToken;
let cancel;

function Search() {
    // 获取当前网址的查询参数字符串
    const queryString = window.location.search;
    // 解析查询参数字符串
    const params = new URLSearchParams(queryString);
    // 获取参数's'的值
    const s = params.get('s');
    const [searchResults, setSearchResults] = useState([]); // 搜索结果的状态
    const [loading, setLoading] = useState(true); // 加载状态

    // 使用Effect来处理搜索逻辑
    useEffect(() => {
        // 获取搜索结果的异步函数
        const fetchData = async () => {
            try {
                const body = { searchContent: s }; // 构造请求体
                const response = await axios.post(
                    "http://localhost:8080/search-resultapi",
                    body,
                    {
                        cancelToken: new CancelToken(function executor(c) {
                            cancel = c; // 用于取消请求的函数
                        }),
                        headers: {
                            "Content-Type": "application/json", // 指定请求头
                        },
                    }
                );

                if (response.status !== 200) { // 检查响应状态
                    throw new Error(
                        `Network response was not ok. Status: ${response.status}`
                    );
                }

                setSearchResults(response.data); // 更新搜索结果
                setLoading(false); // 设置加载状态为完成
            } catch (error) {
                console.error("An unexpected error occurred:", error.message);
                setLoading(false); // 出错时，设置加载状态为完成
            }
        };

        fetchData(); // 执行搜索

        // 返回时清理，取消请求
        return () => {
            if (cancel) {
                cancel();
            }
        };
    }, [s]); // 依赖项，仅当s变化时重新执行Effect


    if (!s || loading) {
        return (
            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 mb-4">
                            <h1 className="h2 mb-4">
                                搜索结果
                                <mark>{s}</mark>
                            </h1>
                        </div>
                        <div id="search-result-main" className="col-lg-10">
                            <List loading={loading}>
                                {/* 假设ArticalCard是一个纯函数组件，这里将其封装为React.memo以优化性能 */}
                                {searchResults.map((result) => (
                                    <ArticalCard
                                        key={JSON.parse(result).id}
                                        result={result}
                                    />
                                ))}
                            </List>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 mb-4">
                        <h1 className="h2 mb-4">
                            搜索结果
                            <mark>{s}</mark>
                        </h1>
                    </div>
                    <div id="search-result-main" className="col-lg-10">
                        <List loading={loading}>
                            {searchResults.map((result) => (
                                <ArticalCard key={JSON.parse(result).id} result={result} />
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Search;

import React, { useState, useEffect } from "react";
import axios from "axios";

function Article() {
    const [articleContent, setArticleContent] = useState("");
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    // 获取当前网址的查询参数字符串
    const queryString = window.location.search;
    // 解析查询参数字符串
    const params = new URLSearchParams(queryString);
    // 获取参数'id'的值
    const id = params.get('id');
    useEffect(() => {
        const fetchArticle = async () => {
            console.log('id: ' + id);
            const response = await axios.post('http://localhost:8080/articlereadapi', { id: id });
            setArticleContent(response.data);
        };

        fetchArticle();

        return () => {
            // Cleanup function
        };
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.post('http://localhost:8080/commentapi', { articleId: id });
            setComments(response.data);
        };

        fetchComments();

        return () => {
            // Cleanup function
        };
    }, [id]);

    const handleSubmitComment = async () => {
        const articalwant = sessionStorage.getItem('articalwant');
        const userName = JSON.parse(localStorage.getItem('user')).name;
        const response = await axios.post('http://localhost:8080/commentsubmit', {
            articleId: articalwant,
            name: userName,
            comment: commentText
        });
        if (response.data) {
            alert('评论成功！');
        } else {
            alert('评论失败！');
        }
    };

    return (
        <div className="d-flex flex-column col-9" style={{ marginTop: "6rem", marginInline: "auto" }}>
            {/* 文章内容 */}
            <main dangerouslySetInnerHTML={{ __html: articleContent }} />

            {/* 评论表单 */}
            <div className="d-flex flex-column col-9 mt-3" style={{ marginInline: "auto" }}>
                <form className="comment-bar bg-primary p-3 rounded opacity-50 " style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}>
                    <div className="form-group">
                        <input type="text" name="c" id="comment-query" className="form-control" placeholder="请输入评论" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                    </div>
                    <button type="button" id="comment-submit" className="btn btn-light" onClick={handleSubmitComment}>
                        上传评论
                    </button>
                </form>
                <br className="m-2" />

                {/* 评论列表 */}
                <ul id="comment-list" style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}>
                    {comments.map((comment, index) => (
                        <li key={index} className="list-group-item">
                            <div className="comment-user font-weight-bold">{comment[0]}</div>
                            <div className="comment-time text-muted small">{comment[1]}</div>
                            <div className="comment-content mt-2">{comment[2]}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Article;

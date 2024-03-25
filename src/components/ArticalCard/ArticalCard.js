import React from 'react';

// 优化后的 ArticalCard 组件
function ArticalCard({ result }) {
    // 有效性检查，确保result是有效的JSON字符串
    let parsedResult;
    try {
        parsedResult = JSON.parse(result);
    } catch (error) {
        console.error("解析 result 失败:", error);
        return <div>解析文章信息失败</div>; // 或者显示其他友好的错误提示
    }

    return (
        <article className="card mb-4">
            <div className="row card-body">
                <div className="col-md-4 mb-4 mb-md-0">
                    <div className="post-slider slider-sm">
                        <CardImgList src={parsedResult.img} />
                    </div>
                </div>
                <div className="col-md-8">
                    <h3 className="h4 mb-3">
                        <a className="post-title" href="/" title={parsedResult.title}>
                            {parsedResult.title}
                        </a>
                    </h3>
                    <ul className="card-meta list-inline">
                        <li className="list-inline-item">
                            <a href="author-single.html" className="card-meta-author">
                                <img src="image/恬豆发芽了.webp" alt={parsedResult.author} />
                                <span>{parsedResult.author}</span>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <i className="ti-timer"></i>{parsedResult.readingtime} Min To Read
                        </li>
                        <li className="list-inline-item">
                            <i className="ti-calendar"></i>{parsedResult.datetime}
                        </li>
                        <li className="list-inline-item">
                            <ul className="card-meta-tag list-inline">
                                <li className="list-inline-item">
                                    <a href="/">{parsedResult.tag}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p>{parsedResult.mainsentence}</p>
                    <a href={`/articleread?id=${parsedResult.id}`} title={`/articleread?id=${parsedResult.id}`} className="btn btn-outline-primary">阅读更多</a>
                </div>
            </div>
        </article>
    );
}

// 优化后的 CardImgList 组件，添加 key 属性，并废除 CardImg 组件
function CardImgList({ src }) {
    // 检查src是否为数组
    const handleImages = () => {
        if (Array.isArray(src) && src.length > 0) {
            return src.map((item, index) => (
                <img key={index} src={item} className="card-img" alt="post-thumb" style={{ height: '200px', objectFit: 'cover' }} />
            ));
        } else {
            return <img src={src} className="card-img" alt="post-thumb" style={{ height: '200px', objectFit: 'cover' }} />;
        }
    }

    return <>{handleImages()}</>;
}

export default ArticalCard;
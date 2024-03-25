//返回一个数组
const getEmojis = () => {
    const custom = [
        {
            id: 'bilibili',
            name: 'Bilibili',
            emojis: [
                // 定义 Bilibili 分类下的 Octocat 表情，包含一个皮肤
                {
                    id: 'octocat',
                    name: 'Octocat',
                    keywords: ['bilibili'],
                    skins: [{ src: 'emoji/1f9ce.png' }],
                },
                // 定义 Bilibili 分类下的 Squirrel 表情，包含多个皮肤
                {
                    id: 'shipit',
                    name: 'Squirrel',
                    keywords: ['github'],
                    skins: [{ src: 'emoji/1f4aa.png' }],
                },
                {
                    id: 'octocat',
                    name: 'Octocat',
                    keywords: ['bilibili'],
                    skins: [{ src: 'emoji/1f34b.png' }],
                },
                {
                    id: 'octocat',
                    name: 'Octocat',
                    keywords: ['bilibili'],
                    skins: [{ src: 'emoji/1f44b.png' }],
                },
                {
                    id: 'octocat',
                    name: 'Octocat',
                    keywords: ['bilibili'],
                    skins: [{ src: 'emoji/1f44c.png' }],
                },
                {
                    id: 'octocat',
                    name: 'Octocat',
                    keywords: ['bilibili'],
                    skins: [{ src: 'emoji/1f44f.png' }],
                },
                {
                    id: 'octocat',
                    name: 'Octocat',
                    keywords: ['bilibili'],
                    skins: [{ src: 'emoji/1f47b.png' }],
                },
            ],
        }
    ]
    return custom;
}
export default getEmojis;
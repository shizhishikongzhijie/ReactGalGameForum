function ToolNav({chooseTool}) {
    return (
        <>
            <div className="tool-nav">
                <div className="tool-nav-item">
                    <div className="tool-nav-item-icon">
                        <img src={require('../../assets/icons/emoji.png')} alt="emoji" />
                    </div>
                    <div className="tool-nav-item-text">表情</div>
                </div>
            </div>
        </>
    )
}
export default ToolNav
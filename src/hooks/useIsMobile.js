import { useState, useEffect } from "react";
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDeviceType = () => {
            const userAgent = navigator.userAgent;
            const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
            setIsMobile(isMobile);
        };
        checkDeviceType();
        // 你也可以添加一个事件监听器来响应屏幕尺寸的变化，这里只是简单的一次性检测
    }, []);
    return {isMobile: isMobile};
}
function ImageToBase64(file) {
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); // 文件读取成功时触发
        reader.onerror = (error) => reject(error); // 文件读取失败时触发
    });
}
export default ImageToBase64;
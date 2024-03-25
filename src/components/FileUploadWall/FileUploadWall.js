import { PictureOutlined } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';
function FileUploadWall({ setContent }) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': ['.jpg', '.jpeg', '.png', '.webp'],
            'image/png': []
        },
        onDrop: acceptedFiles => {
            // 处理图片文件，这里我们简单地转换为图片URL并插入
            const imageUrl = URL.createObjectURL(acceptedFiles[0]);
            insertImage(imageUrl);
        }
    });
    const insertImage = (imageUrl) => {
        // console.log(imageUrl);
        setContent(currentContent => currentContent + `<img src="${imageUrl}" alt="" style="max-width:100px;"/>`);
    };
    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <button type="button" style={{
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                background: "none", border: "1px dashed #d9d9d9",
                borderRadius: "8px", width: "102px", height: "102px",
                margin: "10px",
            }}>
                <span role="img" aria-label="plus">
                    <PictureOutlined />
                </span>
                <div style={{ marginTop: "8px" }}>Upload</div>
            </button>
        </div >
    );

}
export default FileUploadWall;
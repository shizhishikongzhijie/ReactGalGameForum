import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
export default function App() {
    const [templateStr, setTemplateStr] = React.useState('');
    return (
        <Editor
            value={templateStr}
            id={"tincyEditor"}
            tinymceScriptSrc={'tinymce/js/tinymce/tinymce.min.js'}
            apiKey="s1jv9t37oz3x2355qllqpe85t8r3crbyf7i146fxlb8mhf50"
            init={{
                language: 'zh_CN',
                width: 1046,
                min_height: 500,
                plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave autoresize formatpainter',
                toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                images_upload_handler: (blobInfo, success, failure) => {
                    if (blobInfo.blob()) {
                        const formData = new window.FormData();
                        formData.append('myFile', blobInfo.blob(), blobInfo.filename())
                        // 将图片转为base64
                        const reader = new window.FileReader();
                        reader.onload = function (event) {
                            const base64Data = event.target.result;
                            // 在这里处理base64数据，例如发送到服务器
                            success(base64Data)
                            console.log(base64Data);
                        };
                        reader.readAsDataURL(blobInfo.blob());
                        // axios.post(`http://localhost:3300/postImg`, formData).then((res) => {
                        //     if (res.data) {
                        //         // 将图片插入到编辑器中
                        //         success(res.data.data[0])
                        //     }
                        // }).catch((error) => {
                        //     alert(error);
                        // })

                    } else {
                        alert('error');
                    }
                }
            }}
        />);


}
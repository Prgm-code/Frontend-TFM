import React, { useEffect } from 'react';
import { hdfsStore } from '../store/hdfsStore';


const FileList = () => {
    const { fileList, getFileList } = useStore();



    return (
        <div>
            {fileList.map((file) => (
                <div key={file.name}>
                    {file.name}
                </div>
            ))}
        </div>
    );
};

export default FileList;

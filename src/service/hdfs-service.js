import axios from 'axios';
const BASE_URL = "http://localhost:3500";

const uploadFile = async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': `${localStorage.getItem("token")}`
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onUploadProgress(percentCompleted);
        console.log(percentCompleted);
      },
    };

    return await axios.post(`${BASE_URL}/hdfs/upload`,  formData, config);
}



const getFileList = async () => {
    const config = {
      headers: {
        'x-access-token': `${localStorage.getItem("token")}`
      }
    };

    return await axios.get(`${BASE_URL}/hdfs/list/`, config);
}

const downloadFile = async (path) => {
    const config = {
      headers: {
        'x-access-token': `${localStorage.getItem("token")}`
      },
      responseType: 'blob'
    };

    return await axios.get(`${BASE_URL}/hdfs/read/${path}`, config);
}

const removeFile = async (path) => {
    const config = {
      headers: {
        'x-access-token': `${localStorage.getItem("token")}`
      }
    };

    return await axios.delete(`${BASE_URL}/hdfs/remove/${path}`, config);
}

export { uploadFile, getFileList, downloadFile, removeFile };

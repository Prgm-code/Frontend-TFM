import {create} from 'zustand';
import { uploadFile as serviceUploadFile, getFileList, downloadFile, removeFile } from '../service/hdfs-service';

const useHdfsStore = create((set) => ({
  fileList: [],
  uploadProgress: 0,
  error: null,
  result: null,
  uploadFile: async (file, ) => {
    try {
        const response = await serviceUploadFile(file, (progress) => {
          set({ uploadProgress: progress });
        });
       console.log(response);
        set({ result: response.data , uploadProgress: 0 });
  
      } catch (error) {
        console.log(error);
        set({ error: error.response.data.message });
      }
    },

  getFileList: async () => {
    try {
      const response = await getFileList();
      set({ fileList: response.data.files });
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message });
    }
  },
  downloadFile: async (path) => {
    try {
      const response = await downloadFile(path );
      let url = window.URL.createObjectURL(new Blob([response.data]));
      let link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', path.split('/').pop());
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message });
    }
  },
  removeFile: async (path ) => {
    try {
      await removeFile(path);   
        const response = await getFileList();
      set((state) => ({ result: response.data, error: null }));
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message });
    }
  },
}));

export default useHdfsStore;

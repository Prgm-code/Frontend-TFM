import React, { useState } from "react";
import useHdfsStore from "../store/hdfsStore.js";
import FileNode from "./FileNode.jsx";
import FileUpload from "./FileUpload.jsx";

export default function FileBrowser() {
  const fileList = useHdfsStore((state) => state.fileList);
  const getFileList = useHdfsStore((state) => state.getFileList);

  useState(() => {
    getFileList();
  }, []);

  console.log(fileList);

  return (
    <div>
        <FileUpload />
     <FileNode fileList={fileList} />
    </div>
  );
}

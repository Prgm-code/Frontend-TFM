import React, { useState } from "react";
import useHdfsStore from "../store/hdfsStore.js";
import FileNode from "./FileNode.jsx";
import FileUpload from "./FileUpload.jsx";
import { useAuthStore } from "../store/usersStore.js";

export default function FileBrowser() {
  const fileList = useHdfsStore((state) => state.fileList);
  const getFileList = useHdfsStore((state) => state.getFileList);
  const user = useAuthStore((state) => state.user);

  useState(() => {
    getFileList();
  }, []);

  console.log(fileList);

  return user ? (
    <div>
      <FileUpload />
      <FileNode fileList={fileList} />
    </div>
  ) : (
    <div className="card-container" style={{ marginTop: "2rem" }}>
      <h1>Forbidden</h1>
    </div>
  );
}

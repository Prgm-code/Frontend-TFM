import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Icon,
  Container,
  Confirm,
  Message,
  Loader
} from "semantic-ui-react";
import {
  FaFile,
  FaFileCsv,
  FaFileCode,
  FaFileExcel,
  FaFilePdf,
  FaFolder,
  FaDatabase,
  FaFileImage,
  FaFileVideo,
  FaFileAudio,
} from "react-icons/fa";
import useHdfsStore from "../store/hdfsStore";

const FileNode = ({ fileList }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const removeFile = useHdfsStore((state) => state.removeFile);
  const getFileList = useHdfsStore((state) => state.getFileList);
  const downloadFile = useHdfsStore((state) => state.downloadFile);
  const result = useHdfsStore((state) => state.result);
  const error = useHdfsStore((state) => state.error);
  const [showMessage, setShowMessage] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState(null);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const getIcon = (fileName) => {
    const extension = fileName ? fileName.split(".").pop().toLowerCase() : "";
    switch (extension) {
      case "csv":
        return <FaFileCsv size={24} />;
      case "xml":
        return <FaFileCode size={24} />;
      case "sql":
        return <FaDatabase size={24} />;
      case "json":
        return <FaFileCode size={24} />;
      case "xlsx":
        return <FaFileExcel size={24} />;
      case "pdf":
        return <FaFilePdf size={24} />;
      case "jpg":
        return <FaFileImage size={24} />;
      case "jpeg":
        return <FaFileImage size={24} />;
      case "png":
        return <FaFileImage size={24} />;
      case "gif":
        return <FaFileImage size={24} />;
      case "mp4":
        return <FaFileVideo size={24} />;
      case "mov":
        return <FaFileVideo size={24} />;
      case "mp3":
        return <FaFileAudio size={24} />;
      case "wav":
        return <FaFileAudio size={24} />;
      default:
        return <FaFile size={24} />;
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleDelete = (file) => {
    setFileToDelete(file);
    setConfirmOpen(true);
  };
  const handleDeleteFolder = (file) => {
    setFileToDelete(file);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (fileToDelete) {
      console.log("fileToDelete", fileToDelete.pathSuffix);

      await removeFile(fileToDelete.pathSuffix);
      await getFileList();
      setShowMessage(true);
    }
    setConfirmOpen(false);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
  };
  const handleDownload = async (file) => {
    setDownloadingFile(file);
    try {
        await downloadFile(file.pathSuffix);
    } catch (error) {
        console.log(error);
        }
    setDownloadingFile(null);
  }

  return (
    <Container>
      <Confirm
        open={confirmOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        content={`Are you sure you want to delete ${
          fileToDelete ? fileToDelete.pathSuffix : ""
        }?`}
      />
      {showMessage && (
        <Message
          onDismiss={() => setShowMessage(false)}
          positive={result != null}
          negative={error != null}
          header={result != null ? `file: ${fileToDelete.pathSuffix} deleted`  : "Error!"}
          content={result != null ? result.Message : error.Message}
        />
      )}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Size</Table.HeaderCell>
            <Table.HeaderCell>Modification Time</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>Permissions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {fileList.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan="7" textAlign="center">
                No files
              </Table.Cell>
            </Table.Row>
          ) : (
            fileList.map((file) => (
              <Table.Row key={file.fileId}>
                <Table.Cell>
                  {file.type === "DIRECTORY" ? (
                    <FaFolder size={24} />
                  ) : (
                    getIcon(file.pathSuffix)
                  )}
                </Table.Cell>
                <Table.Cell>{file.pathSuffix}</Table.Cell>
                <Table.Cell>{formatBytes(file.length)}</Table.Cell>
                <Table.Cell>
                  {formatTimestamp(file.modificationTime)}
                </Table.Cell>
                <Table.Cell>{file.owner}</Table.Cell>
                <Table.Cell>{file.permission}</Table.Cell>
                <Table.Cell>
                  {file.type === "DIRECTORY" ? (
                    <div className="actionFileBox">
                      <Button
                        color="blue"
                        onClick={() => {
                          /* Navegar a la carpeta */
                        }}
                        title="Open"
                      >
                        <Icon name="folder open" /> Open
                      </Button>
                      <Button
                        color="red"
                        onClick={() => handleDeleteFolder(file)}
                        title="Delete"
                      >
                        <Icon name="delete" /> Delete
                      </Button>
                    </div>
                  ) : (
                    <div className="actionFileBox">
                        
                      <Button
                        color="green"
                        onClick={() => {
                            handleDownload (file)
                        }}
                        title="Download"
                      >
                        {downloadingFile === file ? (
                      <Loader active inverted inline size="tiny" />
                    ) : (
                      <>
                        <Icon name="download" /> Download
                      </>
                    )}
                      </Button>
                      <Button
                        color="red"
                        onClick={() => handleDelete(file)}
                        title="Delete"
                      >
                        <Icon name="delete" /> Delete
                      </Button>
                    </div>
                  )}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default FileNode;

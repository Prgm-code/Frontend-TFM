import React, { useState, useEffect } from 'react';
import { Button, Progress, Container, Icon, Header, Table, Message } from 'semantic-ui-react';
import useHdfsStore from '../store/hdfsStore';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const uploadProgress = useHdfsStore((state) => state.uploadProgress);
  const uploadFile = useHdfsStore((state) => state.uploadFile);
  const result = useHdfsStore((state) => state.result);
  const error = useHdfsStore((state) => state.error);
  const getFileList = useHdfsStore((state) => state.getFileList);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);
      setSelectedFile(null); // reset selected file
      await getFileList();
      setShowMessage(true);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <Container style={{ marginBottom: '1em' }}>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3'><Header as='h2'>File Upload</Header></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Button as="label" htmlFor="file" type="button" animated="fade" size="large">
                <Button.Content visible>
                  <Icon name="file" />
                </Button.Content>
                <Button.Content hidden>Choose File</Button.Content>
              </Button>
              <input type="file" id="file" style={{ display: 'none' }} onChange={handleFileChange} />
              <Button onClick={handleUploadClick} disabled={!selectedFile} size="large">Upload</Button>
            </Table.Cell>
            <Table.Cell>
              {selectedFile && <><strong>Selected File:  </strong> {selectedFile.name}</>}
            </Table.Cell>
            <Table.Cell>
              {uploadProgress > 0 && <Progress percent={uploadProgress} indicating />}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      {showMessage && (
        <Message 
          onDismiss={() => setShowMessage(false)}
          positive={result != null}
          negative={error != null}
          header={result != null ? "Success!" : "Error!"}
          content={result != null ? result : error}
        />
      )}
    </Container>
  );
};

export default FileUpload;

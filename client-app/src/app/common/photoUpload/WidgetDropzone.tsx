import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

interface IProps {
  setFiles: (files: object[]) => void;
}

const dropZoneStyles = {
  border: "dashed 3px",
  borderColor: "#eee",
  paddingTop: "10px",
  height: "200px",
  textAlign: "center" as "center"
};

const dropZoneActive = {
  borderColor: "green"
};

const WidgetDropzone: React.FC<IProps> = ({ setFiles }) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setFiles(
      acceptedFiles.map((file: object) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
    console.log(acceptedFiles);
  }, [setFiles]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropZoneStyles, ...dropZoneActive } : dropZoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop files here, or click to select" />
      {/* {isDragActive ? (<p>Drop files here..</p>) : (<p>Drag and Drop files here, or click to select files</p> )} */}
    </div>
  );
};

export default WidgetDropzone;

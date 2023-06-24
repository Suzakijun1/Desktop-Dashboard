import React from "react";

// const FileOpenButton = () => {
//   const handleFileOpen = () => {
//     window.electron.send("open-file-dialog");
//   };
export default function FileOpenButton({}) {
  return (
    <button
      onClick={() => {
        electron.openFileDialog();
      }}
    >
      Open File
    </button>
  );
}
// export default FileOpenButton;

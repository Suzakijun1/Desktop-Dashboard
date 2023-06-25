import React from "react";

// const FileOpenButton = () => {
//   const handleFileOpen = () => {
//     window.electron.send("open-file-dialog");
//   };
export default function FileOpenButton({ }) {
  return (
    <button
      onClick={async () => {
        const result = await electron.openFileDialog();
        console.log(result);
      }}
    >
      Open File
    </button>
  );
}
// export default FileOpenButton;

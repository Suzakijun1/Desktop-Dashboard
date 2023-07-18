import React from "react";

export default function FileOpenButton({}) {
  return (
    <div>
      <button
        onClick={async () => {
          const result = await electron.openFileDialog();

          console.log(result);
        }}
      >
        Open File
      </button>
      <button
        onClick={async () => {
          const items = await electron.openSaveFileDialog();
          console.log(items);
        }}
      >
        Launch File
      </button>
    </div>
  );
}
// export default FileOpenButton;

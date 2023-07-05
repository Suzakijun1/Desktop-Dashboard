import React from "react";
import Button from "../todolistComponents/Button";
export default function RunMacroButton({ electron, workflow }) {
  return (
    <div>
      <Button
        variant="success"
        onClick={() => {
          // On click open all the apps in the macro
          workflow.macro.forEach((app) => {
            electron.openApp(app.route, app.arguments);
          });
        }}
      >
        Open Apps in Macro
      </Button>
    </div>
  );
}

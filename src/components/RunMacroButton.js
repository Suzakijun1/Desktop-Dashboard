import React from "react";

export default function RunMacroButton({electron, workflow}){


    return(
        <div>
            <button onClick={() => {
                // On click open all the apps in the macro
                workflow.macro.forEach((app) => {
                    electron.openApp(app.route, app.arguments);
                }
                )
            }}>
                  Open Apps in Macro
            </button>
        </div>
    )
}
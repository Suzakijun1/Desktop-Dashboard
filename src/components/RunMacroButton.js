import React from "react";

export default function RunMacroButton({workflow, electron}){


    return(
        <div>
            <button onClick={() => {
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
import React from "react";

export default function RunMacroButton({macro}){


    return(
        <div>
            <button onClick={() => {
                macro.forEach((app) => {
                    electron.openApp(app.route, app.arguments);
                }
                )
            }}>
                  Open Apps in Macro
            </button>
        </div>
    )
}
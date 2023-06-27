import React from "react";
import { prompt } from "smalltalk";

export default function AddToMacroButton({ macro, updateMacro }) {

    return (
        <div>
            <button onClick={async () => {
                try {
                    const appRoute = await electron.openFileDialog();
                    console.log(appRoute);
                    const appName = await prompt("Enter a name for this app", "App Name");
                    let args = await prompt("Enter any arguments for this app", "Arguments");
                    args = args.split(" ");
                    const newItem = {
                        id: String(macro.length + 1),
                        name: appName,
                        route: appRoute,
                        arguments: args
                    }
                    updateMacro((oldMacro) => [...oldMacro, newItem]);
                } catch (err) {
                    console.log(err);
                }
            }
            }>
                Add to Macro
            </button>
        </div>

    )
}
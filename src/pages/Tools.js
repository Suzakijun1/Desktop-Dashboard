import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../todolistComponents/Button";
const ToolsPage = () => {
  // Define an array of tool names and corresponding routes
  const tools = [
    { name: "Todo List", route: "/todolist" },
    { name: "Clipboard", route: "/clipboard" },
    { name: "Weather", route: "/weather" },
    // Add more tools as needed
  ];

  return (
    <div>
      <h1>Tools</h1>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          listStyle: "none",
          gap: "1rem",
        }}
      >
        {tools.map((tool, index) => (
          <li key={index}>
            <Link to={tool.route} style={{ textDecoration: "none" }}>
              <Button variant="tools">{tool.name}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsPage;

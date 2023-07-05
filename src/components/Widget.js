import React from "react";
import ToDoList from "../pages/ToDoList";

const Widget = ({
  id,
  name,
  icon,
  size = { width: 200, height: 150 },
  position = { top: 0, left: 0 },
  onRemove,
  onSizeChange,
  onPositionChange,
}) => {
  const handleSizeChange = (event) => {
    const newSize = {
      width: event.target.value,
      height: event.target.value,
    };
    onSizeChange(id, newSize);
  };

  const handlePositionChange = (event) => {
    const newPosition = {
      top: event.target.value,
      left: event.target.value,
    };
    onPositionChange(id, newPosition);
  };

  return (
    <div
      className="widget"
      style={{
        width: size.width,
        height: size.height,
        top: position.top,
        left: position.left,
      }}
    >
      <div className="widget-header">
        <span className="widget-icon">{icon}</span>
        <span className="widget-name">{name}</span>
        <button className="remove-widget" onClick={onRemove}>
          Remove
        </button>
      </div>
      <div className="widget-content">{/* <ToDoList /> */}</div>
      <div className="widget-customization">
        <label>
          Width:
          <input type="number" value={size.width} onChange={handleSizeChange} />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={size.height}
            onChange={handleSizeChange}
          />
        </label>
        <label>
          Top Position:
          <input
            type="number"
            value={position.top}
            onChange={handlePositionChange}
          />
        </label>
        <label>
          Left Position:
          <input
            type="number"
            value={position.left}
            onChange={handlePositionChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Widget;

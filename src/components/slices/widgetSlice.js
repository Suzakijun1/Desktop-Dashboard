import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import Weather from "../Weather";

const initialState = {
  widgets: [
    {
      id: 1,
      name: "ToDoList",
      // other properties specific to the widget
    },
    {
      id: 2,
      name: "WeatherWidget",

      // other properties specific to the widget
    },
    // Add more widgets as needed
  ],
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      state.widgets.push(action.payload);
    },
    updateWidget: (state, action) => {
      const { id, name, selectedWidgets } = action.payload;
      const widget = state.widgets.find((widget) => widget.id === id);
      if (widget) {
        widget.name = name;
        widget.selectedWidgets = selectedWidgets;
      }
    },
  },
});

export const { addWidget, updateWidget } = widgetSlice.actions;
export default widgetSlice.reducer;

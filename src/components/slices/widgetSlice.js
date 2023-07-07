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
  selectedWidget: [],
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      state.widgets.push(action.payload);
    },
    setSelectedWidget: (state, action) => {
      state.selectedWidget = action.payload;
    },
  },
});

export const { addWidget, setSelectedWidget } = widgetSlice.actions;
export default widgetSlice.reducer;

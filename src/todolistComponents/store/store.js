import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";
import widgetReducer from "../../components/slices/widgetSlice";
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    widgets: widgetReducer,
  },
});

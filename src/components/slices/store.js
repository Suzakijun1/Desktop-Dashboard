// Configure your Redux store
import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "./slices/widgetSlice";

const store = configureStore({
  reducer: {
    widgets: widgetReducer,
    // other reducers...
  },
});

export default store;

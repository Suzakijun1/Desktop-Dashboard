import { createSlice } from "@reduxjs/toolkit";


const initialMacroState = {
  macroList: [],
};

export const macroSlice = createSlice({
  name: "macro",
  initialState: initialMacroState,
  reducers: {
    addMacro: (state, action) => {
      state.macroList.push(action.payload);
    },
    updateMacro: (state, action) => {
      const { id, ...updatedMacroData } = action.payload;
      const macro = state.macroList.find((macro) => macro.id === id);
      if (macro) {
        Object.assign(macro, updatedMacroData);
      }
    },
    deleteMacro: (state, action) => {
      const macroIndex = state.macroList.findIndex(
        (macro) => macro.id === action.payload
      );
      if (macroIndex !== -1) {
        state.macroList.splice(macroIndex, 1);
      }
    },
  },
});

export const { addMacro, updateMacro, deleteMacro } = macroSlice.actions;
export default macroSlice.reducer;

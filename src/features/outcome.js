import {createSlice} from "@reduxjs/toolkit";
export const gridSlice = createSlice({
  name:"grid",
  initialState :{value:0},
  reducers:{
gridState:(state,action)=>{
return{
  ...state,
  value:action.payload
}
}
  }
})
export default gridSlice.reducer;
export const {gridState} = gridSlice.actions
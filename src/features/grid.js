import {createSlice} from "@reduxjs/toolkit";
export const gridSlice = createSlice({
  name:"grid",
  initialState :{value:2},
  reducers:{
gridState:(state,action)=>{
return{
  ...state,
  value:state.value * 2
}
}
  }
})
export default gridSlice.reducer;
export const {gridState} = gridSlice.actions
import {createSlice} from "@reduxjs/toolkit";
export const levelSlice = createSlice({
  name:"level",
  initialState :{value:1},
  reducers:{
levelState:(state,action)=>{
return{
  ...state,
  value:action.payload
}
}
  }
})
export default levelSlice.reducer;
export const {levelState} = levelSlice.actions
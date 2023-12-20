import { createSlice } from "@reduxjs/toolkit";




const UserSlice = createSlice({
    name:'user',
    initialState:{
        name: "",
        email:"",
        modules:[]},
    reducers:{
        takeUsername:(state,action)=>{
            state.name=action.payload
        },
        takeUseremail:(state,action)=>{
            state.email = action.payload
        },
        takemodules:(state,action)=>{
            if(action.payload)
            {
                state.modules= Object.values(action.payload)
            }
        },
        removemodule: (state,action)=>{
            state.modules = state.modules.filter((e)=>e.modulename !==action.payload)
        }
    }
})

export const {takeUseremail,takeUsername,takemodules,removemodule} = UserSlice.actions;
export default UserSlice.reducer;

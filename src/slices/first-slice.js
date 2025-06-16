import { createSlice } from "@reduxjs/toolkit";

export const firstSlice = createSlice({
  name: "first",
  initialState: {
    data: [
      {
        name: "kastro",
        id: 1,
      },
      {
        name: "bot",
        id: 2,
      },
    ],
  },
  reducers: {
    delUser: (state, action) => {
      state.data = state.data.filter((el) => el.id != action.payload);
    },
    addUser: (state, action) => {
      let newUser = {
        id: Date.now(),
        name: action.payload,
      };
      state.data = [...state.data, newUser];
    },
    editUser:(state,action)=>{
        state.data=state.data.map((el)=>el.id==action.payload.idx?{...el,name:action.payload.name}:el)
    }
  },
});

export const { delUser, addUser ,editUser } = firstSlice.actions;

export default firstSlice.reducer;

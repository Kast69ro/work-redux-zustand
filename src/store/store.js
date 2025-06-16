  import { configureStore } from "@reduxjs/toolkit";
import  firstSlice  from "../slices/first-slice";
import  secondSlice  from "../slices/second-slice";

  export  const store = configureStore({
    reducer:{
        first:firstSlice,
        second:secondSlice
    }
  })
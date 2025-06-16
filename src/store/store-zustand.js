import axios from "axios";
import { create } from "zustand";

export const useStore = create((set,get) => ({
  data: [
    {
      id: 1,
      name: "bot",
    },
    {
      id: 2,
      name: "fake",
    },
  ],
  deleteUs: (id) =>
    set((state) => ({
      data: state.data.filter((el) => el.id != id),
    })),
  addUser: (user) =>
    set((state) => ({
      data: (state.data = [...state.data, user]),
    })),
  editUser: ({ id, name }) =>
    set((state) => ({
      data: (state.data = state.data.map((el) =>
        el.id == id ? { ...el, name: name } : el
      )),
    })),

  users: [],
   get: async () => {
    try {
      const res = await axios.get("https://to-dos-api.softclub.tj/api/to-dos");
      set({ data: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },

  deleteUs: async (id) => {
    try {
      await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`);
      await get().get();
    } catch (error) {
      console.log(error);
    }
  },

  // Добавить задачу
  addUser: async (newUser) => {
    try {
      await axios.post("https://to-dos-api.softclub.tj/api/to-dos", newUser);
      await get().get();
    } catch (error) {
      console.log(error);
    }
  },

  // Редактировать задачу
  editUser: async (editedUser) => {
    try {
      await axios.put("https://to-dos-api.softclub.tj/api/to-dos", editedUser);
      await get().get();
    } catch (error) {
      console.log(error);
    }
  },

  delImage: async (id) => {
    try {
      await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos/images/${id}`);
      await get().get();
    } catch (error) {
      console.log(error);
    }
  },

  addImages: async ({ id, img }) => {
    try {
      await axios.post(`https://to-dos-api.softclub.tj/api/to-dos/${id}/images`, img);
      await get().get();
    } catch (error) {
      console.log(error);
    }
  },

  complit: async (id) => {
    try {
      await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`);
      await get().get();
    } catch (error) {
      console.log(error);
    }
  },
}));

  

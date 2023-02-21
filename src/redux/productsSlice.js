import { createSlice } from "@reduxjs/toolkit";
import { db } from "../db/firebase";
import { collection, getDocs } from "firebase/firestore";
import { STATUS } from "../utils/enums";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setProducts: (state, action) => ({
      ...state,
      products: action.payload,
    }),
    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setProducts, setStatus } = productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = () => {
  return function fetchProductsThunk(dispatch) {
    // dispatching loading status
    dispatch(setStatus(STATUS.LOADING));
    // fetching data from firestore db
    const productsColl = collection(db, "products");
    getDocs(productsColl)
      .then((snapshot) => {
        const payload = snapshot.docs.map((pro) => ({
          id: pro.id,
          ...pro.data(),
        }));
        dispatch(setStatus(STATUS.IDLE));
        dispatch(setProducts(payload));
      })
      .catch((err) => dispatch(setStatus(STATUS.ERROR)));
  };
};

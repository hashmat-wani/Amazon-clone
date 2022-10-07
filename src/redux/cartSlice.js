import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/enums";
import { db } from "../db/firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setCartProducts: (state, action) => ({
      ...state,
      cartProducts: action.payload,
    }),
    // setCartProducts: (state, action) => {
    //   state.cartProducts = action.payload;
    // },

    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    // setStatus: (state, action) => {
    //   state.status = action.payload;
    // },
  },
});

export const { setCartProducts, setStatus } = cartSlice.actions;

export default cartSlice.reducer;

const cartColl = collection(db, "cartitems");

export const fetchCartProducts = () => {
  return function fetchCartProductsThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    getDocs(cartColl)
      .then((snapshot) => {
        const payload = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setCartProducts(payload));
        dispatch(setStatus(STATUS.IDLE));
      })
      .catch(() => dispatch(setStatus(STATUS.ERROR)));
  };
};

export const addToCart = ({ id, title, price, image }) => {
  return function addTocartThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    const cartItemDoc = doc(db, "cartitems", id);
    getDoc(cartItemDoc)
      .then((docSnap) => {
        if (docSnap.exists()) {
          updateDoc(cartItemDoc, { qty: docSnap.data().qty + 1 });
        } else {
          setDoc(doc(cartColl, id), {
            title,
            price,
            image,
            qty: 1,
          });
        }
        dispatch(fetchCartProducts());
        // dispatch(setStatus(STATUS.IDLE));
      })
      .catch(() => dispatch(setStatus(STATUS.ERROR)));
  };
};

export const changeCartItemQty = (id, newQty) => (dispatch) => {
  const qtyItemDoc = doc(db, "cartitems", id);
  dispatch(setStatus(STATUS.LOADING));
  updateDoc(qtyItemDoc, { qty: +newQty })
    .then(() => {
      dispatch(fetchCartProducts());
      //   dispatch(setStatus(STATUS.IDLE));
    })
    .catch(() => dispatch(setStatus(STATUS.ERROR)));
};

export const deleteFromCart = (id) => (dispatch) => {
  const qtyItemDoc = doc(db, "cartitems", id);
  dispatch(setStatus(STATUS.LOADING));
  deleteDoc(qtyItemDoc)
    .then(() => {
      dispatch(fetchCartProducts());
      //   dispatch(setStatus(STATUS.IDLE));
    })
    .catch(() => dispatch(setStatus(STATUS.ERROR)));
};

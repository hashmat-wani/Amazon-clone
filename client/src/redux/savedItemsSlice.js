// import { createSlice } from "@reduxjs/toolkit";
// import { STATUS } from "../utils/enums";
// import { db } from "../db/firebase";
// import {
//   doc,
//   setDoc,
//   getDoc,
//   getDocs,
//   deleteDoc,
//   collection,
// } from "firebase/firestore";
// import { fetchCartItems } from "./cartSlice";

// const savedItemsSlice = createSlice({
//   name: "savedItems",
//   initialState: {
//     savedItems: [],
//     status: STATUS.IDLE,
//   },
//   reducers: {
//     setsavedItems: (state, action) => ({
//       ...state,
//       savedItems: action.payload,
//     }),

//     setStatus: (state, action) => ({
//       ...state,
//       status: action.payload,
//     }),
//   },
// });

// export const { setsavedItems, setStatus } = savedItemsSlice.actions;

// export default savedItemsSlice.reducer;

// const savedItemsColl = collection(db, "saveditems");

// export const fetchSavedItems = () => {
//   return function fetchSavedItemsThunk(dispatch) {
//     dispatch(setStatus(STATUS.LOADING));
//     getDocs(savedItemsColl)
//       .then((snapshot) => {
//         const payload = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         dispatch(setsavedItems(payload));
//         dispatch(setStatus(STATUS.IDLE));
//       })
//       .catch(() => dispatch(setStatus(STATUS.ERROR)));
//   };
// };

// export const saveForLater =
//   ({ id, title, price, image }) =>
//   (dispatch) => {
//     const cartItemDoc = doc(db, "cartitems", id);
//     dispatch(setStatus(STATUS.LOADING));
//     deleteDoc(cartItemDoc)
//       .then(() => {
//         dispatch(fetchCartItems());
//         const savedItemDoc = doc(db, "saveditems", id);
//         getDoc(savedItemDoc).then((docSnap) => {
//           if (!docSnap.exists()) {
//             setDoc(doc(savedItemsColl, id), {
//               title,
//               price,
//               image,
//             });
//             dispatch(fetchSavedItems());
//           }
//         });
//       })
//       .catch(() => dispatch(setStatus(STATUS.ERROR)));
//   };

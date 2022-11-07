// import { createSlice } from "@reduxjs/toolkit";
// import { STATUS } from "../utils/enums";
// import { db } from "../db/firebase";
// import {
//   doc,
//   setDoc,
//   getDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   collection,
//   query,
//   where,
//   onSnapshot,
//   arrayUnion,
// } from "firebase/firestore";
// import { getItem, setItem } from "../utils/localstorage";
// // import firebase from "firbase";
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: [],
//     status: STATUS.IDLE,
//   },
//   reducers: {
//     setCartItems: (state, action) => ({
//       ...state,
//       cartItems: action.payload,
//     }),

//     // In redux toolkit we can directly mutate the state also
//     // setCartItems: (state, action) => {
//     //   state.cartItems = action.payload;
//     // },

//     setStatus: (state, action) => ({
//       ...state,
//       status: action.payload,
//     }),
//   },
// });

// export const { setCartItems, setStatus } = cartSlice.actions;

// export default cartSlice.reducer;

// const cartItemsColl = collection(db, "cartitems");

// export const fetchCartItems = (email) => (dispatch) => {
//   dispatch(setStatus(STATUS.LOADING));
//   if (!email) {
//     dispatch(setCartItems(getItem("ls_cartData") || []));
//     dispatch(setStatus(STATUS.IDLE));
//   } else {
//     onSnapshot(
//       cartItemsColl,
//       (snapshot) => {
//         let payload = [];
//         console.log(snapshot.docs); //array of cart docs
//         snapshot.docs.map((productDoc) => {
//           const filter = productDoc
//             .data()
//             .users.filter((el) => el.email === email);

//           console.log(filter);
//           if (filter.length) {
//             // const test = [...payload];
//             // getDoc(doc(db, "products", productDoc.id)).then((snap) => {
//             //   // store
//             //   // payload.push(snap.data());
//             //   // test.push(snap.data());
//             //   // console.log(payload);
//             //   testing(snap.data());
//             // });
//             onSnapshot(doc(db, "products", productDoc.id), (d) => {
//               payload = Object.assign([], payload);
//               payload.push({ cartQty: filter[0].qty, ...d.data() });
//             });
//             //   console.log(d.data());
//             //
//             //   payload.push(d.data());
//             // payload = [
//             //   ...payload,
//             //   // {
//             //   //   ...d.data(),
//             //   //   cartQty: filter[0].qty,
//             //   // },
//             // ];
//             // });
//           }
//         });
//         console.log(payload);
//         dispatch(setCartItems(payload));
//       },
//       (err) => dispatch(setStatus(STATUS.ERROR))
//     );
//   }
// };

// // console.log(payload);
// // console.log(ids);
// // console.log(ids);
// // const idsFilter = query(
// //   collection(db, "products"),
// //   where("__name__", "in", ids)
// // );
// // onSnapshot(idsFilter, (snapshot) => {
// //   const payload = snapshot.docs.map((doc) => ({
// //     id: doc.id,
// //     ...doc.data(),
// //   }));
// // dispatch(setCartItems(payload));
// // dispatch(setStatus(STATUS.IDLE));
// // (err) => () => dispatch(setStatus(STATUS.ERROR))
// // );
// // }
// // getDocs(q)
// //   .then((snapshot) => {
// //     // dispatch(setProducts(payload));

// //     snapshot.docs.map((doc) => {
// //       console.log(doc.id);
// // onSnapshot(doc(db, "products", doc.id), (doc) => console.log(doc));
// // .then((docSnap) =>
// //   console.log(docSnap.data())
// // );
// // const productsColl = collection(db, "products");
// // const q2 = query(productsColl, where("id", "==", doc.id));
// // getDocs(q2).then((snapshot) => {
// //   const payload = snapshot.docs.map((pro) => ({
// //     id: pro.id,
// //     ...pro.data(),
// //   }));

// // });

// // id: doc.id,

// // ...doc.data(),
// // });
// // console.log(payload1);
// //
// //   },)
// //   // .catch(() => dispatch(setStatus(STATUS.ERROR)));
// // }

// // let payload = [];
// // const store = (payload, data) => {
// //   if (data) payload.push(data);
// //   return payload;
// // };

// export const addToCart = (id, email) => {
//   return function addTocartThunk(dispatch) {
//     dispatch(setStatus(STATUS.LOADING));
//     if (email) {
//       const cartItemDoc = doc(db, "cartitems", id);
//       getDoc(cartItemDoc)
//         .then((docSnap) => {
//           if (docSnap.exists()) {
//             const idx = docSnap
//               .data()
//               .users.findIndex((el) => el.email === email);
//             console.log(idx);
//             if (idx > -1) {
//               const updatedData = docSnap
//                 .data()
//                 .users.map((el, i) =>
//                   i === idx ? { ...el, qty: (el.qty += 1) } : el
//                 );
//               updateDoc(cartItemDoc, {
//                 users: updatedData,
//               });
//             } else {
//               updateDoc(cartItemDoc, {
//                 users: arrayUnion({
//                   email,
//                   qty: 1,
//                   id,
//                 }),
//               });
//             }
//           } else {
//             setDoc(doc(cartItemsColl, id), {
//               users: [
//                 {
//                   email,
//                   qty: 1,
//                   id,
//                 },
//               ],
//             });
//           }
//           dispatch(fetchCartItems(email));
//         })
//         .catch(() => dispatch(setStatus(STATUS.ERROR)));
//     } else {
//       let flag = false;
//       let ls_cartData = getItem("ls_cartData") || [];
//       if (ls_cartData.length) {
//         ls_cartData.forEach((item) => {
//           if (item.id == id) {
//             item.qty += 1;
//             flag = true;
//           }
//         });
//       }
//       !flag && ls_cartData.push({ id, qty: 1 });
//       setItem("ls_cartData", ls_cartData);
//       dispatch(fetchCartItems(email));
//     }
//   };
// };

// export const changeCartItemQty = (id, newQty, email) => (dispatch) => {
//   console.log(newQty);
//   const qtyItemDoc = doc(db, "cartitems", id);
//   dispatch(setStatus(STATUS.LOADING));
//   updateDoc(qtyItemDoc, { qty: +newQty })
//     .then(() => {
//       dispatch(fetchCartItems(email));
//     })
//     .catch(() => dispatch(setStatus(STATUS.ERROR)));
// };

// export const deleteFromCart = (id, email) => (dispatch) => {
//   const qtyItemDoc = doc(db, "cartitems", id);
//   dispatch(setStatus(STATUS.LOADING));
//   deleteDoc(qtyItemDoc)
//     .then(() => {
//       dispatch(fetchCartItems(email));
//     })
//     .catch(() => dispatch(setStatus(STATUS.ERROR)));
// };

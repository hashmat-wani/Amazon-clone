// import React, { useState } from "react";
// import styled from "styled-components";
// import { db } from "../../db/firebase";
// import { setDoc, doc, collection } from "firebase/firestore";
// import { useSelector } from "react-redux";

// const AddProduct = () => {
//   const { products } = useSelector((state) => state.productsReducer);

//   const [productDetails, setProductDetails] = useState({
//     category: [],
//   });

//   const productsColl = collection(db, "products");

//   const categories = [
//     "men",
//     "women",
//     "electronics",
//     "footwear",
//     "clothing",
//     "home",
//   ];
//   const tags = ["bestseller", "amazon_choice", "new", "false"];

//   const handleFormData = (e) => {
//     const { name, value, checked, type } = e.target;

//     console.log(type, value);
//     if (checked && name === "category") {
//       setProductDetails({
//         ...productDetails,
//         [name]: [...productDetails[name], value],
//       });
//     } else if (!checked && name === "category") {
//       setProductDetails({
//         ...productDetails,
//         [name]: productDetails[name].filter((e) => e !== value),
//       });
//     } else {
//       setProductDetails({
//         ...productDetails,
//         [name]:
//           type === "checkbox" ? checked : type === "number" ? +value : value,
//       });
//     }
//   };

//   const addProduct = async (e) => {
//     e.preventDefault();
//     setDoc(doc(productsColl, String(products.length + 1)), productDetails, {
//       merge: true,
//     })
//       .then((res) => console.log("result,", res))
//       .catch((err) => console.log("err,", err));
//   };
//   return (
//     <Container className="border">
//       <form onSubmit={addProduct}>
//         <fieldset>
//           <legend>Add Product Details</legend>
//           <h4>Category:</h4>
//           {categories.map((cat, i) => (
//             <Input key={i}>
//               <input
//                 onInput={handleFormData}
//                 type="checkbox"
//                 name="category"
//                 value={cat}
//               />
//               {cat}
//             </Input>
//           ))}

//           <Input>
//             Coupon:
//             <input onChange={handleFormData} type="number" name="coupon" />
//           </Input>

//           <Input>
//             Delivery Duration:
//             <input
//               onChange={handleFormData}
//               type="number"
//               name="delivery_duration"
//             />
//           </Input>

//           <Input>
//             Discount Price:
//             <input
//               onChange={handleFormData}
//               type="number"
//               name="discount_price"
//               step=".01"
//             />
//           </Input>

//           <Input>
//             first Delivery Free:
//             <input
//               onInput={handleFormData}
//               type="checkbox"
//               name="first_delivery_free"
//               value="first_delivery_free"
//             />
//           </Input>

//           <Input>
//             Image:
//             <input onChange={handleFormData} type="text" name="image" />
//           </Input>
//           <Input>
//             Price:
//             <input
//               onChange={handleFormData}
//               type="number"
//               name="price"
//               step=".01"
//             />
//           </Input>
//           <Input>
//             Prime:
//             <input
//               onInput={handleFormData}
//               type="checkbox"
//               name="prime"
//               value="prime"
//             />
//           </Input>
//           <Input>
//             Quantity:
//             <input onChange={handleFormData} type="number" name="qty" />
//           </Input>
//           <Input>
//             Rating:
//             <input
//               onChange={handleFormData}
//               type="number"
//               name="rating"
//               step=".1"
//             />
//           </Input>

//           <h4>Tag:</h4>

//           {tags.map((tag, i) => (
//             <Input key={i}>
//               <input
//                 onInput={handleFormData}
//                 type="radio"
//                 name="tag"
//                 value={tag}
//               />
//               {tag}
//             </Input>
//           ))}

//           <Input>
//             Title:
//             <input onChange={handleFormData} type="text" name="title" />
//           </Input>
//           <Input>
//             <input type="submit" value="submit" />
//           </Input>
//         </fieldset>
//       </form>
//     </Container>
//   );
// };

// export default AddProduct;

// const Container = styled.div``;

// const Input = styled.div``;

// ---------new one----------

import { db } from "../../db/firebase";
import { setDoc, doc, collection } from "firebase/firestore";

import React, { useState } from "react";
import styled from "styled-components";
import FormHelperText from "@mui/material/FormHelperText";

import {
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
  Switch,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Checkbox,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import capitalize from "../../utils/capitalize";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux/productsSlice";
import { useDispatch } from "react-redux";

const AddProduct = () => {
  const initValues = {
    category: [],
    title: "",
    image: "",
    tag: "",
    price: "",
    discount_price: "",
    coupon: "",
    qty: "",
    prime: false,
    first_delivery_free: false,
    delivery_duration: "",
  };

  const [formData, setFormData] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [sameDPrice, setSameDPrice] = useState(false);
  const [resetDPriceSwitch, setResetDPriceSwitch] = useState(false);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const productsColl = collection(db, "products");

  const categories = [
    "men",
    "women",
    "electronics",
    "footwear",
    "clothing",
    "home",
  ];

  const tags = ["bestseller", "amazon_choice", "new"];

  const handleFormData = (e) => {
    const { name, value, checked, type } = e.target;
    // console.log(name, value, checked, type);

    //for storing the category array
    if (checked && name === "category") {
      setFormData({
        ...formData,
        [name]: [...formData[name], value],
      });
    } else if (!checked && name === "category") {
      setFormData({
        ...formData,
        [name]: formData[name].filter((e) => e !== value),
      });
      //making controlled radio buttons
    } else if (type === "radio" && value === formData.tag) {
      setFormData({
        ...formData,
        tag: "",
      });
      //for storing input boxes
    } else {
      setFormData({
        ...formData,
        [name]:
          type === "number" && value === ""
            ? ""
            : type === "number"
            ? +value
            : type === "checkbox"
            ? checked
            : value,
      });
    }
    validate({ [name]: value });
  };

  // To reset the form
  const resetForm = () => {
    setFormData(initValues);
    setErrors({});
    setSameDPrice(false);
    setResetDPriceSwitch(false);
  };

  // validation check
  const validate = (fieldValues = formData) => {
    // console.log(fieldValues);
    let temp = { ...errors };
    if ("title" in fieldValues)
      temp.title = fieldValues.title.trim() ? null : "Title is required";

    if ("image" in fieldValues)
      temp.image = fieldValues.image.trim() ? null : "Image is required";

    if ("price" in fieldValues)
      temp.price = !+fieldValues.price
        ? "Original Price is required"
        : fieldValues.price < 0
        ? "Original Price can't be negative"
        : !/^[0-9]\d*$/.test(fieldValues.price)
        ? "Please give valid input"
        : null;

    if ("discount_price" in fieldValues)
      temp.discount_price =
        fieldValues.discount_price === "" ||
        fieldValues.discount_price === false
          ? "Discount Price is required"
          : fieldValues.discount_price > formData.price
          ? "Discount Price can't be greater the original price"
          : fieldValues.discount_price < 0
          ? "Discount Price can't be negative"
          : fieldValues.discount_price === true
          ? null
          : !/^[0-9]\d*$/.test(fieldValues.discount_price)
          ? "Please give valid input"
          : null;

    if ("delivery_duration" in fieldValues)
      temp.delivery_duration =
        fieldValues.delivery_duration < 0
          ? "Days can't be negative"
          : fieldValues.delivery_duration === ""
          ? "Expected delivery dur. is required"
          : null;

    if ("coupon" in fieldValues)
      temp.coupon = fieldValues.coupon < 0 ? "Coupon can't be negative" : null;

    if ("qty" in fieldValues)
      temp.qty =
        fieldValues.qty === ""
          ? "Quantity is required"
          : fieldValues.qty < 0
          ? "Quantity can't be nagative"
          : !/^[0-9]\d*$/.test(fieldValues.qty)
          ? "Please give valid input"
          : null;

    if ("category" in fieldValues)
      temp.category = !fieldValues.category.length
        ? "Select minimum one category"
        : null;

    setErrors({ ...temp });
    if (fieldValues === formData)
      return Object.values(temp).every((el) => el === null);
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setDoc(doc(productsColl), formData, {
        merge: true,
      })
        .then((res) => {
          dispatch(fetchProducts());
          nav("/");
        })
        .catch((err) => console.log("err,", err))
        .finally(() => setLoading(false));
    }
  };
  return (
    <Container className="bg-white min-h-screen">
      {/* <pre>{JSON.stringify(formData, undefined, 2)}</pre> */}

      {/* Logo */}
      <div
        onClick={() => nav("/")}
        className="w-28 mx-auto my-4 cursor-pointer"
      >
        <img
          alt="brand-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
        />
      </div>

      {/* Form */}
      <form onSubmit={addProduct} noValidate>
        <Stack
          spacing={3}
          className="p-6 md:border border-gray rounded-md bg-white min-w-min max-w-md mx-auto"
        >
          {/* add product title */}
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            Add Product
          </Typography>

          {/* Title */}
          <TextField
            required
            name="title"
            value={formData.title}
            {...(errors.title
              ? { error: true, label: errors.title }
              : { label: "Title" })}
            variant="outlined"
            size="small"
            onChange={handleFormData}
          />

          {/* Image */}
          <TextField
            required
            name="image"
            value={formData.image}
            {...(errors.image
              ? { error: true, label: errors.image }
              : { label: "Image URL" })}
            variant="outlined"
            size="small"
            onChange={handleFormData}
          />

          {/* Categories */}
          <FormControl size="small">
            <FormLabel required error={errors.category ? true : false}>
              Category
            </FormLabel>
            <FormGroup aria-label="position" row>
              {categories.map((cat, i) => (
                <FormControlLabel
                  key={i}
                  value={cat}
                  control={<Checkbox />}
                  name="category"
                  label={cat}
                  onInput={handleFormData}
                />
              ))}
            </FormGroup>
            <FormHelperText error={errors.category ? true : false}>
              {errors.category && errors.category}
            </FormHelperText>
          </FormControl>

          {/* Tags */}
          <FormLabel>Tag</FormLabel>
          <RadioGroup row value={formData.tag}>
            {tags.map((tag, i) => (
              <FormControlLabel
                key={i}
                value={tag}
                control={<Radio />}
                name="tag"
                label={capitalize(tag)}
                onClick={handleFormData}
              />
            ))}
          </RadioGroup>

          {/* Original Price */}
          <FormControl size="small">
            <InputLabel required error={errors.price ? true : false}>
              {errors.price ? errors.price : "Original Price"}
            </InputLabel>
            <OutlinedInput
              required
              name="price"
              {...(errors.price
                ? { error: true, label: errors.price }
                : { label: "Original Price" })}
              variant="outlined"
              size="small"
              type="number"
              step="1"
              value={formData.price}
              onChange={handleFormData}
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
            />
          </FormControl>

          {/* Discount price */}
          <FormControl size="small">
            <InputLabel required error={errors.discount_price ? true : false}>
              {errors.discount_price ? errors.discount_price : "Discount Price"}
            </InputLabel>
            <OutlinedInput
              required
              disabled={sameDPrice || formData.price === "" ? true : false}
              type="number"
              name="discount_price"
              {...(errors.discount_price
                ? { error: true, label: errors.discount_price }
                : { label: "Discount Price" })}
              variant="outlined"
              size="small"
              value={
                sameDPrice
                  ? formData.price
                  : formData.discount_price
                  ? formData.discount_price
                  : ""
              }
              onChange={handleFormData}
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <FormControlLabel
                    disabled={formData.price ? false : true}
                    value={sameDPrice ? "" : formData.price}
                    control={
                      <Switch
                        name="discount_price"
                        checked={resetDPriceSwitch}
                      />
                    }
                    label="Same as original price"
                    labelPlacement="start"
                    onChange={(e) => {
                      setSameDPrice(!sameDPrice);
                      setResetDPriceSwitch(!resetDPriceSwitch);
                      handleFormData(e);
                    }}
                  />
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Coupon */}
          <FormControl size="small">
            <InputLabel error={errors.coupon ? true : false}>
              {errors.coupon ? errors.coupon : "Coupon"}
            </InputLabel>
            <OutlinedInput
              name="coupon"
              {...(errors.coupon
                ? { error: true, label: errors.coupon }
                : { label: "Coupon" })}
              variant="outlined"
              size="small"
              type="number"
              step="1"
              onChange={handleFormData}
              value={formData.coupon}
              startAdornment={
                <InputAdornment position="start">%</InputAdornment>
              }
            />
          </FormControl>

          {/* Expected delivery duration */}
          <FormControl size="small">
            <InputLabel
              required
              error={errors.delivery_duration ? true : false}
            >
              {errors.delivery_duration
                ? errors.delivery_duration
                : "Expected Delivery Duration"}
            </InputLabel>
            <OutlinedInput
              required
              name="delivery_duration"
              {...(errors.delivery_duration
                ? {
                    error: true,
                    label: errors.delivery_duration,
                  }
                : { label: "Expected Delivery Duration" })}
              variant="outlined"
              size="small"
              type="number"
              step="1"
              value={formData.delivery_duration}
              onChange={handleFormData}
              endAdornment={
                <InputAdornment position="end">In Days</InputAdornment>
              }
            />
          </FormControl>

          {/* Quantity */}
          <TextField
            required
            name="qty"
            {...(errors.qty
              ? { error: true, label: errors.qty }
              : { label: "Quantity" })}
            variant="outlined"
            size="small"
            type="number"
            value={formData.qty}
            onChange={handleFormData}
          />

          {/* Prime */}
          <FormControlLabel
            control={
              <Switch
                name="prime"
                checked={formData.prime}
                onChange={handleFormData}
              />
            }
            value={formData.prime}
            labelPlacement="start"
            label="Prime"
          />

          {/* First delivery free */}
          <FormControlLabel
            control={
              <Switch
                name="first_delivery_free"
                checked={formData.first_delivery_free}
                onChange={handleFormData}
              />
            }
            value={formData.first_delivery_free}
            label="First Delivery Free"
            labelPlacement="start"
          />

          {/* Save Button */}
          <LoadingButton
            type="submit"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{
              bgcolor: "#f0c14b",
              color: "black",
              border: 1,
              borderColor: "#a88734",
              textTransform: "none",
              ":hover": { bgcolor: "#ddb347" },
            }}
          >
            Add Product
          </LoadingButton>

          {/* reset button */}
          <Button
            sx={{
              bgcolor: "#dfdfdf",
              color: "black",
              border: 1,
              borderColor: "#a5a5a5",
              textTransform: "none",
              ":hover": { bgcolor: "#cfcece" },
            }}
            onClick={resetForm}
            variant="contained"
          >
            Reset
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default AddProduct;

const Container = styled.div`
  min-height: 100vh;
  background-color: #eaeded;
  padding: 10px 10px 40px;
`;

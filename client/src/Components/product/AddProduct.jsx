// import { db } from "../../db/firebase";
// import { setDoc, doc, collection } from "firebase/firestore";

import React, { useState } from "react";
import styled from "styled-components";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Typography } from "@mui/material";

const AddProduct = () => {
  const initValues = {
    category: [],
    title: "",
    image: "",
    tag: "",
    org_price: "",
    disc_price: "",
    coupon: "",
    qty: "",
    prime: false,
    first_delivery_free: false,
    expected_delivery_duration: "",
  };

  const [formData, setformData] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [sameDPrice, setSameDPrice] = useState(false);
  const [resetDPriceSwitch, setResetDPriceSwitch] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setformData({
        ...formData,
        [name]: [...formData[name], value],
      });
    } else if (!checked && name === "category") {
      setformData({
        ...formData,
        [name]: formData[name].filter((e) => e !== value),
      });
      //making controlled radio buttons
    } else if (type === "radio" && value === formData.tag) {
      setformData({
        ...formData,
        tag: "",
      });
      //for storing input boxes
    } else {
      setformData({
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
    setformData(initValues);
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

    if ("org_price" in fieldValues)
      temp.org_price = !+fieldValues.org_price
        ? "Original Price is required"
        : fieldValues.org_price < 0
        ? "Original Price can't be negative"
        : !/^[0-9]\d*$/.test(fieldValues.org_price)
        ? "Please give valid input"
        : null;

    if ("disc_price" in fieldValues)
      temp.disc_price =
        fieldValues.disc_price === "" || fieldValues.disc_price === false
          ? "Discount Price is required"
          : fieldValues.disc_price > formData.org_price
          ? "Discount Price can't be greater the original price"
          : fieldValues.disc_price < 0
          ? "Discount Price can't be negative"
          : fieldValues.disc_price === true
          ? null
          : !/^[0-9]\d*$/.test(fieldValues.disc_price)
          ? "Please give valid input"
          : null;

    if ("expected_delivery_duration" in fieldValues)
      temp.expected_delivery_duration =
        fieldValues.expected_delivery_duration < 0
          ? "Days can't be negative"
          : fieldValues.expected_delivery_duration === ""
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
      // alert("testing...");
      // setLoading(true);
      axios
        .post("http://localhost:8080/addproduct", formData)
        .then((data) => {
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
      // setDoc(doc(productsColl, String(products.length + 1)), formData, {
      //   merge: true,
      // })
      //   .then((res) => console.log("result,", res))
      //   .catch((err) => console.log("err,", err));
    }
  };
  return (
    <Container className="bg-white min-h-screen">
      {/* <pre>{JSON.stringify(formData, undefined, 2)}</pre> */}

      {/* Logo */}
      <div className="w-28 mx-auto my-4">
        <img
          alt="brand-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
        />
      </div>

      {/* Form */}
      <form onSubmit={addProduct} noValidate>
        <Stack
          spacing={3}
          className="p-6 md:border border-gray rounded-md bg-white min-w-min max-w-md mx-auto md:mb-10"
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

          {/* Tag */}
          <FormLabel>Tag</FormLabel>
          <RadioGroup row value={formData.tag}>
            {tags.map((tag, i) => (
              <FormControlLabel
                key={i}
                value={tag}
                control={<Radio />}
                name="tag"
                label={tag}
                onClick={handleFormData}
              />
            ))}
          </RadioGroup>

          {/* Original Price */}
          <FormControl size="small">
            <InputLabel required error={errors.org_price ? true : false}>
              {errors.org_price ? errors.org_price : "Original Price"}
            </InputLabel>
            <OutlinedInput
              required
              name="org_price"
              {...(errors.org_price
                ? { error: true, label: errors.org_price }
                : { label: "Original Price" })}
              variant="outlined"
              size="small"
              type="number"
              step="1"
              value={formData.org_price}
              onChange={handleFormData}
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
            />
          </FormControl>

          {/* Discount price */}
          <FormControl size="small">
            <InputLabel required error={errors.disc_price ? true : false}>
              {errors.disc_price ? errors.disc_price : "Discount Price"}
            </InputLabel>
            <OutlinedInput
              required
              disabled={sameDPrice || formData.org_price === "" ? true : false}
              type="number"
              name="disc_price"
              {...(errors.disc_price
                ? { error: true, label: errors.disc_price }
                : { label: "Discount Price" })}
              variant="outlined"
              size="small"
              value={
                sameDPrice
                  ? formData.org_price
                  : formData.disc_price
                  ? formData.disc_price
                  : ""
              }
              onChange={handleFormData}
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <FormControlLabel
                    disabled={formData.org_price ? false : true}
                    value={sameDPrice ? "" : formData.org_price}
                    control={
                      <Switch name="disc_price" checked={resetDPriceSwitch} />
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
              error={errors.expected_delivery_duration ? true : false}
            >
              {errors.expected_delivery_duration
                ? errors.expected_delivery_duration
                : "Expected Delivery Duration"}
            </InputLabel>
            <OutlinedInput
              required
              name="expected_delivery_duration"
              {...(errors.expected_delivery_duration
                ? {
                    error: true,
                    label: errors.expected_delivery_duration,
                  }
                : { label: "Expected Delivery Duration" })}
              variant="outlined"
              size="small"
              type="number"
              step="1"
              value={formData.expected_delivery_duration}
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

const Container = styled.div``;

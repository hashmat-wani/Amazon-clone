import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../../db/firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const { products } = useSelector((state) => state.productsReducer);

  const [productDetails, setProductDetails] = useState({
    category: [],
  });

  const productsColl = collection(db, "products");

  const categories = [
    "men",
    "women",
    "electronics",
    "footwear",
    "clothing",
    "home",
  ];
  const tags = ["bestseller", "amazon_choice", "new", "false"];

  const handleFormData = (e) => {
    const { name, value, checked, type } = e.target;

    console.log(type, value);
    if (checked && name === "category") {
      setProductDetails({
        ...productDetails,
        [name]: [...productDetails[name], value],
      });
    } else if (!checked && name === "category") {
      setProductDetails({
        ...productDetails,
        [name]: productDetails[name].filter((e) => e !== value),
      });
    } else {
      setProductDetails({
        ...productDetails,
        [name]:
          type === "checkbox" ? checked : type === "number" ? +value : value,
      });
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setDoc(doc(productsColl, String(products.length + 1)), productDetails, {
      merge: true,
    })
      .then((res) => console.log("result,", res))
      .catch((err) => console.log("err,", err));
  };
  return (
    <Container className="border">
      <form onSubmit={addProduct}>
        <fieldset>
          <legend>Add Product Details</legend>
          <h4>Category:</h4>
          {categories.map((cat, i) => (
            <Input key={i}>
              <input
                onInput={handleFormData}
                type="checkbox"
                name="category"
                value={cat}
              />
              {cat}
            </Input>
          ))}

          <Input>
            Coupon:
            <input onChange={handleFormData} type="number" name="coupon" />
          </Input>

          <Input>
            Delivery Duration:
            <input
              onChange={handleFormData}
              type="number"
              name="delivery_duration"
            />
          </Input>

          <Input>
            Discount Price:
            <input
              onChange={handleFormData}
              type="number"
              name="discount_price"
              step=".01"
            />
          </Input>

          <Input>
            first Delivery Free:
            <input
              onInput={handleFormData}
              type="checkbox"
              name="first_delivery_free"
              value="first_delivery_free"
            />
          </Input>

          <Input>
            Image:
            <input onChange={handleFormData} type="text" name="image" />
          </Input>
          <Input>
            Price:
            <input
              onChange={handleFormData}
              type="number"
              name="price"
              step=".01"
            />
          </Input>
          <Input>
            Prime:
            <input
              onInput={handleFormData}
              type="checkbox"
              name="prime"
              value="prime"
            />
          </Input>
          <Input>
            Quantity:
            <input onChange={handleFormData} type="number" name="qty" />
          </Input>
          <Input>
            Rating:
            <input
              onChange={handleFormData}
              type="number"
              name="rating"
              step=".1"
            />
          </Input>

          <h4>Tag:</h4>

          {tags.map((tag, i) => (
            <Input key={i}>
              <input
                onInput={handleFormData}
                type="radio"
                name="tag"
                value={tag}
              />
              {tag}
            </Input>
          ))}

          <Input>
            Title:
            <input onChange={handleFormData} type="text" name="title" />
          </Input>
          <Input>
            <input type="submit" value="submit" />
          </Input>
        </fieldset>
      </form>
    </Container>
  );
};

export default AddProduct;

const Container = styled.div``;

const Input = styled.div``;

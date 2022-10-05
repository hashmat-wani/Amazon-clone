import React from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/firebase";
import { setDoc, doc, getDoc, updateDoc, collection } from "firebase/firestore";

const Product = ({
  id,
  title,
  price,
  discount_price,
  rating,
  image,
  prime,
  first_delivery,
  tag,
}) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const months_30 = ["April", "September", "June", "November"];

  const d = new Date();
  let day = d.getDay();
  let date = d.getDate();
  let month = d.getMonth();

  let delivery_day = false;
  let delivery_date = false;
  let delivery_month = false;
  const random = Math.floor(Math.random() * 10);

  if (random < 6) {
    delivery_day =
      random === 0
        ? "today"
        : random === 1
        ? "tomorrow"
        : weekday[(day + random) % 7];

    if (months_30.includes(delivery_month)) {
      delivery_date = (date + random) % 30;
    } else if (delivery_date == "February") {
      delivery_date = (date + random) % 28;
    } else {
      delivery_date = (date + random) % 31;
    }
    if (delivery_date < date) {
      delivery_month = months[month + 1];
    } else {
      delivery_month = months[month];
    }
  }

  let flag = rating % 1 !== 0 ? true : false;
  rating = Math.floor(rating);

  const cartColl = collection(db, "cartitems");

  const addToCart = (id) => {
    const cartItemDoc = doc(db, "cartitems", id);
    getDoc(cartItemDoc).then((docSnap) => {
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
    });
  };

  return (
    <Container className="relative">
      {tag !== "false" ? (
        <Tag
          tag={tag}
          className="absolute top-0 left-0 text-xs py-1 px-2 font-medium rounded-br-xl"
        >
          <span className="text-white">
            {tag === "new"
              ? "New Arrival"
              : tag === "bestseller"
              ? "Best Seller"
              : "Amazon's"}
          </span>
          {tag === "amazon_choice" ? " Choice" : null}
        </Tag>
      ) : null}
      <Image>
        <img src={image} alt="ProductImage" />
      </Image>
      <Details className="m-2 flex flex-col gap-1">
        <Title>{title}</Title>
        <Rating>
          {Array(5)
            .fill()
            .map((_, idx) =>
              idx < rating ? (
                <StarIcon fontSize="small" key={uuidv4()} />
              ) : flag && idx === rating ? (
                <StarHalfIcon fontSize="small" key={uuidv4()} />
              ) : (
                <StarOutlineIcon fontSize="small" key={uuidv4()} />
              )
            )}
        </Rating>
        {true ? (
          <Fest className="px-2 py-1 text-xs self-start">
            Great Indian Festival
          </Fest>
        ) : null}
        <Price className="flex">
          <span className="self-auto mt-0.5">₹</span>
          <span className="self-start  text-gray-700 text-3xl">
            {discount_price}
          </span>

          <span className="self-end text-gray-600 line-through ml-1">
            ₹{price}
          </span>
          <span className="self-end text-gray-600 ml-2">
            ({Math.floor((discount_price / price) * 100)}% off)
          </span>
        </Price>
        <Random className="text-sm space-y-1">
          <Prime className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {prime ? (
                <img
                  className="w-14"
                  src="https://seeklogo.com/images/A/amazon-prime-icon-logo-484A50E84F-seeklogo.com.png"
                  alt=""
                />
              ) : null}

              {delivery_day ? (
                <p>
                  Get it by
                  <strong>
                    &nbsp;
                    {delivery_day}, {delivery_month}&nbsp;
                    {delivery_date}
                  </strong>
                </p>
              ) : null}
            </div>
            {prime ? <p>FREE Delivery by Amazon</p> : null}
          </Prime>
          {first_delivery && !prime ? (
            <p>FREE Delivery on first order</p>
          ) : null}
        </Random>
        {/* <ActionSection className="border">
          <AddToCartBtn onClick={() => addToCart(id)}>Add to Cart</AddToCartBtn>
        </ActionSection> */}
      </Details>
    </Container>
  );
};

export default Product;

const Container = styled.div`
  background-color: white;
  z-index: 1;
  margin: 7px;
`;
const Tag = styled.div`
  display: inline;
  color: #ff9138;
  background-color: ${({ tag }) =>
    tag === "bestseller" ? "#ff9138" : tag === "new" ? "red" : "#131921"};
`;

const Image = styled.div`
  height: 270px;
  img {
    /* border: 1px solid red; */
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;
const Details = styled.div`
  /* margin: 10px; */
  /* border: 1px solid red; */
`;

const Title = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Price = styled.div`
  /* border: 1px solid red;
  font-weight: 500;
  margin: 5px 0;

  vertical-align: text-top; */
`;

const Rating = styled.div`
  color: #ff9138;
`;

const Fest = styled.div`
  background-color: #ff9138;
`;

const Random = styled.div``;

const Prime = styled.div``;

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 16px; */
`;

const AddToCartBtn = styled.button`
  cursor: pointer;
  width: 100%;
  height: 40px;
  background-color: #ff9138;
  border: none;
  border-radius: 10px;
`;

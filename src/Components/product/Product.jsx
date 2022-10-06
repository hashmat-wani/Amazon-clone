import React from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../db/firebase";
import { NumericFormat } from "react-number-format";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  increment,
} from "firebase/firestore";

const Product = ({
  id,
  title,
  price,
  qty,
  discount_price,
  rating,
  image,
  prime,
  first_delivery_free,
  delivery_duration,
  tag,
  coupon,
}) => {
  // Delivery Date
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

  if (delivery_duration < 7) {
    delivery_day =
      delivery_duration === 0
        ? "today"
        : delivery_duration === 1
        ? "tomorrow"
        : weekday[(day + delivery_duration) % 7];

    if (months_30.includes(delivery_month)) {
      delivery_date = (date + delivery_duration) % 30;
    } else if (delivery_date === "February") {
      delivery_date = (date + delivery_duration) % 28;
    } else {
      delivery_date = (date + delivery_duration) % 31;
    }
    if (delivery_date < date) {
      delivery_month = months[(month + 1) % 12];
    } else {
      delivery_month = months[month];
    }
  }

  //  for rating
  let ratingFlag = rating % 1 !== 0 ? true : false;

  // fetching cart data first to check if its already present
  const cartColl = collection(db, "cartitems");
  const addToCart = (id) => {
    const cartItemDoc = doc(db, "cartitems", id);
    getDoc(cartItemDoc).then((docSnap) => {
      if (docSnap.exists()) {
        updateDoc(cartItemDoc, { qty: increment(1) });
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
      {/* product tag */}
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

      {/* product image */}
      <ProductImage>
        <img src={image} alt="ProductImage" />
      </ProductImage>

      <ProductDetails className="m-2 flex flex-col gap-1.5">
        <Title>{title}</Title>
        <Rating>
          {Array(5)
            .fill()
            .map((_, idx) =>
              idx < Math.floor(rating) ? (
                <StarIcon fontSize="small" key={uuidv4()} />
              ) : ratingFlag && idx === Math.floor(rating) ? (
                <StarHalfIcon fontSize="small" key={uuidv4()} />
              ) : (
                <StarOutlineIcon fontSize="small" key={uuidv4()} />
              )
            )}
        </Rating>

        {/* checking quantity of a product */}
        {qty === 0 ? (
          <p className="text-xs text-gray-600">Currently unavailable.</p>
        ) : (
          <>
            {true ? (
              <Festival className="px-2 py-1 text-xs self-start">
                Great Indian Festival
              </Festival>
            ) : null}
            <Price className="flex">
              <span className="self-auto mt-0.5">₹</span>
              <span className="self-start  text-gray-700 text-3xl">
                <NumericFormat
                  displayType="text"
                  value={discount_price}
                  thousandsGroupStyle="lakh"
                  thousandSeparator=","
                  // prefix={"₹"}
                />
              </span>

              <span className="self-end text-gray-600 line-through ml-1">
                ₹
                <NumericFormat
                  displayType="text"
                  value={price}
                  thousandsGroupStyle="lakh"
                  thousandSeparator=","
                  // prefix={"₹"}
                />
              </span>
              <span className="self-end text-gray-600 ml-2">
                ({Math.floor((discount_price / price) * 100)}% off)
              </span>
            </Price>

            {/* checking discount */}
            {coupon ? (
              <Coupon className="text-sm text-gray-600">
                <span className="text-black px-1.5 py-0.5">Save ₹{coupon}</span>{" "}
                with coupon
              </Coupon>
            ) : null}

            {/* checking prime */}
            <Random className="text-sm space-y-1 text-gray-600">
              <Prime className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {prime && (
                    <img
                      className="w-14"
                      src="https://seeklogo.com/images/A/amazon-prime-icon-logo-484A50E84F-seeklogo.com.png"
                      alt=""
                    />
                  )}

                  {/* checking nearby expected delivery */}
                  {delivery_day && (
                    <p>
                      Get it by
                      <strong>
                        &nbsp;
                        {delivery_day}, {delivery_month}&nbsp;
                        {delivery_date}
                      </strong>
                    </p>
                  )}
                </div>
                {prime && <p>FREE Delivery by Amazon</p>}
              </Prime>

              {/* checking free delivery */}
              {first_delivery_free && !prime ? (
                <p>FREE Delivery on first order</p>
              ) : discount_price < 499 && !prime ? (
                <div>
                  <p>FREE Delivery over ₹499.</p>
                  <p>Fulfilled by Amazon.</p>
                </div>
              ) : null}

              {/* checking dispatch date */}
              {delivery_duration > 7 && delivery_duration <= 15 && (
                <p className="text-xs">Usually dispatched in 1 to 2 weeks.</p>
              )}

              {/* stock alert */}
              {qty <= 5 && (
                <p className="text-red-800">Only {qty} left in stock.</p>
              )}
            </Random>
          </>
        )}

        {/* add to cart section */}
        {qty !== 0 && (
          <ActionSection className="border absolute bottom-0 right-0 px-5 py-1 cursor-pointer">
            <AddShoppingCartIcon onClick={() => addToCart(id)} />
          </ActionSection>
        )}
      </ProductDetails>
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

const ProductImage = styled.div`
  height: 265px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const ProductDetails = styled.div``;

const Title = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Rating = styled.div`
  color: #ff9138;
`;

const ActionSection = styled.div`
  align-self: flex-start;
  background-color: #ffd814;
`;

const Festival = styled.div`
  background-color: #ff9138;
`;
const Price = styled.div``;

const Coupon = styled.div`
  span {
    background: #5ed15e;
  }
`;

const Random = styled.div``;

const Prime = styled.div``;

import mongoose from "mongoose";

const dBconn = (URI) =>
  mongoose
    .connect(URI)
    .then(() => console.log("db connected successfully"))
    .catch((err) => console.log(err.message));
export default dBconn;

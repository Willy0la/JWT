import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const CustomerModel = new mongoose.Schema(
  {
    username: { type: String, unique: true, require: true, trim: true },
    firstname: { type: String, unique: false, require: true, trim: true },
    lastname: { type: String, unique: false, require: true, trim: true },
    email: { type: String, unique: true, require: true, trim: true },
    password: {
      type: String,
      unique: false,
      require: true,
      trim: true,
      minlength: 8,
    },
  },
  { timeStamp: true }
);

const Consumer = mongoose.model("customer", CustomerModel);

export default Consumer;

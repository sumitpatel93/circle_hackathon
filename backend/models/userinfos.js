const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defaultString = { type: String, default: "" };
const stringRequired = { type: String, required: true };
const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    password: stringRequired,
    confirmPassword: stringRequired,
    token: { type: String },
    photos: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
    },
    username: { type: String, unique: true, required: true },
    companyName: defaultString,
    credentialDocument: defaultString,
    country: defaultString,
    commodityName: defaultString,
    commodityType: defaultString,
    supplierType: defaultString,
    contactNumber: defaultString,
    uuid: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    customerId: defaultString,
    walletId: defaultString,
    blockChainAddress :defaultString
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = UserInfo = mongoose.model("userinfos", UserInfoSchema);

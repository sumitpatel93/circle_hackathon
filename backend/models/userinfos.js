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
    username: { type: String, unique: true, required: true },
    companyName: defaultString,
    credentialDocument: defaultString,
    country: defaultString,
    contactNumber: defaultString,
    uuid: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    idempotencyKey: defaultString,
    walletId: defaultString,
    blockchainAddress :{ type: String},
    pvtKey : { type: String}
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = UserInfo = mongoose.model("userinfos", UserInfoSchema);

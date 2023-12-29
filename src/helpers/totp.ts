import { totp } from "otplib";
import configs from "../providers/configs.js";

export const generateTotp = () => {
  return totp.generate(configs.OTP_SECRET);
};

export const checkTotp = (token: string) => {
  return totp.check(token, configs.OTP_SECRET);
};

export const verifyTotp = (token: string) => {
  return totp.verify({ token, secret: configs.OTP_SECRET });
};

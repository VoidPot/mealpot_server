import { randomInt } from "crypto";

const digitsStr = "0123456789";
const lowerCaseAlphabetsStr = "abcdefghijklmnopqrstuvwxyz";
const upperCaseAlphabetsStr = lowerCaseAlphabetsStr.toUpperCase();
const specialCharsStr = "#!&@";

export function generateOtp(
  length: number,
  {
    digits = true,
    lowerCaseAlphabets = false,
    upperCaseAlphabets = true,
    specialChars = false,
  }: {
    digits?: boolean;
    lowerCaseAlphabets?: boolean;
    upperCaseAlphabets?: boolean;
    specialChars?: boolean;
  },
) {
  const allowsChars =
    ((digits || "") && digitsStr) +
    ((lowerCaseAlphabets || "") && lowerCaseAlphabetsStr) +
    ((upperCaseAlphabets || "") && upperCaseAlphabetsStr) +
    ((specialChars || "") && specialCharsStr);
  let password = "";
  while (password.length < length) {
    const charIndex = randomInt(0, allowsChars.length);
    if (
      password.length === 0 &&
      digits === true &&
      allowsChars[charIndex] === "0"
    ) {
      continue;
    }
    password += allowsChars[charIndex];
  }
  return password;
}

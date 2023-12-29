import jwt from "jsonwebtoken";
import configs from "../providers/configs.js";
import logger from "../providers/logger.js";

export function encodeJWT(payload: object): string | undefined {
  const { SSH, JWT_SIGN_OPTIONS } = configs;
  const { PRIVATE_KEY, PASS_PHRASE } = SSH;

  try {
    return jwt.sign(
      payload,
      {
        key: PRIVATE_KEY,
        passphrase: PASS_PHRASE,
      },
      JWT_SIGN_OPTIONS,
    );
  } catch (error) {
    logger.warn("Error on JWT sign process", error);
    return undefined;
  }
}

export function decodeJWT(
  token: string,
): { id: string; email: string } | string {
  const { SSH, JWT_VERIFY_OPTIONS } = configs;
  const { PUBLIC_KEY } = SSH;

  try {
    const decoded: any = jwt.verify(token, PUBLIC_KEY, JWT_VERIFY_OPTIONS);
    return decoded;
  } catch (error) {
    logger.warn("Error on JWT verify process", error);
    if (error instanceof Error) {
      return error.message.replace(" ", "_").toUpperCase();
    }
    return "INVALID_JWD_TOKEN";
  }
}

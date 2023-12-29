import { OAuth2Client, TokenPayload } from "google-auth-library";
import configs from "../providers/configs.js";
import logger from "../providers/logger.js";
import { InputMaybe } from "../types/graphql.js";

const googleClient = new OAuth2Client({
  clientId: configs.GOOGLE_CLIENT_ID,
  clientSecret: configs.GOOGLE_CLIENT_SECRET,
});

async function decodeCredentialResponse(credential: string) {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
    });
    const payload = ticket.getPayload();
    return payload || null;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

async function decodeImplicitTokenResponse(accessToken: string) {
  // const tokenInfo = await googleClient.getTokenInfo(accessToken);
  return fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((response) => response.json())
    .catch((e) => {
      logger.error(e);
      return null;
    });
}

async function decodeAuthCodeResponse(code: string) {
  try {
    console.log({ code });
    const verifier = await googleClient.generateCodeVerifierAsync();
    console.log({ verifier });
    const tokenResponse = await googleClient.getToken({
      code,
      // codeVerifier: verifier.codeVerifier,
    });
    return decodeCredentialResponse(tokenResponse.tokens.id_token || "");
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function decodeGoogleAuthResponse(
  input: string,
  selectBy: InputMaybe<string> | undefined = "",
): Promise<TokenPayload | null> {
  if (selectBy && selectBy === "btn_code") {
    return await decodeAuthCodeResponse(input);
  }
  if (selectBy && selectBy === "btn_access_token") {
    return await decodeImplicitTokenResponse(input);
  }
  return decodeCredentialResponse(input);
}

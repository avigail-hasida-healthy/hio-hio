import jwt from "jsonwebtoken";

export const JWT_SECRET = "dwSs5BkyUBwZMDz8ei3a7vvIVCcII/HEq04bw/vm";

/**
 * Signs a jwt token
 * @param payload The payload for the jwt token
 * @returns jwt token
 */
export const signJwt = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET);
};

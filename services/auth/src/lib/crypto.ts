import bcrypt from "bcrypt";

const HASH_ROUNDS = 10;

/**
 * Hash the specified data
 * @param data The data to be encrypted
 * @returns The hashed string
 */
export const hashData = (data: string) => {
  return bcrypt.hashSync(data, HASH_ROUNDS);
};

/**
 * Compare the specified data with the hash
 * @param data
 * @param hash
 * @returns True if the hash matches the hashed data, otherwise false
 */
export const compareHash = (data: string, hash: string) => {
  return bcrypt.compareSync(data, hash);
};

import { bcrypt } from "bcrypt";

const SALT_ROUNDS = 10;

export const hashedPassword = async (password) => {
  if (!password) {
    throw Error("Password is required for hashing");
  }

  return bcrypt.hash(password, SALT_ROUNDS);
};

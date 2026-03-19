import { createUserInDB } from "../models/usersModel";
import { hashedPassword } from "../utils/hash";

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !lastName || !email || !password) {
    throw Error("data required for registration");
  }

  try {
    const hashedPassword = await hashedPassword(password);

    return createUserInDB({ firstName, lastName, email, hashedPassword });
  } catch (error) {}
};

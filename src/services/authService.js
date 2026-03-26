import {
  createUserInDB,
  getUserByUsernameFromDB,
  getUserByIdFromDB,
} from "../models/usersModel.js";
import { hashPassword } from "../utils/hash.js";

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
    const hashedPassword = await hashPassword(password);

    return await createUserInDB({ firstName, lastName, email, hashedPassword });
  } catch (err) {
    if (err === "23505") {
      throw new AppError(`email ${email} is already taken`, 409);
    }
    throw err;
  }
};

export const getUserById = async (id) => {
  const user = await getUserByIdFromDB(id);
  return user;
};

export const validateUser = async (username, password, verifyFn) => {
  if (!username || !password) return null;

  const user = await getUserByUsernameFromDB(username);

  if (!user) return null;

  const isValid = await verifyFn(password, user.password);
  return isValid ? user : null;
};

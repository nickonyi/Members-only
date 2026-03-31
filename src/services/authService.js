import {
  createUserInDB,
  getUserByEmailFromDB,
  getUserByIdFromDB,
} from "../models/usersModel.js";
import { hashPassword } from "../utils/hash.js";
import { generateUsername } from "../utils/usernamecreator.js";

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
    const username = generateUsername(firstName, lastName);

    return await createUserInDB({
      firstName,
      lastName,
      email,
      hashedPassword,
      username,
    });
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

export const validateUser = async (email, password, verifyFn) => {
  if (!email || !password) return null;

  const user = await getUserByEmailFromDB(email);

  if (!user) return null;

  const isValid = await verifyFn(password, user.passwordHash);

  return isValid ? user : null;
};

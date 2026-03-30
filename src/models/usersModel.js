import pool from "../db/pool.js";
import { generateUsername } from "../utils/usernamecreator.js";

/**
 * Maps a raw DB user row to app-safe user object
 */

const mapUser = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    username: generateUsername(row.first_name, row.last_name),
    passwordHash: row.password,
    createdAt: row.created_at,
  };
};

export const createUserInDB = async ({
  firstName,
  lastName,
  email,
  hashedPassword,
}) => {
  const result = await pool.query(
    `
    INSERT INTO users(first_name,last_name,email,password) 
    values($1,$2,$3,$4)
    RETURNING *
    `,
    [firstName, lastName, email, hashedPassword],
  );

  return mapUser(result.rows[0]);
};

export const getUserByEmailFromDB = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1`,
    [email],
  );
  return mapUser(result.rows[0]);
};
export const getUserByIdFromDB = async (id) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id = $1 LIMIT 1`,
    [id],
  );

  return mapUser(result.rows[0]);
};

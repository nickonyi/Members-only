import pool from "../db/pool.js";

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

  return result.rows[0];
};

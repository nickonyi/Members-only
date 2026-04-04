import pool from "../db/pool.js";

const mapCircle = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    ownerId: row.owner_id,
    createdAt: row.created_at,
    membersCount: row.members_count,
    ownerUsername: row.owner_username || null,
  };
};

export const getPopularCirclesFromDb = async (limit = 6) => {
  const { rows } = await pool.query(
    `SELECT c.*,u.username As owner_username
        FROM circles c JOIN users u ON u.id = c.owner_id
        ORDER BY c.members_count DESC
        LIMIT $1
        `,
    [limit],
  );

  return rows.map(mapCircle);
};

export const getAllCirclesFromDb = async () => {
  const { rows } = await pool.query(
    `
    SELECT c.*, u.username as owner_username 
    FROM circles c
    JOIN users u ON u.id = c.owner_id
    ORDER BY c.created_at DESC
    `,
  );
  return rows.map(mapCircle);
};

export const getCirclesOwnedByUserFromDb = async ({ userId }) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM circles
    WHERE owner_id = $1
    `,
    [userId],
  );
  return rows.map(mapCircle);
};

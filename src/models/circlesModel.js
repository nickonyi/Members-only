import pool from "../db/pool";
import { generateUsername } from "../utils/usernamecreator";

const mapCircle = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    ownerId: row.owner_id,
    createdAt: row.created_at,
    membersCount: row.members_count,
    ownerUsername: generateUsername(row.first_name, row.last_name),
  };
};

export const getPopularCirclesFromDb = async (limit = 6) => {
  const { rows } = pool.query(
    `
        SELECT c.*,u.username As owner_username
        FROM circles c JOIN users u ON c.id = u.owner_id
        ORDER BY c.members_count DESC
        LIMIT $1
        `,
    [limit],
  );

  return rows.map(mapCircle);
};

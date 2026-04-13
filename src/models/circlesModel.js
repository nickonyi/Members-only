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

const mapMembership = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    userId: row.user_id,
    circleId: row.circle_id,
    role: row.role,
    joinedAt: row.joined_at,
    username: row.username,
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

export const getMembershipFromDb = async ({ userId, circleId }) => {
  const { rows } = await pool.query(
    `
    SELECT *
      FROM circle_members 
      WHERE user_id = $1 AND circle_id = $2
    `,
    [userId, circleId],
  );

  return mapMembership(rows[0]);
};

export const getCircleByIdFromDb = async ({ id }) => {
  const { rows } = await pool.query(
    `
    SELECT c.*,u.username as owner_username 
    FROM circles c
    JOIN users u ON
    u.id = c.owner_id
    WHERE c.id =$1
    `,
    [id],
  );

  return mapCircle(rows[0]);
};

export const getMembershipsInCircleFromDb = async ({ circleId }) => {
  const { rows } = await pool.query(
    `
  SELECT cm.*,u.username 
  FROM circle_members cm
  JOIN users u ON u.id = cm.user_id
  WHERE circle_id = $1
  
    `,
    [circleId],
  );

  return rows.map(mapMembership);
};

export const createCircleInDb = async ({ name, description, ownerId }) => {
  const { rows } = await pool.query(
    `
    INSERT INTO circles(name,description,owner_id) 
    VALUES ($1,$2,$3)
    RETURNING *  
  `,
    [name, description, ownerId],
  );

  return mapCircle(rows[0]);
};

export const insertOwnerAsMemberInDb = async ({ ownerId, circleId }) => {
  const { rows } = await pool.query(
    `
    INSERT INTO circle_members(user_id,circle_id,role)
    VALUES ($1,$2,'owner')
    RETURNING *
    `,
    [ownerId, circleId],
  );
  console.log(rows);

  return rows[0];
};

export const getCirclesUserIsMemberOfFromDb = async ({ userId }) => {
  const { rows } = await pool.query(
    `
    
    SELECT c.*,cm.roles
    FROM circle_members cm
    JOIN circles c ON c.id = cm.circle_id
    WHERE cm.circle_id = $1
    ORDER BY cm.joined_at DESC
    `,
    [userId],
  );

  return rows.map(mapCircle);
};

export const deleteCircleFromDb = async ({ circleId }) => {
  const { rows } = await pool.query(
    `DELETE FROM circles 
     WHERE id =$1
     RETURNING *
    `,
    [circleId],
  );

  return mapCircle(rows[0]);
};

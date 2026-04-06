import pool from "../db/pool.js";

const mapPost = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    circleId: row.circle_id,
    authorId: row.author_id ?? null,
    title: row.title,
    body: row.body,
    visibility: row.visibility,
    createdAt: row.created_at,
    authorUsername: row.author_username ?? "Anonymous",
    circleName: row.circle_name ?? null,
    viewerIsMember: Boolean(row.viewer_is_member),
  };
};

export const getLatestPublicPostsFromDb = async (limit = 6) => {
  const { rows } = await pool.query(
    ` SELECT
        P.id,
        p.title,
        p.body,
        c.name AS circle_name,
        c.id AS circle_id,
        'Anonymous' AS author_username
        FROM posts p
        JOIN circles c ON c.id = p.circle_id
        WHERE p.visibility = 'public'
        ORDER BY p.created_at DESC
        LIMIT $1
        `,
    [limit],
  );

  return rows.map(mapPost);
};

export const getAllPostsFromDb = async ({ viewerId = null, limit, offset }) => {
  const { rows } = await pool.query(
    `
    SELECT p.*,
    CASE 
       WHEN p.visibility = 'public' AND cm.user_id IS NULL THEN 'Anonymous'
       ELSE u.username
       END AS author_username,
       c.name AS circle_name,
       c.id AS circle_id,
       (cm.user_id is NOT NULL) AS viewer_is_member
       FROM posts p
       JOIN users u ON u.id = p.author_id
       JOIN circles c ON c.id = p.circle_id
       LEFT JOIN circle_members cm 
       ON cm.circle_id = p.circle_id
       AND cm.user_id =$1
       WHERE
          p.visibility = 'public'
           OR (p.visibility = 'members_only' AND cm.user_id IS NOT NULL)
        ORDER BY p.created_at DESC
        LIMIT $2 OFFSET $3

    `,
    [viewerId, limit, offset],
  );

  return rows.map(mapPost);
};

export const countAllPostsFromDb = async ({ viewerId = null }) => {
  const { rows } = await pool.query(
    `
    SELECT 
     COUNT(*) AS total
     FROM posts p
      LEFT JOIN circle_members cm
        ON cm.circle_id = p.circle_id AND cm.circle_id = $1
         WHERE p.visibility = 'public' OR (p.visibility ='members_only' AND cm.user_id IS NOT NULL)
     `,
    [viewerId],
  );

  return Number(rows[0].total);
};

export const getPostsByAuthorFromDB = async ({ userId, limit, offset }) => {
  const { rows } = await pool.query(
    `
  SELECT p.*,
          c.name as circle_name,
  FROM posts p
  JOIN circles c ON c.id = p.circle_id
  WHERE p.author_id = $1
  ORDER BY p.created_at DESC
  LIMIT $2 AND OFFSET $3        
  `[(userId, limit, offset)],
  );

  return rows.map(mapPost);
};

export const getPostsByCircleFromDb = async ({
  circleId,
  viewerId,
  limit,
  offset,
}) => {
  const { rows } = await pool.query(
    `
    SELECT p.*,
        CASE
          WHEN p.visibility = 'public' AND cm.user_id IS NULL THEN 'Anonymous'
          ELSE u.username
         END AS author_username,
          (cm.user_id IS NOT NULL) AS viewer_is_member
    FROM posts p
     JOIN users u ON u.id = p.author_id
     LEFT JOIN circle_members cm 
     ON cm.circle_id = p.circle_id
     AND cm.user_id = $2
    WHERE p.circle_id = $1 
     AND(
       p.visibility = 'public'
       OR (p.visibility = 'members_only' AND cm.user_id is NOT NULL)
     )
       ORDER BY p.created_at DESC
       LIMIT $3 OFFSET $4
    `,
    [circleId, viewerId, limit, offset],
  );

  return rows.map(mapPost);
};

export const countVisiblePostsByCircleFromDb = async ({
  circleId,
  viewerId,
}) => {
  const { rows } = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM posts p
    LEFT JOIN circle_members cm
      ON cm.circle_id = p.circle_id
      AND cm.user_id = $2
    WHERE p.circle_id = $1
      AND (
       p.visibility = 'public'
       OR  (p.visibility = 'members_only' AND cm.user_id IS NOT NULL)
      )
  `,
    [circleId, viewerId],
  );

  return Number(rows[0].total);
};

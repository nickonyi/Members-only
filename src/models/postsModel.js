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

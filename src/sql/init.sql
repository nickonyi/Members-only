CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS circles(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    owner_id INT NOT NULL
      REFERENCES users(id) ON DELETE CASCADE
        DEFERRABLE INITIALLY IMMEDIATE,
     description TEXT,
     members_count INT NOT NULL DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS circle_members(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL
         REFERENCES users(id) ON DELETE CASCADE
             DEFERRABLE INITIALLY IMMEDIATE,
    circle_id INT NOT NULL
      REFERENCES circles(id) ON DELETE CASCADE
        DEFERRABLE INITIALLY IMMEDIATE,
    role VARCHAR(20) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, circle_id),
    CHECK( role IN ('owner', 'admin', 'member') )
);

CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    circle_id INT NOT NULL
       REFERENCES circles(id) ON DELETE CASCADE
          DEFERRABLE INITIALLY IMMEDIATE,
    author_id  INT NOT NULL
         REFERENCES users(id) ON DELETE CASCADE
             DEFERRABLE INITIALLY IMMEDIATE,
     title VARCHAR(150) NOT NULL,
     body TEXT NOT NULL,
     visibility VARCHAR(30) DEFAULT 'members_only',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     edited_at TIMESTAMP,
     CHECK( visibility IN ('public', 'members_only') )
);

CREATE INDEX IF NOT EXISTS idx_posts_circle_id ON posts(circle_id);
CREATE INDEX IF NOT EXISTS idx_membership_user ON circle_members(user_id);
CREATE INDEX IF NOT EXISTS idx_membership_circle ON circle_members(circle_id);

CREATE OR REPLACE FUNCTION update_edited_timestamp()
RETURNS TRIGGER AS $$
BEGIN 
NEW.edited_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_edited_at
BEFORE UPDATE on posts
FOR EACH ROW
WHEN (OLD.title is DISTINCT FROM NEW.title OR OLD.body IS DISTINCT FROM NEW.body)
EXECUTE FUNCTION update_edited_timestamp();


CREATE OR REPLACE FUNCTION update_members_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
  UPDATE circles
  SET members_count = members_count + 1
  WHERE id = NEW.circle_id;

  ELSIF TG_OP = 'DELETE' THEN
  UPDATE circles
  SET members_count = GREATEST(members_count - 1,0)
  WHERE id = OLD.circle_id;
  END IF;
  RETURN NULL;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER members_count_inc
  AFTER INSERT ON circle_members
  FOR EACH ROW
  EXECUTE FUNCTION update_members_count();

  CREATE TRIGGER members_count_dec
  AFTER DELETE ON circle_members
  FOR EACH ROW
  EXECUTE FUNCTION update_members_count();

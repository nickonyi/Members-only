-- =====================
-- USERS
-- =====================
INSERT INTO users (first_name, last_name, email, username, password_hash) VALUES
('Alice', 'Smith', 'alice.smith@example.com', 'alicesm30', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('Bob', 'Johnson', 'bob.johnson@example.com', 'bobjo45', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('Charlie', 'Brown', 'charlie.brown@example.com', 'charliebr23', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('Diana', 'Wilson', 'diana.wilson@example.com', 'dianawil34', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('Eric', 'Davis', 'eric.davis@example.com', 'ericda56', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('Fiona', 'Miller', 'fiona.miller@example.com', 'fionamil98', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('George', 'Moore', 'george.moore@example.com', 'georgemo32', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.');

-- =====================
-- CIRCLES
-- =====================
INSERT INTO circles (name, owner_id, description, secret_code) VALUES
('Code & Chill',        1, 'Late-night debugging, random ideas, and pretending console.log fixes everything.', 'codechill'),
('Startup Minds',       2, 'For future founders, dreamers, and people building things that may or may not work.', 'startupminds'),
('Music Vibes',         3, 'Sharing playlists, discovering new sounds, and arguing about who ruined music.', 'musicvibes'),
('Gamers Hub',          4, 'For casual gamers, try-hards, and people who say “one last game” 5 times.', 'gamershub'),
('Foodies Corner',     5, 'Exploring good food, bad cooking experiments, and everything in between.', 'foodiescorner'),
('Campus Life',        6, 'University struggles, wins, and everything in between.', 'campuslife');
-- =====================
-- CIRCLE MEMBERS
-- =====================

-- Code & Chill
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(1, 1, 'owner'),
(2, 1, 'admin'),
(3, 1, 'member'),
(4, 1, 'member'),
(5, 1, 'member'),
(6, 1, 'member');

-- Startup Minds
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(2, 2, 'owner'),
(1, 2, 'member'),
(4, 2, 'admin'),
(5, 2, 'member'),
(6, 2, 'member'),
(7, 2, 'member');

-- Music Vibes
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(3, 3, 'owner'),
(1, 3, 'admin'),
(2, 3, 'member'),
(5, 3, 'member'),
(6, 3, 'member'),
(7, 3, 'member');

-- Gamers Hub
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(4, 4, 'owner'),
(1, 4, 'member'),
(2, 4, 'member'),
(3, 4, 'member'),
(5, 4, 'admin'),
(6, 4, 'member');

-- Foodies Corner
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(5, 5, 'owner'),
(1, 5, 'member'),
(2, 5, 'member'),
(3, 5, 'admin'),
(4, 5, 'member'),
(7, 5, 'member');

-- =====================
-- POSTS (REALISTIC LONG-FORM CONTENT)
-- =====================

-- ===================== Code & Chill (Circle 1)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(1, 1, 'Debugging at Midnight',
'There is something about bugs that only reveal themselves after midnight.
You stare at the same code for hours, then suddenly the issue becomes obvious.
Most of the time, it is a missing bracket or a wrong variable name.',
'members_only'),

(1, 3, 'console.log Therapy',
'Before fancy debugging tools, there is console.log.
Simple, reliable, and slightly embarrassing when overused.
But it gets the job done more often than we admit.',
'public'),

(1, 5, 'Clean Code vs Working Code',
'There is always a debate between clean code and working code.
In reality, working code comes first.
Then you refine it.
Shipping matters, but so does maintainability.',
'members_only');

-- ===================== Startup Minds (Circle 2)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(2, 2, 'Ideas Are Cheap',
'Everyone has startup ideas.
Execution is the hard part.
The difference between success and failure is consistency over time.',
'members_only'),

(2, 4, 'Building in Public',
'Sharing your progress publicly can be uncomfortable.
But it creates accountability and attracts the right people.
Silence feels safe, but visibility creates opportunities.',
'public'),

(2, 6, 'First Failure',
'Your first startup will probably fail.
That is not a bad thing.
It teaches you what not to do faster than any course ever could.',
'public');

-- ===================== Music Vibes (Circle 3)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(3, 3, 'Song on Repeat',
'There is always that one song you play until you hate it.
Then you take a break and come back like nothing happened.',
'public'),

(3, 1, 'Old School vs New School',
'Every generation thinks their music is better.
Maybe it is not about better or worse.
It is about what you grew up with.',
'members_only'),

(3, 5, 'Focus Music',
'Instrumental music helps me focus more than anything with lyrics.
No distractions, just rhythm and flow.',
'members_only');

-- ===================== Gamers Hub (Circle 4)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(4, 4, 'One Last Game',
'One last game is never one last game.
It is a trap we all fall into willingly.',
'public'),

(4, 2, 'Competitive vs Casual',
'Some people play to win.
Others play to relax.
Both are valid, but mixing them in the same lobby causes chaos.',
'members_only'),

(4, 6, 'Best Game Ever?',
'Everyone has that one game they consider perfect.
Not because it is flawless, but because of the memories attached to it.',
'public');

-- ===================== Foodies Corner (Circle 5)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(5, 5, 'Simple Meals Hit Different',
'Some of the best meals are the simplest ones.
Good ingredients, basic preparation, and no stress.',
'public'),

(5, 3, 'Cooking Experiments',
'Sometimes you follow the recipe.
Sometimes you improvise and regret everything.
That is part of the experience.',
'members_only'),

(5, 1, 'Street Food vs Fine Dining',
'Fine dining is an experience.
Street food is a culture.
Both have their place depending on the mood.',
'members_only');

-- ===================== Student Life (Circle 6)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(6, 6, 'Deadline Pressure',
'Assignments always feel far away until they are not.
Then suddenly you are doing a week’s work in one night.',
'members_only'),

(6, 2, 'Group Projects',
'Group projects teach you two things.
Teamwork and patience.
Mostly patience.',
'public'),

(6, 4, 'Balancing Life',
'Balancing classes, social life, and personal goals is not easy.
You either learn time management or learn the hard way.',
'public');

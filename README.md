# The Odin Project - Members Only

This is a solution to the Members Only project from The Odin Project NodeJS course. The project focuses on building an exclusive clubhouse where authenticated users can create anonymous posts, while only members can see the identity of the authors.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Sign up and create an account
- Log in and log out securely
- Create anonymous posts
- View posts from other users
- See the author of a post only if they are members
- Upgrade their account to gain membership privileges
- Experience proper authentication and authorization throughout the app

This project emphasizes authentication, authorization, and database management.

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/nickonyi/Members-only.git)
- Live Site URL: [Live Site](https://members-only-77wf.onrender.com)

### Built with

- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript Templates)
- Passport.js (Local Strategy)
- bcrypt
- Tailwind CSS

### What I learned

The biggest takeaway was learning how authentication works in practice using Passport.js. I now understand how user sessions are created, stored, and maintained, and how middleware can be used to protect routes and restrict access based on user roles.

Another key area was working with databases. Structuring user data, handling relationships, and controlling what information is exposed depending on user permissions helped me better understand how backend systems enforce security and privacy.

I also gained experience implementing role-based access control. The distinction between regular users, members, and potentially admins required careful logic to ensure that only authorized users could view sensitive information like post authors.

Overall, this project helped me connect the dots between backend logic, database design, and user experience, especially in systems that require controlled access.

### Continued development

Moving forward, I want to deepen my understanding of backend architecture and security. This includes exploring:

- More advanced authentication strategies (e.g., JWT)
- Better session management and security practices
- Improving database design and query efficiency

I also plan to integrate these backend skills with my frontend knowledge to build full-stack applications that are both secure and scalable.

## Author

- GitHub - [@nickonyi](https://github.com/nickonyi)
- The Odin Project - [@nickonyi](https://www.theodinproject.com)

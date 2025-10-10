# Meme Gallery API — Simple Architecture Explanation

## What This Plan Is About

This project is for a **Meme Gallery API** where people can:

- Sign up and log in
- Post their own memes
- Like other people’s memes
- Have different access levels (normal users vs. admins)

## The Routes (Like Doors to the API)

Routes are the **different entry points** of your API each one does something specific.

### Authentication Routes (Sign Up & Log In)

- **POST /auth/register** → When someone creates an account.
- **POST /auth/login** → When someone logs in and gets a special token.

### Meme Routes (For Posting and Viewing Memes)

- **GET /memes** → Show all memes (anyone can see them).
- **GET /memes/:id** → Show one specific meme.
- **POST /memes** → Add a new meme (you must be logged in).
- **PUT /memes/:id** → Edit your own meme (only you or an admin).
- **DELETE /memes/:id** → Delete your meme (only you or an admin).
- **POST /memes/:id/like** → Like or unlike a meme (you must be logged in).

### User Routes (For Viewing User Content)

- **GET /users/:id/memes** → See all memes made by one user.
- **DELETE /users/:id** → Admins can delete a user account.

## The Models (Your Data Blueprints)

Models describe the **types of information** saved in the database.

### **User**

Stores info about each person:

- `username`
- `password` (saved securely, not plain text)
- `role` → regular or admin

### **Meme**

Stores info about each meme:

- `title`
- `url` → link to the image
- `userId` → the person who posted it

### **UserLikesMeme**

Tracks which users liked which memes:

- `userId` → who liked the meme
- `memeId` → which meme they liked

## How Authentication Works

1. **Register:**  
   When a user signs up, their password is **hashed** (encrypted) before saving.

2. **Login:**  
   When they log in, they receive a **JWT token** — like a digital ID card that proves who they are.

3. **Protected Routes:**  
   To post, like, or delete memes, users must include this token in their request (like showing their ID).  
   The server checks the token before allowing access.

## User Roles and What They Can Do

| Role             | What They Can Do                                                       |
| ---------------- | ---------------------------------------------------------------------- |
| **Regular User** | - Post, edit, and delete **their own** memes<br>- Like or unlike memes |
| **Admin**        | - Delete **any** meme or user<br>- Manage all platform content         |

# Applicant API

## Setup

1. Install Node.js (LTS), then run `npm install` in this directory.
2. Copy `.env.example` to `.env`.
3. Set `MONGO_URI` to the connection string copied from MongoDB Atlas and
   replace the placeholders with a MongoDB database user and database name.
   URL-encode special characters in the password.
4. Set `JWT_SECRET` to a long, random value. Do not commit or share `.env`.
5. Run `npm run dev` for development or `npm start` for production.

The API waits for MongoDB to connect before it starts listening.
If Node.js cannot resolve Atlas SRV records but your system DNS can, optionally
set `DNS_SERVERS` to a working DNS resolver address (comma-separated). This
setting only affects the Node.js process.

## Applicant endpoints

- `POST /api/applicants/register` — create an account. Required JSON fields:
  `username`, `email`, and `password`. Optional fields: `firstName`, `lastName`,
  and `phone`. Returns an applicant object.
- `POST /api/applicants/login` — authenticate with `identifier` (username or
  email) and `password`. Returns a bearer token.
- `GET /api/applicants/me` — return the authenticated applicant. Send
  `Authorization: Bearer <token>`.

Passwords are hashed before storage and are never included in API responses.

# Apex Rent — Premium Car Rental Platform

**Live Site:** [https://apex-rent.vercel.app](https://apex-rent.vercel.app) *(update with your deployed URL)*

A full-stack car rental platform where users can explore vehicles, book rides, manage listings, and authenticate securely with JWT cookies.

## Features

- Browse and search cars by name with MongoDB `$regex`, and filter by vehicle type
- Secure JWT authentication stored in HTTP-only cookies — sessions persist on page reload
- Google OAuth login for quick access
- Add, update, and delete your own car listings with owner-protected APIs
- Book cars with driver preference and special notes; booking count increments via `$inc`
- Responsive futuristic UI with theme toggle, Framer Motion animations, and custom toast notifications
- Custom 404 page and loading spinners across data-fetching views

## Tech Stack

| Layer   | Technologies                          |
|---------|---------------------------------------|
| Client  | Next.js, React, Tailwind CSS, DaisyUI |
| Server  | Express, MongoDB, JWT, bcrypt         |
| Deploy  | Vercel (client), Render (server)      |

## Local Setup

### Server (`apex-rent-server`)

```bash
cd apex-rent-server
npm install
```

Create `.env`:

```env
MONGODB=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
```

```bash
npm run dev
```

### Client (`apex-rent`)

```bash
cd apex-rent
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google OAuth Setup

Add this redirect URI in Google Cloud Console:

```
https://your-server.onrender.com/auth/google/callback
```

## Repositories

- **Client:** [GitHub — apex-rent](https://github.com/your-username/apex-rent)
- **Server:** [GitHub — apex-rent-server](https://github.com/your-username/apex-rent-server)

## Author

Built as an academic assignment — Apex Rent © 2026

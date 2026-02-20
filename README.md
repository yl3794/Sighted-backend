# Sighted – Backend

REST API powering the [Sighted iOS app](https://github.com/yl3794/Sighted-iOS) — a wildlife sighting platform built for field researchers and nature enthusiasts in Ithaca.

---

## Features

- **User Auth** — Firebase registration and login
- **Sightings API** — create, read, and filter sightings by species, location radius, and date
- **Photo Upload** — multipart upload to AWS S3 with signed URL retrieval
- **Geospatial Queries** — PostGIS-powered proximity search ("sightings within 5km")
- **Push Notifications** — trigger APNs alerts for rare species sightings nearby

---

## Tech Stack

| Layer        | Technology           |
| ------------ | -------------------- |
| Runtime      | Node.js              |
| Framework    | Express              |
| Database     | PostgreSQL + PostGIS |
| Auth         | Firebase             |
| File Storage | AWS S3               |
| Hosting      | AWS EC2              |
| Testing      | Jest                 |
| CI/CD        | GitHub Actions       |

---

## API Endpoints

```
POST   /auth/register        Register a new user
POST   /auth/login           Login and receive JWT

GET    /sightings            Get recent sightings (supports ?lat=&lng=&radius=&species=)
POST   /sightings            Create a new sighting
GET    /sightings/:id        Get a single sighting

POST   /upload               Upload a photo, returns S3 URL
```

---

## Getting Started

```bash
git clone https://github.com/yl3794/Sighted-backend
cd Sighted-backend
npm install
```

Create a `.env` file:

```
DATABASE_URL=postgresql://localhost:5432/sighted
JWT_SECRET=your_secret_here
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=sighted-photos
```

Run locally:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

---

## Database Schema

```sql
users        — id, email, password_hash, created_at
sightings    — id, user_id, species, notes, photo_url, location (PostGIS POINT), created_at
```

---

## Project Status

🚧 Active development — v1 targeting March 2026

---

## Author

Ye Lin — Cornell University, Computer Science '28  
[GitHub](https://github.com/yl3794) · [LinkedIn](https://www.linkedin.com/in/yelincs)

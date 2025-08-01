# Technical Test
## 🔧 1. Software Development Principles & Practices

This system is built with the following principles:

- **Monolith First** architecture: Focus on simplicity and maintainability.
- **Modular Design**: Clear separation between services such as authentication, importing, and transaction handling.
- **RESTful API Design**: Clean, documented endpoints.
- **Layered Architecture**: Controller → Service → Repository abstraction.
- **Security**: JWT-based authentication.
- **Streaming file parser** to handle large CSVs line-by-line.
- **Environment-based config** via `.env`.

## 🗂️ 2. Folder Structure

```
henry-technical-test/
├── client/                 # Frontend React App (Vite)
│   ├── components/         # Reusable components (Login, Upload, Transactions)
│   ├── redux/              # Redux store, slices (auth, alert, transaction)
│   ├── customRouter/       # Protected route components
│   └── App.jsx             # Main app routing
│
├── transaction-service/    # Backend transaction microservice
│   ├── prisma/             # Prisma schema and migration
│   ├── routes/             # Express routes
│   ├── controllers/        # Business logic (Create/Get Transaction)
│   └── middleware/         # Auth middleware (JWT verification)
│   └── index.js            # Main file app
│   └── Dockerfile          # Docker file
│
├── importer-service/       # CSV upload + parser + forwarder to transaction
│   └── utils/              # CSV parser, validation logic
│   └── middleware/         # Upload middleware
│   └── controllers/        # Express Controllers
│   └── routes/             # Express routes
│   └── index.js            # Main file app
│   └── Dockerfile          # Docker file
│
├── docker-compose.yml      # Define DB, client, server setup
└── docs                    # Required documents
│   └── png files           # Images design
│   └── apis_postman.postman_collection        # Postman docs
└── LICENSE
└── README.md

```

### 🔑 Key Libraries and Frameworks

| Layer | Tech |
|-------|------|
| Frontend | React (Vite), Redux Toolkit, Axios, Bootstrap |
| Backend | Node.js, Express, Prisma ORM |
| DB      | PostgreSQL |
| Auth    | JWT |
| DevOps  | Docker, Docker Compose |

## 🖥️ 3. Running the App Locally

### ✅ Prerequisites

- Node.js v20+ and `npm` or `yarn`
- Docker & Docker Compose
- PostgreSQL (can use Docker setup)

### 🔃 Setup Steps

**1. Local Development Guideline**

### Prerequisites
- Docker & Docker Compose
- Node.js (v16 or newer), npm and yarn

### Setup Local Development Environment

```bash
# Clone repository
git clone https://github.com/vinhngo1907/henry-technical-test.git
cd henry-technical-test

# Start services
docker-compose up --build

# Visit frontend
http://localhost:3000
```
- Frontend runs at: `http://localhost:3000`
- Importer API: `http://localhost:3002`
- Transaction API: `http://localhost:3001`
- PostgreSQL port (default): `5432` or `25432` (changeable in `docker-compose.yml`)

---

**2. Deployment Guideline**

### Prerequisites
- Render
- Netlify
- Permission to access resources in [henry-technical-test](https://github.com/vinhngo1907/henry-technical-test) project
- Credentials of __*****__ Statging PostgreSQL - ***The staging environment uses [Supabase](https://supabase.com) (PostgreSQL as a Service) for simplified database management and scaling via a hosted backend.***.

### Deployment Steps

**1. Deploy Client Upload in [Netlify](https://netlify.com/)**
1. Go to Netlify and select "Import from GitHub".
2. Select the repo, configure:
  - Build command: `npm run build`
  - Publish directory:
      * `client-upload/build` (for user app)
3. Netlify will automatically build and deploy.

**2. Deploy Server in [Render](https://render.com/)**
1. Create an account and connect GitHub repo.
2. Create Web Service on Render.
3. Configuration:
- Update the values in importer-service/.env.production and transaction-service/.env.production. If you don't have it, consider following the template in importer-service/.env and transaction-service/.env.
- Update the value in that file for each of importer service and transaction service
```bash
PORT={PRODUCTION_PORT}
DB_HOST={PRODUCTION_DB_HOST}
DB_PORT={PRODUCTION_DB_PORT}
DB_USER={PRODUCTION_DB_USER}
DB_PASSWORD={PRODUCTION_DB_PASSWORD}
DB_DATABASE_NAME={PRODUCTION_DB_DATABASE_NAME}
ACCESS_SECRET={PRODUCTION_REFRESH_SECRET}
REFRESH_SECRET={PRODUCTION_REFRESH_SECRET}
TRANSACTION_URL={PRODUCTION_TRANSACTION_URL}
IMPORTER_URL={PRODUCTION_IMPORTER_URL}
CLIENT_URL={PRODUCTION_CLIENT_URL}
```
3. The file should NEVER been committed to source control, because it contains sensitive information.

4. Render will automatically build and deploy when there is an update from GitHub.

### CI/CD Setup
The project uses **Render** (for backend) and **Netlify** (for frontend) for CI/CD and deployment.

- Backend is automatically deployed to [Render](https://render.com) when changes are pushed to the `main` branch in the `/transaction-service /importer-service` directory.
- Frontend is deployed to [Netlify](https://netlify.com) via Git integration from the `/client-upload` directory.

## 🧾 5. Postman Collection

You can use the Postman collection below to test all endpoints:

📥 [Download Postman Collection](./docs/apis_postman.postman_collection)

- Use this Postman document for testing apis

---

## 📚 6. Additional Documentation

A full technical document is available here:

📄 [Google Docs: Technical Design Spec](https://docs.google.com/document/d/1rU503UKApr0WDCJPC5JxYJUZoKv5YL_XzfaGEl1SYIw/edit?tab=t.0)

Includes: 
This document is used for next version in the future base on my thinking
- Database Schema & ER Diagram
- System Design Architecture
- Use Cases & Flow Diagrams
- Design Decisions
- API Reference
- Technology chocies

---

## 7. Other Notes
### What I have completed
**1. Functionalities**
1. User Login / Register / Logout (JWT-based authentication)
2. Upload CSV/Excel files to import transaction records (in MVP: small files only, not optimized yet for >1M+ records)
3. View list of imported transactions with pagination and summary

**2. Deployment Process**
1. Front-end:
2. Back-end: 
3. Database:
4. CI server:Managed via Render (backend) and Netlify (frontend)

## 8. What can be improved
1. Support large file uploads (streaming, queues)

2. Improve auth (token refresh, limits)

3. Better UX (progress, feedback)

4. Add CI/CD (Travis/Jenkins), tests

5. Modularize for future scaling
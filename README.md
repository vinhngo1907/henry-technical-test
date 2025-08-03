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
├── client-upload/         # Frontend React App (Vite)
│   ├── src/components/    # Reusable components (Login, Upload, Transactions)
│   ├── src/redux/         # Redux store, slices (auth, alert, transaction)
│   ├── src/customRouter/  # Protected route components
│   ├── src/utils/         # Fetch apis, validation
│   ├── src/context/       # Config urls
│   ├── src/styles/        # Style CSS
│   └── src/App.jsx        # Main app routing
│
├── transaction-service/    # Backend transaction microservice
│   ├── prisma/             # Prisma schema and migration
│   ├── routes/             # Express routes
│   ├── controllers/        # Business logic (Create/Get Transaction)
│   └── middleware/         # Auth middleware (JWT verification)
│   └── index.js            # Main file app
│   └── .env                # Env for transaction-service
│   └── Dockerfile          # Docker file
│
├── importer-service/       # CSV upload + parser + forwarder to transaction
│   └── utils/              # CSV parser, validation logic
│   └── uploads/            # Uploads files
│   └── middleware/         # Upload middleware
│   └── controllers/        # Express Controllers
│   └── routes/             # Express routes
│   └── index.js            # Main file app
│   └── .env                # Env for importer-service
│   └── Dockerfile          # Docker file
│
├── docker-compose.yml      # Define DB, client, server setup
├── .env                    # Setup env for docker-compose
└── docs                    # Required documents
│   └── png files           # Images design
│   └── apis_postman.postman_collection        # Postman docs
└── LICENSE
└── README.md

```

### 🔑 Key Libraries and Frameworks

| Layer    | Tech |
|----------|------|
| Frontend | React (Vite), Redux Toolkit, Axios, Bootstrap |
| Backend  | Node.js, Express, Prisma ORM |
| DB       | PostgreSQL |
| Auth     | JWT |
| DevOps   | Docker, Docker Compose |
| CI/CD    | Git-base handled via Render and Netlify auto-deployment. |

## 🖥️ 3. Running the App Locally

### 🔃 Setup Steps

**1. Local Development Guideline**

### Prerequisites
- Node.js v20+ and `npm` or `yarn`
- Docker & Docker Compose
- PostgreSQL (can use Docker setup)

### Setup Local Development Environment

```bash
# Clone repository
git clone https://github.com/vinhngo1907/henry-technical-test.git
cd henry-technical-test

# Start services importer-service, transaction service and database
docker-compose up --build

# Visit frontend
cd client-upload
run npm insall & npm run dev

http://localhost:5173/ 
```
- Frontend runs at: `http://localhost:5173`
- Importer API: `http://localhost:3002`
- Transaction API: `http://localhost:3001`
- PostgreSQL port (default): `5432` or `25432` 
**Note:** All of services will run on ports 3001, 3002 and 5432. If there is a port is being used, please change it to a different port in `docker-compose.yml` and `importer-service/.env`, `transaction-service/.env`

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
4. The files should NEVER been committed to source control, because it contains sensitive information.

5. Render will automatically build and deploy when there is an update from GitHub.

**3. CI/CD Setup**
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
1. Front-end: https://v-transaction.netlify.app
2. Importer Service: https://importer-service.onrender.com
3. Transaction Service: https://transaction-service.onrender.com
3. Database: https://supabase.com
4. CI server: Managed via Render (backend) and Netlify (frontend). By creating 1 more branch called master(releases). The CI should support the app when code is merged to this branch.

## 8. What can be improved
1. Support large file uploads (streaming, queues)
2. Improve auth (token refresh, limits)
3. More usnit tests for back-end
4. Write some end-to-end tests
5. Better UX (progress, feedback)
6. Add CI/CD (Travis/Jenkins), tests
7. Modularize for future scaling 
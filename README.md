# Technical Test - Readme

## 1. Local Development Guideline

### Prerequisites
- Docker & Docker Compose
- Node.js (v16 or newer), npm and yarn

### Setup Local Development Environment
1. Clone the project to local machine and go to the folder:
```bash
    git clone https://github.com/vinhngo1907/henry-technical-test.git
    cd henry-technical-test
```
2. Run make setup to install dependencies and setup the local DB (Run migration and seeding).

3. Run yarn dev to run the client and back-end in development mode (live-reload support).

4. The app should be accessible at ```http://localhost:3000```. The API can be accessed at ```http://localhost:3001```.

**Notes**: The local DB will use port 25432. If the port is being used, please change it to a different port in docker-compose.yml and server/.env.

### Useful Commands
1. If you want to reset or server separately, go to ```client```, ```server``` folders and run ```yarn dev``` in each.
2. Run ```yarn lint``` to find and fix issues.
3. Run ```yarn db:update``` to update the schema, it will also run ```yarn typeorm migration:generate -n MigrationName```. The models will be generated automatically (See TypeORM migration)
4. Back-end: ```bash yarn db:migrate``` to run the migration.

## 2. Deployment Guideline

### Prerequisites
- Google Cloud SDK
- Permission to access resources in henry-technical-2 project
- Credentials of __*****__ Statging DB

### Deployment Steps

Front-end: Run ```yarn deploy``` to deploy to GCP. If we migrate to Google Storage, then use deploy.sh instead.
Back-end: 
1. Update the values in server/.env.production. If you don't have it, consider following the template in server/.env.
2. Update the value in that file
```bash
DB_HOST={PRODUCTION_DB_HOST}
DB_PORT={PRODUCTION_DB_PORT}
DB_USER={PRODUCTION_DB_USER}
DB_PASSWORD={PRODUCTION_DB_PASSWORD}
DB_DATABASE_NAME={PRODUCTION_DB_DATABASE_NAME}
GOOGLE_STORE_BUCKET={PRODUCTION_GOOGLE_STORE_BUCKET}
JWT_SECRET={PRODUCTION_JWT_SECRET}
```
3. The file should NEVER been committed to source control, because it contains sensitive information.
4. Run yarn deploy to deploy to Google App Engine.

### CI/CD Setup
The project use TravisCI for CI/CD. The project can be accessed at Henry Technical Test. Please modify /server/.travis.yml. If you want to update the build and CI process.

## 3. Other Notes
### What I have completed
**1. Functionalities**
1. Showing menu: Categories and Food. Show Food Detail when clicked.
2. Fake login/logout, using JWT for authentication.
3. Individual Cart: Add/Edit/Delete.
4. Group Cart: Join Cart as Temporary User, Leave Cart, Delete the whole cart.
5. For simplicity, the cart will be synced every 10 seconds of using real-time technology.

**2. Deployment Process**
1. Front-end:
2. Back-end: 
3. Database:
4. CI server:
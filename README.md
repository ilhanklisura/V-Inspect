# 🚗 V-Inspect

V-Inspect is a full-stack web application that enables vehicle owners to register their vehicles and schedule technical inspections online. It features role-based access control, secure authentication, data validation, and inspection management tailored for different user roles.

## 🔧 Tech Stack

- ⚙️ Backend: PHP (FlightPHP RESTful API)
- 🖥️ Frontend: React.js & Tailwind CSS
- 🛢️ Database: MySQL
- 🧪 Testing: PHPUnit
- ☁️ Deployment: DigitalOcean App Platform

## 👥 Project Contributors

- 👨‍💻 Ilhan Klisura – Backend (PHP + MySQL, Swagger, JWT, Deployment, React.js & Tailwind CSS)
- 🎨 Harun Musa – Frontend (React.js & Tailwind CSS)

## 🚀 Features (v2.0.0 Production Release)

- 🔐 Secure JWT Authentication and Role-Based Access Control (Admin, Vehicle Owner, Inspection Staff)
- ✅ Full CRUD functionality for:
  - Users (Admin-only management)
  - Vehicles (Vehicle owners + Admin)
  - Inspection Stations (Admin-only)
  - Inspections (Vehicle Owners, Staff, Admins)
- 📄 Swagger/OpenAPI documentation for all API endpoints
- 🧪 PHPUnit backend test coverage for core services
- 🌐 Deployment to DigitalOcean:
  - Frontend: [🔗 V-Inspect](https://vinspect-frontend-pepwp.ondigitalocean.app)
  - API Docs: [🔗 V-Inspect Swagger UI](https://vinspect-backend-6lgv6.ondigitalocean.app/public/v1/docs/)

## 🧑‍🔧 User Roles

- 🧑 Vehicle Owner – Register/login, manage own vehicles, schedule/view inspections
- 🧑‍🔧 Inspection Staff – View/manage inspections
- 🛡️ Admin – Manage users, stations, inspections and vehicles

## 📦 Installation & Setup (for local development)

1. Clone the repository:
   ```bash
   git clone https://github.com/ilhanklisura/V-Inspect.git
   ```

2. Set up MySQL and import the database schema (see `/database/schema.sql` if provided)

3. Configure backend environment:
   - Create a .env or set these in your deployment platform:
     ```
     DB_HOST=your_host
     DB_PORT=3306
     DB_NAME=your_db_name
     DB_USER=your_user
     DB_PASSWORD=your_pass
     JWT_SECRET=your_secret_key
     ```

4. Start backend with PHP:
   ```bash
   php -S localhost:8080 -t backend
   ```

5. Open frontend in your browser (if static):
   ```bash
   cd frontend
   open index.html
   ```

## ✅ How to Run Tests

Unit tests are located in:
```
backend/tests/
```

To execute tests:
```bash
cd backend
vendor/bin/phpunit ./tests
```

## 📄 Swagger Documentation

Access full API documentation:
[https://vinspect-backend-6lgv6.ondigitalocean.app/public/v1/docs](https://vinspect-backend-6lgv6.ondigitalocean.app/public/v1/docs)

## 📦 Release History

- v1.0.0 – MVP with login, vehicle registration, inspection scheduling
- v2.0.0 – Production release with full CRUD, JWT auth, Swagger docs, PHPUnit tests, DigitalOcean deployment
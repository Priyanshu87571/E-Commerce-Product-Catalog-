# ShopSphere — E-Commerce Product Catalog

A complete full-stack E-Commerce Product Catalog demonstrating scalable backend design with React, Node.js/Express, MongoDB, REST APIs, search/filtering, pagination, indexing, validation, sanitization, modular services, authentication, tests, Docker, and seed data.

## 1. Features

### Frontend
- React 18 + Vite
- API-driven catalog UI
- Responsive product grid
- Advanced search
- Category filter
- Min/max price filtering
- In-stock filter
- Sorting by newest, price, rating, and name
- Server-side pagination
- Product details page
- Login/register UI
- Token-based authentication persistence
- Responsive layout

### Backend
- Node.js + Express
- RESTful API structure
- Modular routes/controllers/services/models
- MongoDB + Mongoose
- Text index for search
- Compound indexes for category/price and active/createdAt queries
- Pagination with bounded page size
- Request validation
- Basic input sanitization
- Centralized error handling
- Helmet security headers
- CORS configuration
- Rate limiting
- JWT authentication
- Admin-only product management APIs
- Soft-delete/archive for products
- API health endpoint
- Seed script
- Jest + Supertest tests with MongoDB Memory Server

## 2. Architecture

```text
frontend (React/Vite)
        |
        | REST/JSON + JWT
        v
backend (Express)
  routes -> controllers -> services -> models
                         |
                         v
                      MongoDB
```

The frontend never talks directly to MongoDB. All data access goes through REST endpoints.

## 3. Requirements

- Node.js 20+
- npm 10+
- MongoDB 7+ locally OR Docker Desktop

## 4. Local setup

### Start MongoDB
Make sure MongoDB is running on `mongodb://localhost:27017`.

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Windows PowerShell users can copy the environment file manually:

```powershell
Copy-Item .env.example .env
```

Backend: `http://localhost:5000`
Health: `http://localhost:5000/api/health`

### Frontend

Open a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## 5. Demo accounts

After running the seed script:

- Admin: `admin@example.com` / `Admin@12345`
- User: `user@example.com` / `User@12345`

Do not use these credentials in production.

## 6. API endpoints

### Health
`GET /api/health`

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` — Bearer token required

### Categories
- `GET /api/products/categories`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` — admin token required
- `PUT /api/products/:id` — admin token required
- `DELETE /api/products/:id` — admin token required; archives product

### Product query examples

```text
GET /api/products?search=keyboard
GET /api/products?category=<CATEGORY_ID>
GET /api/products?minPrice=20&maxPrice=100
GET /api/products?inStock=true
GET /api/products?sort=price_asc
GET /api/products?page=2&limit=12
GET /api/products?search=wireless&sort=rating&page=1&limit=6
```

## 7. Product response design

Successful list responses use a consistent shape:

```json
{
  "success": true,
  "message": "Products fetched",
  "data": [],
  "meta": {
    "total": 12,
    "page": 1,
    "limit": 12,
    "pages": 1
  }
}
```

## 8. Database indexes

The Product model includes:

- text index on `name`, `description`, `brand`, `tags`
- `{ category: 1, price: 1 }`
- `{ isActive: 1, createdAt: -1 }`
- individual indexes for frequently filtered fields

This gives the project an explicit performance/scalability story rather than treating the database as a simple CRUD store.

## 9. Validation and sanitization

Validation happens before product creation/update and registration. Product input checks required fields and numeric constraints. A lightweight sanitization middleware strips `<` and `>` from incoming body strings. In production, stronger schema-level validation such as Zod/Joi and a dedicated sanitization package can be added.

## 10. Testing

```bash
cd backend
npm test
```

Tests cover:
- health endpoint
- product listing/pagination
- invalid registration input

The test suite uses MongoDB Memory Server so it does not require a persistent local MongoDB instance.

## 11. Docker

From the repository root:

```bash
docker compose up --build
```

This starts MongoDB, the API, and the frontend. The Docker frontend is available at `http://localhost:5173` and the API at `http://localhost:5000`.

## 12. Suggested production improvements

- Redis caching for popular searches
- Object storage/CDN for product images
- Elasticsearch/OpenSearch for very large catalogs
- Background jobs for indexing and analytics
- Observability with OpenTelemetry
- Structured JSON logging
- API versioning (`/api/v1`)
- CI pipeline for lint/test/build/security scanning
- Refresh-token rotation
- Fine-grained RBAC
- Automated database migrations/backup strategy
- Inventory reservation and transactional order workflow

## 13. Interview explanation

**Why this project?**

I wanted to demonstrate more than basic CRUD. The project separates routes, controllers, services, and models; exposes REST APIs; uses MongoDB indexes for search and filtering; implements server-side pagination; validates and sanitizes input; and adds authentication, rate limiting, centralized error handling, tests, and Docker support.

**Scalability story:**

For a larger catalog, I would add Redis for repeated queries, Elasticsearch/OpenSearch for advanced full-text/faceted search, CDN-backed image storage, horizontal API scaling, and observability. Pagination remains server-side so the client does not load the full catalog into memory.

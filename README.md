# E-commerce API (Codecademy Part One)

Minimal Express + PostgreSQL API for the Codecademy project.

Prerequisites
- Node.js 18+ and npm
- PostgreSQL running locally (port 5432)

Setup

1. Install dependencies

```bash
npm install
```

2. Copy or create a `.env` file in the project root with:

```
DATABASE_URL=postgres://<user>:<password>@localhost:5432/<dbname>
PORT=3000
JWT_SECRET=your_jwt_secret
```

3. Create database tables

```bash
npm run create-db
```

4. Start the server (development mode)

```bash
npm run dev
```

Endpoints
- `GET /` — health/info
- `GET /api-docs` — Swagger UI
- Auth: `POST /auth/register`, `POST /auth/login` (returns `token`)
- Products: `GET /products` (other CRUD routes included)
- Cart (protected): `GET /cart`, `POST /cart`, `DELETE /cart/:id`
- Orders (protected): `GET /orders`, `GET /orders/:id`
- Checkout (protected): `POST /checkout`

Example: get a token and call a protected route

```bash
# register
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"email":"me@example.com","password":"pw"}'

# login
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"me@example.com","password":"pw"}'
# response includes "token": "<JWT>"

# call protected route
curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/cart
```


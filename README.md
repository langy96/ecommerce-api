# E-commerce API

This is a simple backend server built with Express and PostgreSQL. It was made for a Codecademy project, but anyone can use it to learn how an online shop API works.

## What you need

- **Node.js** (version 18 or newer) and **npm**
- **PostgreSQL** running on your computer (default port 5432)

## Getting started

1. **Install the code dependencies**

   ```bash
   npm install
   ```

2. **Create a `.env` file** in the project root. The file should look like this:

   ```env
   DATABASE_URL=postgres://<user>:<password>@localhost:5432/<dbname>
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

   Replace `<user>`, `<password>`, and `<dbname>` with your database details, and choose a secret string for `JWT_SECRET`.

3. **Create the database tables**

   ```bash
   npm run create-db
   ```

4. **Start the server** (in development mode):

   ```bash
   npm run dev
   ```

   The server will listen on the port you set in `.env` (default 3000).

## Available API routes

- `GET /` — simple health check
- `GET /api-docs` — interactive API documentation (Swagger)

### Auth
- `POST /auth/register` — create a new user
- `POST /auth/login` — log in, returns a JSON Web Token (JWT)

### Products
- `GET /products` — list products
- Other product routes (create, update, delete) are also available.

### Cart (requires login)
- `GET /cart` — view your cart
- `POST /cart` — add an item
- `DELETE /cart/:id` — remove an item

### Orders (requires login)
- `GET /orders` — list your orders
- `GET /orders/:id` — view a specific order

### Checkout (requires login)
- `POST /checkout` — finalize an order

## Example usage

1. **Register a user**

   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"me@example.com","password":"pw"}'
   ```

2. **Log in to get a token**

   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"me@example.com","password":"pw"}'
   ```

   The response will include a field called `token`.

3. **Use the token to access a protected route**

   ```bash
   curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/cart
   ```

   Replace `<TOKEN>` with the JWT from the login step.

---

Feel free to read the code to see how everything works or modify it for your own project!

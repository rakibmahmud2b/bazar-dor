# বাজার দর | BazarDor

BazarDor is a responsive web application that helps people in Bangladesh check daily prices of essential products, track price changes, and compare prices across different markets.

The goal is to make everyday shopping easier by providing useful market price information in one place.

## Features

- **Daily Market Prices:** View current prices, previous price changes, and market information for 33 products using an API.
- **Price Updates:** Check products with rising and falling prices separately and follow the live price ticker.
- **Product Categories:** Browse products by category with responsive product cards and properly sorted Bengali numbers.
- **Product Details:** Sign in to access product details and compare minimum and maximum prices across 12 markets.
- **Authentication:** Create an account, sign in, and sign out using email and password with Better Auth.
- **Social Login:** Sign in with Google or GitHub after configuring the required environment credentials.
- **User Profile:** Access a protected profile page and update your name using Better Auth's `updateUser` API.
- **User-Friendly Interface:** Includes skeleton loading states, toast notifications, a custom 404 page, and a mobile-friendly layout.

## Technologies Used

- Next.js 16 with App Router
- React 19
- JavaScript
- Better Auth
- SQLite for local authentication storage
- Tailwind CSS 4 and custom responsive CSS
- Lucide Icons
- React Hot Toast
- BazarDor Product API

## Getting Started

Follow these steps to run the project on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

1. Clone the repository and open the project folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create your local environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Run the authentication database migration:

   ```bash
   npm run auth:migrate
   ```

   Confirm the migration when prompted.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

Local email and password authentication stores its data in `bazardor-auth.sqlite`. Make sure this database file is excluded from source control.

## Environment Configuration

Before deploying the application, configure the required environment variables.

- `BETTER_AUTH_SECRET`: A unique, randomly generated secret containing at least 32 characters.
- `BETTER_AUTH_URL`: The base URL of your application, matching the deployed domain.
- Google OAuth credentials: Required to enable Google sign-in.
- GitHub OAuth credentials: Required to enable GitHub sign-in.

Use the following callback URLs when configuring OAuth providers:

- Google: `/api/auth/callback/google`
- GitHub: `/api/auth/callback/github`

Google and GitHub sign-in will be available once their respective client IDs and client secrets are configured.

**Deployment note:** The included SQLite setup is intended for local development or environments with persistent storage. For serverless deployment, use a persistent database adapter supported by Better Auth and configure the required connection settings. An ephemeral filesystem may not retain user accounts between instances.

## Product API

BazarDor uses the following API endpoints to retrieve product and category information.

**Primary API**

`https://api.api-store.workers.dev/api/bazardor`

**Fallback API**

`https://api.abcz.workers.dev/api/bazardor`

The application uses these endpoints:

- `/products` — Retrieve the product catalog.
- `/products?category={slug}` — Get products from a specific category.
- `/products/{id}` — Retrieve details for a specific product.
- `/categories` — Retrieve available categories.
- `/categories/{slug}` — Get information about a specific category.

Public product routes use slugs, while the product detail API expects a numeric ID. The application resolves the corresponding ID from the product catalog before requesting the details.

## Available Scripts

Run the following commands to check the project before deployment.

**Lint**

```bash
npm run lint
```

**Production Build**

```bash
npm run build
```

## Project Goal

BazarDor is built to make market price information easier to access and understand. By bringing product prices, price changes, and market comparisons together, it aims to help users make more informed everyday shopping decisions.
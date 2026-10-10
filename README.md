# বাজার দর | BazarDor

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা দেখার একটি responsive web app.

## Features

- API থেকে ৩৩টি পণ্যের আজকের দাম, আগের দামের পরিবর্তন এবং বাজারের তথ্য
- দাম বাড়া ও কমা পণ্যের আলাদা তালিকা এবং চলমান live price ticker
- বিভাগভিত্তিক catalog, Bengali সংখ্যার সঠিক numeric sorting এবং responsive product cards
- সাইন ইন ছাড়া প্রবেশ করা যায় না এমন product detail page; ১২টি বাজারের min/max price
- Better Auth দিয়ে email/password sign-up, sign-in ও sign-out
- Environment credentials যোগ করলে Google ও GitHub social login
- Protected profile এবং Better Auth-এর `updateUser` API দিয়ে নাম পরিবর্তন
- Skeleton loading, toast feedback, invalid route-এর 404 page এবং mobile layout

## Technologies

- Next.js 16 App Router, React 19, JavaScript
- Better Auth with SQLite for local development
- Tailwind CSS 4, custom responsive CSS, Lucide icons
- React Hot Toast
- BazarDor product API

## Run Locally

```bash
npm install
Copy-Item .env.example .env
npm run auth:migrate
npm run dev
```

The migration command asks for confirmation before creating the auth tables. Open `http://localhost:3000` after it completes. Local email/password auth stores its database in `bazardor-auth.sqlite`; keep this file out of source control.

Set `BETTER_AUTH_SECRET` to a unique random value of at least 32 characters before deployment. `BETTER_AUTH_URL` must match the deployed origin. Google and GitHub buttons become active after their corresponding client ID and secret are configured in the environment. OAuth callback URLs should use `/api/auth/callback/google` and `/api/auth/callback/github`.

The included SQLite adapter is intended for local development or a host with persistent disk. Serverless deployments need a persistent Better Auth database adapter and its connection environment variables; an ephemeral function filesystem will not retain accounts between instances.

## Data API

Primary base URL: `https://api.api-store.workers.dev/api/bazardor`
Fallback base URL: `https://api.abcz.workers.dev/api/bazardor`

The app reads `/products`, `/products?category={slug}`, `/products/{id}`, `/categories`, and `/categories/{slug}`. The public product routes use slugs; the detail API expects a numeric ID, resolved from the catalog first.

## Checks

```bash
npm run lint
npm run build
```
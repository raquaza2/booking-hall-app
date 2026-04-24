# Grand Aurora Hall Booking

A responsive hall booking web app built with Next.js, Prisma, PostgreSQL, and Tailwind CSS. It supports public venue browsing, booking requests, booking confirmation pages, and a simple admin dashboard for pending, approved, and rejected bookings.

## Features

- Responsive landing page and venue details page
- Booking request form with date, time slot, contact details, guest count, and notes
- Server-side validation with Zod
- Booking confirmation page with current status
- Admin email/password login
- Admin dashboard with status filters and approve/reject controls
- PostgreSQL-ready Prisma schema
- Local Docker Compose database option

## Local Setup

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

Default seeded admin:

- Email: `admin@aurorahall.test`
- Password: `admin12345`

## Useful Commands

```bash
npx prisma validate
npm run lint
npm run build
npm run db:push
npm run db:seed
```

For hosted PostgreSQL, replace `DATABASE_URL` in `.env` or your deployment provider with the hosted connection string. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a long random `SESSION_SECRET` before deploying.

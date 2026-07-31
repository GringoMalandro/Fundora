<div align="center">

![Fundora](https://capsule-render.vercel.app/api?type=waving&color=0:11261A,50:1B4332,100:C8F20B&height=230&section=header&text=Fundora&fontSize=78&fontColor=FFFFFF&animation=fadeIn&fontAlignY=38&desc=Small%20credits.%20Big%20beginnings.&descAlignY=60&descSize=20)

# Fundora

### Crowdfunding for brave ideas and meaningful community impact.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Fundora-C8F20B?style=for-the-badge&logo=vercel&logoColor=11261A)](https://fundora-hazel.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![MIT License](https://img.shields.io/badge/License-MIT-1B4332?style=for-the-badge)](LICENSE)

[Live Website](https://fundora-hazel.vercel.app) · [GitHub](https://github.com/GalibDev/Fundora) · [Report Issue](https://github.com/GalibDev/Fundora/issues)

</div>

## ✨ What is Fundora?

Fundora is a full-stack crowdfunding platform that helps supporters back meaningful projects with credits, enables creators to launch and manage campaigns, and gives administrators the tools to moderate the platform safely.

## 🖼️ Live Preview

<p align="center">
  <a href="https://fundora-hazel.vercel.app">
    <img src="https://image.thum.io/get/width/1200/crop/720/noanimate/https://fundora-hazel.vercel.app/?v=20260731" alt="Current Fundora homepage" width="900" />
  </a>
</p>

## 🔐 Demo Admin Access

| Field | Value |
| --- | --- |
| Email | `admin@fundora.com` |
| Password | `Admin123!` |

> For a real production launch, replace `ADMIN_PASSWORD` with a strong private password.

## 🚀 Core Features

- Three role-aware dashboards: Supporter, Creator, and Admin
- Email/password authentication with JWT and persistent private routes
- Google Sign-In for quick onboarding
- Supporters receive 50 credits; creators receive 20 credits on registration
- Top-funded and closing-soon campaign discovery sections
- Search, category, funding goal, deadline, and sorting filters
- Campaign detail page with contribution workflow
- Creator contribution approval/rejection with automatic supporter refund
- Creator campaign creation, update, deletion, earnings, and withdrawals
- Stripe Checkout credit packages and webhook-based credit fulfilment
- Admin campaign approval, user management, withdrawals, and reports
- In-app notifications with read and mark-all-read interactions
- ImgBB image uploading for profile and campaign images
- Mobile, tablet, and desktop responsive UI with Framer Motion animations

## 👥 Role Workflows

| Supporter | Creator | Admin |
| --- | --- | --- |
| Explore and contribute to campaigns | Launch, update, and delete campaigns | Approve/reject campaign submissions |
| Purchase credits with Stripe | Review supporter contributions | Manage users and roles |
| Track contribution/payment history | Request withdrawals | Process withdrawals and reports |
| Receive contribution status notifications | View campaign and earnings statistics | Monitor platform statistics |

## 🧰 Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod |
| Backend | Express.js, TypeScript, JWT, Zod |
| Database | MongoDB Atlas, Mongoose |
| Payments | Stripe Checkout + webhooks |
| Images | ImgBB |
| Deployment | Vercel (client) + Render (server) |

## 📁 Project Structure

```text
Fundora/
├── client/                 # Next.js frontend
│   ├── app/                # Routes and pages
│   ├── components/         # UI components
│   └── lib/                # Auth, API, types, demo data
├── server/                 # Express API
│   └── src/
│       ├── routes/         # Auth, campaigns, payments, admin
│       ├── models/         # Mongoose models
│       └── middleware/     # JWT and role authorization
├── render.yaml             # Render deployment blueprint
└── LICENSE                 # MIT License
```

## 💻 Run Locally

**Requirements:** Node.js 20+ and a MongoDB Atlas database.

```bash
git clone https://github.com/GalibDev/Fundora.git
cd Fundora
npm run install:all
copy server\.env.example server\.env
copy client\.env.example client\.env.local
npm run dev
```

- Client: `http://localhost:3000`
- API: `http://localhost:5000`

## ⚙️ Environment Variables

### Client — `client/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_IMGBB_KEY=your-imgbb-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Server — `server/.env`

```env
PORT=5000
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=use-a-long-random-secret
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_EMAIL=admin@fundora.com
ADMIN_PASSWORD=Admin123!
```

Optional email notifications: add `RESEND_API_KEY` and `EMAIL_FROM`.

## 💳 Stripe Test Mode

Configure this webhook endpoint in Stripe:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/webhooks/stripe
```

Subscribe to `checkout.session.completed`. For testing, use card number `4242 4242 4242 4242`, any future expiry date, and any CVC.

## ☁️ Deployment

1. Deploy the `server` folder to Render with [`render.yaml`](render.yaml).
2. Configure MongoDB, JWT, Stripe, Google, ImgBB, and admin environment variables.
3. Import the repository into Vercel and select `client` as the **Root Directory**.
4. Set `NEXT_PUBLIC_API_URL` on Vercel to your Render API URL ending in `/api`.
5. Set `CLIENT_URL` on Render to your Vercel domain and redeploy both services.

## 📄 License

Released under the [MIT License](LICENSE).

<div align="center">Made with care by <a href="https://github.com/GalibDev">GalibDev</a>.</div>

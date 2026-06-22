# 🩸 BloodLink — Blood Donation Platform

BloodLink is a full-stack MERN blood donation platform that connects blood donors with people in need. It supports donor registration, donation request management, role-based dashboards (Donor, Volunteer, Admin), and a Stripe-powered funding system to support platform operations.

## 🔗 Live URLs

- **Client (Live Site):** https://blood-donation-client-delta.vercel.app
- **Server (API):** https://blood-donation-server-wrpd.onrender.com

## 🧑‍💻 Admin Credentials

- **Email:** admin@test.com
- **Password:** (set during testing)

## ✨ Key Features

- 🔐 **Authentication** — Firebase email/password auth with JWT-secured private routes
- 🩸 **Donation Requests** — Create, edit, delete, and track blood donation requests with status flow (pending → inprogress → done/canceled)
- 👥 **Role-Based Access Control** — Three roles (Donor, Volunteer, Admin) each with tailored dashboard permissions
- 📊 **Admin Dashboard** — Manage users (block/unblock, promote to volunteer/admin), view platform-wide statistics, and oversee all donation requests
- 🔍 **Donor Search** — Search registered donors by blood group, district, and upazila
- 💳 **Funding System** — Stripe-integrated donation/funding page with a running total and transaction history
- 📱 **Fully Responsive** — Sidebar-based dashboard and public pages adapt across mobile, tablet, and desktop
- 🎨 **Smooth Animations** — Framer Motion transitions throughout the UI
- 🔔 **Toast Notifications** — React Hot Toast and SweetAlert2 for real-time feedback on actions

## 🛠️ Tech Stack

**Client:**
- Next.js 16 (App Router)
- React, Tailwind CSS, daisyUI
- Firebase Authentication
- TanStack React Query
- React Hook Form
- Framer Motion
- Stripe (`@stripe/stripe-js`, `@stripe/react-stripe-js`)
- Axios
- SweetAlert2, React Hot Toast
- Lucide React (icons)

**Server:**
- Node.js, Express.js
- MongoDB (native driver)
- JSON Web Token (JWT) for route protection
- Stripe (server-side payment intents)
- Cookie-based auth with `httpOnly` cookies

## 📦 NPM Packages Used

**Client:** `next`, `react`, `firebase`, `axios`, `@tanstack/react-query`, `react-hook-form`, `framer-motion`, `@stripe/stripe-js`, `@stripe/react-stripe-js`, `sweetalert2`, `react-hot-toast`, `lucide-react`, `recharts`

**Server:** `express`, `cors`, `cookie-parser`, `jsonwebtoken`, `mongodb`, `dotenv`, `stripe`

## 🚀 Getting Started Locally

### Client
```bash
cd blood-client
npm install
# add a .env.local file with your Firebase, ImgBB, Stripe, and API URL keys
npm run dev
```

### Server
```bash
cd blood-server
npm install
# add a .env file with MONGODB_URI, ACCESS_TOKEN_SECRET, STRIPE_SECRET_KEY
npm run dev
```

## 🗂️ User Roles

| Role | Permissions |
|------|-------------|
| **Donor** | Create/edit/delete own donation requests, view own request history, donate to others' requests |
| **Volunteer** | View all donation requests, update donation status only |
| **Admin** | Full access — manage users (block/unblock/promote), manage all donation requests, view platform statistics |

---


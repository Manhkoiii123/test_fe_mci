# User Management Application

## Project Overview

This is a web-based user management application built using modern front-end technologies. The application provides essential features like user authentication and CRUD operations, with a strong emphasis on secure access control. It offers a user-friendly interface and efficient data management powered by robust libraries.

---

## Technologies Used

- **Next.js**: A React framework for building server-rendered and statically generated applications.
- **TypeScript**: Adds type safety for more robust development.
- **TanStack Query**: Handles server-side state management and API interactions.
- **Ant Design (Antd)**: A rich library of UI components and layout utilities for designing professional applications.

---

## Features

### 1. Authentication System

- **Login**: Securely authenticate users with their credentials.
- **Register**: Create new accounts for users to access the application.

### 2. Middleware for Route Protection

- Restricts non-logged-in users from accessing protected pages like the home dashboard.
- Prevents authenticated users from revisiting the login or register pages.

### 3. Users

- **Create**: Add new users.
  Use a third-party API to fetch data about cities. When a city is selected, it will automatically render the corresponding districts.
- **Read**: View a list of users or specific user details.

---

## Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

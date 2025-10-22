# Developer Portfolio

This is my personal developer portfolio built with **Next.js**, **Tailwind CSS**, and **Prisma**, running in a **Dockerized development environment**, and deployed via **CI/CD with GitHub Actions**.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Containerization**: [Docker](https://www.docker.com/)
- **Hosting**: [Vercel](https://vercel.com/) (or specify your own)

## Preview

**Live Site**: [https://ahammer.fr](https://ahammer.fr)

## Development Setup

To run the project locally with Docker:

### 1. Clone the repository

```bash
git clone https://github.com/ahammer0/perso2.git
cd perso2
```

### 2. Set up environment variables

Copy the file `.env.example` to `.env`
the already set envvars will suffice to use all the app except the mailing of
the contact form.

Set admin pass envvars by running :

```bash
node ./generateAdminKey.js
```

### 3. Install dev dependencies

```bash
npm i
```

### 4. Start the dev database using Docker

Run this in a separate terminal

```bash
docker compose up
```

### 5. Migrate the database using prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 6. Run Next.js dev server

```bash
npm run dev
```

## Author

Axel Schwindenhammer

[Portfolio](https://ahammer.fr)
[GitHub](https://github.com/ahammer0)
[LinkedIn](https://www.linkedin.com/in/axel-schwindenhammer-1568a2300/)

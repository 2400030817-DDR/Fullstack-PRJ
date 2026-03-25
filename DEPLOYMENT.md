# Deployment Guide

This repo is ready to deploy as a Vite single-page app on Vercel.

## Frontend: Vercel

Create a new Vercel project connected to this GitHub repository and use:

- Framework Preset: `Vite`
- Root Directory: `.`
- Build Command: `npm run build`
- Output Directory: `dist`

The included `vercel.json` rewrites all routes to `index.html` so React Router works on refresh and direct links.

## Backend: Render

The repository now includes a backend scaffold under `server/` for Express + MySQL.

Create a Render Web Service with:

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

Recommended environment variables on Render:

- `PORT`
- `NODE_ENV=production`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `CORS_ORIGIN`
- `DB_SSL=true`

Do not upload your local `.env` file. Add those values in the Render dashboard instead.

## Database: Aiven MySQL

Create a free MySQL service on Aiven and copy its connection values into Render environment variables.

Typical values you will receive:

- host
- port
- database
- username
- password
- SSL requirement

This backend scaffold already uses `mysql2` with optional SSL via `DB_SSL=true`.

## Current Recommendation

1. Deploy the frontend on Vercel.
2. Create a MySQL instance on Aiven or another managed MySQL provider.
3. Import [schema.sql](c:/Users/Dharanidar%20Reddy/OneDrive/Desktop/PRJ%20DONATION/server/database/schema.sql) into that database.
4. Deploy the `server/` folder on Render with the database credentials added as environment variables.

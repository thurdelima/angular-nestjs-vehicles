#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
while ! nc -z postgres 5432; do
  sleep 1
done

echo "Generating Prisma client..."
npx prisma generate

echo "Running Prisma migrations and seeding..."
npx prisma migrate deploy
npx prisma db seed

echo "Starting NestJS app in dev mode..."
npm run start:dev

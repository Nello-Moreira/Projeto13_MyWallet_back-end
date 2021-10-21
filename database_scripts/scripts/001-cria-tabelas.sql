CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "value" NUMERIC(17,2) DEFAULT 0,
  "description" TEXT NOT NULL
);

CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "token" TEXT
);
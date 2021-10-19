CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "token" TEXT
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "date" TIMESTAMP WITH TIME ZONE,
  "value" NUMERIC(19,4),
  "description" TEXT NOT NULL,
  "user_id" TEXT
);
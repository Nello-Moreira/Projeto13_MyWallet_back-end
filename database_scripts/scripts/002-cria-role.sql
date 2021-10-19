DO
$$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_catalog.pg_roles WHERE rolname='mywallet_user_role'
  ) THEN
    CREATE ROLE mywallet_user_role WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD '123456';
  END IF;
END
$$;
CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY,
	first_Name VARCHAR(50) NOT NULL,
	last_Name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL
);

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
        CREATE TYPE transaction_type AS ENUM ('EARNING', 'EXPENSE','INVESTIMENT');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS transactions(
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    type transaction_type NOT NULL
);
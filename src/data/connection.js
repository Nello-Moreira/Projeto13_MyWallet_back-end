import pg from 'pg';

const { Pool } = pg;

const config = {
	port: 5432,
	user: 'postgres',
	password: '123456',
	host: 'localhost',
	database: 'example_data',
};

const dbConnection = new Pool(config);

export default dbConnection;

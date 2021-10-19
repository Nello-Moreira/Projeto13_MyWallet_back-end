import pg from 'pg';

const { Pool } = pg;

const config = {
	port: 5432,
	user: 'mywallet_user_role',
	password: '123456',
	host: 'localhost',
	database: 'mywallet',
};

const dbConnection = new Pool(config);

export default dbConnection;

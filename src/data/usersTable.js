import dbConnection from './connection.js';

const insertUser = ({ user_id, name, email, password }) =>
	dbConnection.query(
		`
        INSERT INTO users 
        (user_id, name, email, password)
        VALUES ($1, $2, $3, $4)`,
		[user_id, name, email, password]
	);

const searchUserByParam = (param, value, offset = 0) =>
	dbConnection.query(
		`
        SELECT * 
        FROM users 
        WHERE ${param} LIKE $2 
        LIMIT 1000
        OFFSET $1;`,
		[offset, value]
	);

export { searchUserByParam, insertUser };

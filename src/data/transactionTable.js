import dbConnection from './connection.js';

const searchTransactionsByUserId = userId =>
	dbConnection.query(
		`
		SELECT * 
		FROM transactions
		WHERE user_id = $1`,
		[userId]
	);

const insertTransaction = ({ userId, value, description }) =>
	dbConnection.query(
		`
		INSERT INTO transactions 
		(user_id, value, description) 
		VALUES
		($1, $2, $3)
		RETURNING
		date, user_id, value, description
		`,
		[userId, value, description]
	);

export { searchTransactionsByUserId, insertTransaction };

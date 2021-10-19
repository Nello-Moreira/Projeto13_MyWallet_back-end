import dbConnection from './connection.js';

const searchTransactionsByUserId = userId =>
	dbConnection.query(
		`
		SELECT * 
		FROM transactions
		WHERE user_id = $1`,
		[userId]
	);

export { searchTransactionsByUserId };

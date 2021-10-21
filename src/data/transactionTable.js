import dbConnection from './connection.js';

const searchTransactions = userId =>
	dbConnection.query(
		`
		SELECT transactions.date, transactions.value, transactions.description
		FROM transactions
		WHERE transactions.user_id = $1;`,
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
		date, value, description
		`,
		[userId, value, description]
	);

export { searchTransactions, insertTransaction };

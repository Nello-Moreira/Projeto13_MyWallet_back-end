import dbConnection from './connection.js';

const searchSession = userId =>
	dbConnection.query(
		`
        SELECT * FROM sessions 
        WHERE user_id = $1 
        LIMIT 1`,
		[userId]
	);

const insertSession = ({ token, userId }) =>
	dbConnection.query(
		`
        INSERT INTO sessions
        (user_id, token)
        VALUES
        ($1, $2)
        RETURNING token
        `,
		[userId, token]
	);

export { searchSession, insertSession };

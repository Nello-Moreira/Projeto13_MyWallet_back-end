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

const deleteSession = ({ userId, token }) =>
	dbConnection.query(
		`
        DELETE FROM sessions 
        WHERE 
            user_id = $1 AND 
            token = $2
        `,
		[userId, token]
	);

const isValidSession = async ({ userId, token }) => {
	const sessionData = await searchSession(userId);

	if (sessionData.rowCount === 0 || sessionData.rows[0].token !== token) {
		return false;
	}
	return true;
};

export { searchSession, insertSession, deleteSession, isValidSession };

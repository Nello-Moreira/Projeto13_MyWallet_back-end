import dbConnection from './connection.js';

const searchSession = token =>
	dbConnection.query(
		`
        SELECT * FROM sessions 
        WHERE token = $1 
        LIMIT 1`,
		[token]
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

const deleteSession = (userId, token) =>
	dbConnection.query(
		`
        DELETE FROM sessions 
        WHERE 
            user_id = $1 AND 
            token = $2
        `,
		[userId, token]
	);

const isValidSession = async token => {
	const sessionData = await searchSession(token);

	if (sessionData.rowCount === 0 || sessionData.rows[0].token !== token) {
		return false;
	}
	return true;
};

export { searchSession, insertSession, deleteSession, isValidSession };

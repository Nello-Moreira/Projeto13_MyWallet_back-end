import dbConnection from './connection.js';

const searchTransactions = () =>
	dbConnection.query(`SELECT * FROM transactions`);

export { searchTransactions };

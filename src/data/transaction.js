import dbConnection from './connection.js';

const searchTransactions = () =>
	dbConnection.query(`SELECT * FROM bank_statement`);

export { searchTransactions };

import dbConnection from './connection.js';

const insertUser = () => dbConnection.query(`SELECT * FROM users`);

export { insertUser };

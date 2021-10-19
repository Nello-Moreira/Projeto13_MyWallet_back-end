import dbConnection from './connection.js';

const searchUsers = () => dbConnection.query(`SELECT * FROM users`);

export { searchUsers };

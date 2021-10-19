import express from 'express';
import cors from 'cors';

import signUp from './src/routes/signUp.js';
import login from './src/routes/login.js';
import transaction from './src/routes/transaction.js';

const port = 4000;
const server = express();
server.use(cors());
server.use(express.json());

server.post(signUp.route, signUp.postNewUser);

server.post(login.route, login.postLogin);

server.get(transaction.route, transaction.getTransaction);
server.post(transaction.route, transaction.postTransaction);

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

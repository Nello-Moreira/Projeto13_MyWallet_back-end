import express from 'express';
import cors from 'cors';

import signUp from './routes/signUp.js';
import login from './routes/login.js';
import transaction from './routes/transaction.js';
import logout from './routes/logout.js';

const server = express();
server.use(cors());
server.use(express.json());

server.post(signUp.route, signUp.postNewUser);

server.post(login.route, login.postLogin);

server.get(transaction.route, transaction.getTransaction);
server.post(transaction.route, transaction.postTransaction);

server.post(logout.route, logout.postLogout);

export default server;

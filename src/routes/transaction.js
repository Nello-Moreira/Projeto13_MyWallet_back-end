import { internalErrorResponse } from '../helpers/genericHelpers.js';

import { tokenSchema, transactionSchema } from '../validation/validations.js';

import {
	searchTransactions,
	insertTransaction,
} from '../data/transactionTable.js';

import { searchSession, isValidSession } from '../data/sessionsTable.js';

const route = '/transactions';

async function getTransaction(request, response) {
	const authorization = request.headers.authorization;

	if (!authorization) {
		return response.sendStatus(401);
	}

	const token = authorization.replace('Bearer ', '');
	const tokenError = tokenSchema.validate({ token }).error;

	if (tokenError) {
		return response.status(400).send(tokenError.message);
	}

	try {
		const sessionResult = await searchSession(token);

		if (sessionResult.rowCount === 0) {
			return response.sendStatus(401);
		}

		const userTransactions = await searchTransactions(
			sessionResult.rows[0]['user_id']
		);

		return response.status(200).send(userTransactions.rows);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

async function postTransaction(request, response) {
	const { userId, value, description } = request.body;
	const authorization = request.headers.authorization;
	const transaction = { userId, value, description };

	if (!authorization) {
		return response.sendStatus(401);
	}

	const token = authorization.replace('Bearer ', '');

	const tokenError = tokenSchema.validate({ token }).error;
	const transactionError = transactionSchema.validate(transaction).error;

	if (transactionError) {
		return response.status(400).send(transactionError.message);
	}

	if (tokenError) {
		return response.status(400).send(tokenError.message);
	}

	try {
		if (!(await isValidSession(token))) {
			return response.sendStatus(401);
		}

		const successfulInsert = await insertTransaction(transaction);
		return response.status(200).send(successfulInsert.rows[0]);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const transaction = {
	route,
	getTransaction,
	postTransaction,
};

export default transaction;

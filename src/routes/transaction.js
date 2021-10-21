import { internalErrorResponse } from '../helpers/genericHelpers.js';

import {
	userTokenSchema,
	transactionSchema,
} from '../validation/validations.js';

import {
	searchTransactions,
	insertTransaction,
} from '../data/transactionTable.js';

import { isValidSession } from '../data/sessionsTable.js';

const route = '/transactions';

async function getTransaction(request, response) {
	const { userId } = request.body;
	const authorization = request.headers.authorization;

	if (!authorization) {
		return response.sendStatus(401);
	}

	const user = { userId, token: authorization.replace('Bearer ', '') };
	const validationError = userTokenSchema.validate(user).error;

	if (validationError) {
		return response.status(400).send(validationError.message);
	}

	try {
		if (!(await isValidSession(user))) {
			return response.sendStatus(401);
		}

		const userTransactions = await searchTransactions(user.userId);

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
		return response.status(401);
	}

	const user = { userId, token: authorization.replace('Bearer ', '') };
	const userInfoError = userTokenSchema.validate(user).error;
	const transactionError = transactionSchema.validate(transaction).error;

	if (userInfoError) {
		return response.status(400).send(userInfoError.message);
	}

	if (transactionError) {
		return response.status(400).send(transactionError.message);
	}

	try {
		if (!(await isValidSession(user))) {
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

import { internalErrorResponse } from '../helpers/genericHelpers.js';

import { idSchema, transactionSchema } from '../validation/validations.js';

import { searchTransactionsByUserId } from '../data/transactionTable.js';

const route = '/transactions';

async function getTransaction(request, response) {
	const { userId } = request.body;

	const validationError = idSchema.validate({ id: userId }).error;

	if (validationError) {
		response.status(400).send(validationError.message);
		return;
	}

	try {
		const userTransactions = await searchTransactionsByUserId(userId);
		response.status(200).send(userTransactions.rows);
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

async function postTransaction(request, response) {
	const { userId, value, description } = request.body;

	const validationError = transactionSchema.validate({
		userId,
		value,
		description,
	}).error;

	if (validationError) {
		response.status(400).send(validationError.message);
		return;
	}

	try {
		const successfulSearch = await searchTransactionsByUserId();
		response.status(200).send('this is an example route');
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

const transaction = {
	route,
	getTransaction,
	postTransaction,
};

export default transaction;

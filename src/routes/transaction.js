import { searchTransactions } from '../data/transaction.js';

import { internalErrorResponse } from '../helpers/genericHelpers.js';

const route = '/transactions';

async function getTransaction(request, response) {
	try {
		const successfulSearch = await searchTransactions();
		response.status(200).send('this is an example route');
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

async function postTransaction(request, response) {
	try {
		const successfulSearch = await searchTransactions();
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

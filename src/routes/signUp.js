import { insertUser } from '../data/signUp.js';

import { internalErrorResponse } from '../helpers/genericHelpers.js';

const route = '/sign-up';

async function postNewUser(request, response) {
	try {
		const successfulInsert = await insertUser();
		response.status(200).send('this is an example route');
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

const signUp = {
	route,
	postNewUser,
};

export default signUp;

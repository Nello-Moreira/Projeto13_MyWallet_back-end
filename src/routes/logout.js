import { internalErrorResponse } from '../helpers/genericHelpers.js';

import { isValidSession, deleteSession } from '../data/sessionsTable.js';

import { userSchema, tokenSchema } from '../validation/validations.js';

const route = '/logout';

async function postLogout(request, response) {
	const authorization = request.headers.authorization;
	const { userId } = request.body;

	if (!authorization) {
		return response.sendStatus(401);
	}

	const token = authorization.replace('Bearer ', '');
	const userError = userSchema.validate({ userId }).error;
	const tokenError = tokenSchema.validate({ token }).error;

	if (userError) {
		return response.status(400).send(userError.message);
	}

	if (tokenError) {
		return response.status(400).send(tokenError.message);
	}

	try {
		if (!(await isValidSession(token))) {
			return response.sendStatus(401);
		}

		const successfulLogout = await deleteSession(userId, token);
		return response.sendStatus(200);
	} catch (error) {
		console.log(error);
		return internalErrorResponse(response, error);
	}
}

const logout = {
	route,
	postLogout,
};

export default logout;

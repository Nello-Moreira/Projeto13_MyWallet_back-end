import { internalErrorResponse } from '../helpers/genericHelpers.js';

import { isValidSession, deleteSession } from '../data/sessionsTable.js';

import { userTokenSchema } from '../validation/validations.js';

const route = '/logout';

async function postLogout(request, response) {
	const authorization = request.headers.authorization;
	const { userId } = request.body;

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

		const successfulLogout = await deleteSession(user);
		return response.sendStatus(200);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const logout = {
	route,
	postLogout,
};

export default logout;

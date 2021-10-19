import { internalErrorResponse } from '../helpers/genericHelpers.js';
import { hashPassword } from '../validation/passwordEncrypt.js';

import signUpSchema from '../validation/signUpValidation.js';

import { searchUserByParam, insertUser } from '../data/usersTable.js';

const route = '/sign-up';

async function postNewUser(request, response) {
	const { name, email, password } = request.body;

	const newUser = { name, email, password };

	const validationError = signUpSchema.validate(newUser).error;

	if (validationError) {
		response.status(400).send(validationError.message);
		return;
	}

	newUser.password = await hashPassword(password);

	try {
		const user = await searchUserByParam('email', email);

		if (user.rowCount > 0) {
			response.status(409).send('This e-mail is already being used');
			return;
		}

		const successfulInsert = await insertUser(newUser);
		response.sendStatus(201);
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

const signUp = {
	route,
	postNewUser,
};

export default signUp;

import { internalErrorResponse } from '../helpers/genericHelpers.js';
import { hashPassword } from '../helpers/passwordEncrypt.js';

import { signUpSchema } from '../validation/validations.js';

import { searchUserByParam, insertUser } from '../data/usersTable.js';

import { v4 as uuid } from 'uuid';

const route = '/sign-up';

async function postNewUser(request, response) {
	const { name, email, password } = request.body;

	const newUser = { name, email, password };

	const validationError = signUpSchema.validate(newUser).error;

	if (validationError) {
		return response.status(400).send(validationError.message);
	}

	newUser.password = await hashPassword(password);

	try {
		const user = await searchUserByParam('email', email);

		if (user.rowCount > 0) {
			return response
				.status(409)
				.send('This e-mail is already being used');
		}

		const successfulInsert = await insertUser({
			...newUser,
			user_id: uuid(),
		});
		return response.sendStatus(201);
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const signUp = {
	route,
	postNewUser,
};

export default signUp;

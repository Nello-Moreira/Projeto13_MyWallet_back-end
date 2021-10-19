import { internalErrorResponse } from '../helpers/genericHelpers.js';
import { comparePassword } from '../helpers/passwordEncrypt.js';

import { searchUserByParam } from '../data/usersTable.js';

import loginValidation from '../validation/loginValidation.js';

const route = '/login';

async function postLogin(request, response) {
	const { email, password } = request.body;

	const validationError = loginValidation.validate({ email, password }).error;

	if (validationError) {
		response.status(400).send(validationError.message);
		return;
	}

	try {
		const user = await searchUserByParam('email', email);

		if (user.rowCount === 0) {
			response
				.status(404)
				.send('There is no registered user for this email');
			return;
		}

		const correctPassword = await comparePassword(
			password,
			user.rows[0].password
		);

		if (!correctPassword) {
			response
				.status(401)
				.send('The password you’ve entered is incorrect');
			return;
		}

		response.status(200).send({ userId: user.rows[0].id });
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

const login = {
	route,
	postLogin,
};

export default login;

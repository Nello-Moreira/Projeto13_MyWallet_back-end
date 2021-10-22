import { internalErrorResponse } from '../helpers/genericHelpers.js';
import { comparePassword } from '../helpers/passwordEncrypt.js';

import { searchUserByParam } from '../data/usersTable.js';
import { insertSession } from '../data/sessionsTable.js';

import { loginSchema } from '../validation/validations.js';

import { v4 as uuid } from 'uuid';

const route = '/login';

async function postLogin(request, response) {
	const { email, password } = request.body;

	const validationError = loginSchema.validate({ email, password }).error;

	if (validationError) {
		return response.status(400).send(validationError.message);
	}

	try {
		const user = await searchUserByParam('email', email);

		if (user.rowCount === 0) {
			return response
				.status(404)
				.send('There is no registered user for this email');
		}

		const correctPassword = await comparePassword(
			password,
			user.rows[0].password
		);

		if (!correctPassword) {
			return response
				.status(401)
				.send('The password you’ve entered is incorrect');
		}

		const result = await insertSession({
			token: uuid(),
			userId: user.rows[0].user_id,
		});

		const token = result.rows[0].token;

		return response.status(200).send({
			userId: user.rows[0].user_id,
			name: user.rows[0].name,
			token,
		});
	} catch (error) {
		return internalErrorResponse(response, error);
	}
}

const login = {
	route,
	postLogin,
};

export default login;

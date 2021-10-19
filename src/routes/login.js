import { internalErrorResponse } from '../helpers/genericHelpers.js';

import { searchUserByParam } from '../data/usersTable.js';

const route = '/login';

async function postLogin(request, response) {
	try {
		//const successfulLogin = await searchUsers();
		response.status(200).send('this is an example route');
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

const login = {
	route,
	postLogin,
};

export default login;

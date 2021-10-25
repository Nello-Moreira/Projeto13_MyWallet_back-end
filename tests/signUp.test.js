import supertest from 'supertest';
import server from '../src/server.js';
import dbConnection from '../src/data/connection';
import signUp from '../src/routes/signUp';

const testAConflict = async () => {
	const body = {
		name: 'test_user',
		email: 'test_user@test.com',
		password: 'testpassword',
	};
	const response = await supertest(server).post(signUp.route).send(body);
	expect(response.status).toEqual(409);
};

const insertNewUser = async () => {
	const body = {
		name: 'test_user',
		email: 'test_user@test.com',
		password: 'testpassword',
	};
	const response = await supertest(server).post(signUp.route).send(body);
	expect(response.status).toEqual(201);
};

const signUpTests = () => {
	beforeAll(async () => {
		await dbConnection.query('DELETE FROM users');
		await dbConnection.query(
			`
            INSERT INTO users 
            (user_id, name, email, password)
            VALUES
            ('test_id', 'test_user', 'test_user@test.com', 'testpassword')`
		);
	});

	afterEach(async () => await dbConnection.query('DELETE FROM users'));

	afterAll(() => {
		dbConnection.end();
	});

	it(
		'Should return status code 409 for inserting an e-mail already in use',
		testAConflict
	);

	it('Should return status code 201 for inserting a new user', insertNewUser);
};
describe('Tests for sign-up route', signUpTests);

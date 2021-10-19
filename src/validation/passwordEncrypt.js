import bcrypt from 'bcrypt';

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(6);
	return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hashedPassword) {
	return await bcrypt.compare(password, hashedPassword);
}

export { hashPassword, comparePassword };

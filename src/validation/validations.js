import Joi from 'joi';

const loginSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'br'] },
		})
		.required(),
	password: Joi.string().min(1).required(),
});

const signUpSchema = Joi.object({
	name: Joi.string().min(1).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net', 'br'] },
		})
		.required(),
	password: Joi.string().min(1).required(),
});

const userSchema = Joi.object({
	userId: Joi.string()
		.pattern(/[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}/)
		.required(),
});

const tokenSchema = Joi.object({
	token: Joi.string()
		.pattern(/[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}/)
		.required(),
});

const transactionSchema = Joi.object({
	userId: Joi.string()
		.pattern(/[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}/)
		.required(),
	value: Joi.number().required(),
	description: Joi.string().min(1).required(),
});

export {
	loginSchema,
	signUpSchema,
	userSchema,
	tokenSchema,
	transactionSchema,
};

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

const idSchema = Joi.object({
	id: Joi.number().integer().min(1).required(),
});

const transactionSchema = Joi.object({
	userId: Joi.number().integer().min(1).required(),
	value: Joi.number().required(),
	description: Joi.string().min(1).required(),
});

export { loginSchema, signUpSchema, idSchema, transactionSchema };

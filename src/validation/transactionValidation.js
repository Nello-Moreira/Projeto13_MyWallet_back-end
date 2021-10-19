import Joi from 'joi';

const transactionSchema = Joi.object({
	userId: Joi.number().integer().min(1).required(),
});

export default transactionSchema;

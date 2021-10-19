const internalErrorResponse = (response, error) => {
	response
		.status(500)
		.send('There was an internal error. Please try again later.');
	console.log(error);
};

export { internalErrorResponse };

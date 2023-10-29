const errorHandler = (err, req, res, _) => {
	console.log(err)
	if (req.clientError) {
		return res.status(400).json({ error: err })
	}
	if (err.name === 'ValidationError') {
		return res.status(400).json({ error: 'Validation error', details: err.message })
	}

	if (err.name === 'CastError') {
		return res.status(404).json({ message: `${req.from} not found` })
	}
	return res.status(500).json({ error: 'Internal Server Error' })
}

export default errorHandler

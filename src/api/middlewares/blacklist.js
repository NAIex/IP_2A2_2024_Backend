function errorHandler(err, req, res, next) {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        error: {
            message: err.message || 'An unexpected error occurred.',
            status: err.status || 500
        }
    });
}

export default errorHandler;
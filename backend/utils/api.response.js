const userResponse = (res, statusCode, success, message, data = null) => {
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};

export default userResponse;

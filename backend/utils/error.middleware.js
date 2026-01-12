const errorMiddleware = (err, req, res, next) => {
    console.log("ERROR:", err.message);

    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
};

export default errorMiddleware;

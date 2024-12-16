class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ) {
        super(message)
        this.success = false
        this.data = null
        this.message = message
        this.error = error
        this.statusCode = statusCode
        if(stack) {
            this.stack = stack
        }
        else{
            this.stack = Error.captureStackTrace(this, this.constructor)
        } 
    }
};

export default ApiError;
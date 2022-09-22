class ApplicationError extends Error {
  /**
   * Custom error handler for all errors
   * @param {Object} param0.error The error object of axios or a custom error object.
   * @param {String} param0.status When passed, this statuscode overrides the statuscode of the error object.
   * @param {String} param0.message When passed, this message overrides the message of the error object.
   */
  constructor({ error, status, message } = {}) {
    let messageText = "";
    if (error) {
      messageText =
        message || error?.message || error?.data?.message || "Something went wrong. Please try again later.";
    } else {
      messageText = message || "Something went wrong. Please try again later.";
    }
    const messageStatus = status || (error && error.status) || 500;
    messageText = `${messageText}`;
    super(messageText);
    this.name = this.constructor.name;
    this.message = messageText;
    this.data = (error && (error.data || error)) || { message: messageText };
    this.status = messageStatus;
    this.headers = error && error.headers ? { ...error.headers } : {};

    if (!error && Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
  }
}

export default ApplicationError;
